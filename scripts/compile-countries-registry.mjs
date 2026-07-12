#!/usr/bin/env node

import { readdir, readFile, writeFile, mkdir } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(scriptDir, '..');

const countriesDataDir = resolve(projectRoot, 'countries/data');
const graphDir = resolve(projectRoot, 'knowledge');
const entitiesDir = resolve(graphDir, 'entities');
const sourcesDir = resolve(graphDir, 'sources');
const relationshipsFile = resolve(graphDir, 'relationships.json');
const reportsDir = resolve(graphDir, 'reports');

const templateScript = resolve(projectRoot, 'assets/js/countries.template.js');
const outputScript = resolve(projectRoot, 'assets/js/countries.js');
const graphOutputFile = resolve(graphDir, 'compiled-graph.json');

// Inject Build Time (constant for entire run to support deterministic checks)
const buildTime = new Date('2026-07-12T18:30:00Z');
const CLOCK_SKEW_TOLERANCE_MS = 5 * 60 * 1000;

const STRICT_FRESHNESS = process.argv.includes('--strict-freshness') || process.env.STRICT_FRESHNESS === 'true';

// Vocabulary Definition
const VOCABULARY = {
  USES_IDENTIFIER: {
    sourceTypes: ['country'],
    targetTypes: ['identifier'],
    inverse: 'USED_BY_COUNTRY'
  },
  SUPPORTS_PAYMENT_SYSTEM: {
    sourceTypes: ['country'],
    targetTypes: ['payment-system'],
    inverse: 'SUPPORTED_BY_COUNTRY'
  },
  PARTICIPATES_IN: {
    sourceTypes: ['country'],
    targetTypes: ['banking-standard'],
    inverse: 'PARTICIPATED_IN_BY_COUNTRY'
  },
  GOVERNED_BY: {
    sourceTypes: ['identifier', 'payment-system', 'banking-standard'],
    targetTypes: ['authority'],
    inverse: 'GOVERNS_ENTITY'
  },
  VALIDATES: {
    sourceTypes: ['workbench', 'tool'],
    targetTypes: ['identifier', 'banking-standard'],
    inverse: 'VALIDATED_BY_ENTITY'
  },
  IMPLEMENTS: {
    sourceTypes: ['tool'],
    targetTypes: ['banking-standard'],
    inverse: 'IMPLEMENTED_BY_ENTITY'
  },
  PUBLISHES_REFERENCE_FOR: {
    sourceTypes: ['authority'],
    targetTypes: ['country', 'identifier', 'payment-system'],
    inverse: 'REFERENCED_BY_AUTHORITY'
  }
};

function assertType(path, val, expectedType, nullable = false) {
  if (nullable && val === null) return;
  const actualType = Array.isArray(val) ? 'array' : typeof val;
  if (actualType !== expectedType) {
    throw new Error(`Schema Violation at [${path}]: Expected type "${expectedType}", got "${actualType}"`);
  }
}

function validateDate(path, dateStr) {
  if (!dateStr) return;
  const t = Date.parse(dateStr);
  if (isNaN(t)) {
    throw new Error(`Date Format Error at [${path}]: "${dateStr}" is not a valid ISO date.`);
  }
  if (t > buildTime.getTime() + CLOCK_SKEW_TOLERANCE_MS) {
    throw new Error(`Future Date Error at [${path}]: "${dateStr}" is set in the future relative to build time.`);
  }
}

async function getJsonFiles(dir) {
  const dirents = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(dirents.map((dirent) => {
    const res = resolve(dir, dirent.name);
    return dirent.isDirectory() ? getJsonFiles(res) : res;
  }));
  return files.flat().filter(f => f.endsWith('.json'));
}

// Helpers for sorting keys/arrays deterministically
function sortObjectKeys(obj) {
  const sorted = {};
  Object.keys(obj).sort().forEach(key => {
    let val = obj[key];
    if (val && typeof val === 'object' && !Array.isArray(val)) {
      sorted[key] = sortObjectKeys(val);
    } else if (Array.isArray(val)) {
      sorted[key] = val.map(item => typeof item === 'object' ? sortObjectKeys(item) : item);
    } else {
      sorted[key] = val;
    }
  });
  return sorted;
}

async function main() {
  console.log('--- STARTING PLATFORM V2 GRAPH COMPILER ---');

  // 1. Load and validate sources
  const sourceFiles = await readdir(sourcesDir);
  const sources = new Map();
  for (const file of sourceFiles) {
    if (!file.endsWith('.json')) continue;
    const content = await readFile(resolve(sourcesDir, file), 'utf8');
    let data;
    try {
      data = JSON.parse(content);
    } catch (err) {
      throw new Error(`Syntax Error: Failed to parse source file ${file}: ${err.message}`);
    }

    const path = `sources/${file}`;
    assertType(`${path}.id`, data.id, 'string');
    assertType(`${path}.publisher`, data.publisher, 'string');
    assertType(`${path}.title`, data.title, 'string');
    assertType(`${path}.url`, data.url, 'string');
    assertType(`${path}.documentType`, data.documentType, 'string');
    assertType(`${path}.jurisdiction`, data.jurisdiction, 'string');
    assertType(`${path}.language`, data.language, 'string');
    assertType(`${path}.lifecycleStatus`, data.lifecycleStatus, 'string');

    if (!data.id.startsWith('source:')) {
      throw new Error(`Integrity Violation at [${path}.id]: ID "${data.id}" must start with "source:"`);
    }

    if (!['active', 'superseded', 'unavailable', 'archived', 'deprecated'].includes(data.lifecycleStatus)) {
      throw new Error(`Lifecycle Error at [${path}.lifecycleStatus]: Invalid state "${data.lifecycleStatus}"`);
    }

    validateDate(`${path}.publishedAt`, data.publishedAt);
    validateDate(`${path}.retrievedAt`, data.retrievedAt);

    if (sources.has(data.id)) {
      throw new Error(`Duplicate Source ID Error: Global ID "${data.id}" is already registered.`);
    }
    sources.set(data.id, data);
  }
  console.log(`Loaded and validated ${sources.size} source reference documents.`);

  for (const [id, src] of sources) {
    if (src.supersededBySourceId) {
      if (!sources.has(src.supersededBySourceId)) {
        throw new Error(`Referential Integrity Error: Source "${id}" references superseded target "${src.supersededBySourceId}" which does not exist.`);
      }
    }
  }

  // 2. Load entities
  const entityFiles = await getJsonFiles(entitiesDir);
  const entities = new Map();

  for (const file of entityFiles) {
    const relativePath = file.substring(entitiesDir.length + 1);
    const parts = relativePath.split('/');
    if (parts.length < 2) continue;
    const type = parts[0];
    const filename = parts[parts.length - 1];
    const slug = filename.replace('.json', '');

    const content = await readFile(file, 'utf8');
    let data;
    try {
      data = JSON.parse(content);
    } catch (err) {
      throw new Error(`Syntax Error: Failed to parse JSON in entity file ${file}: ${err.message}`);
    }

    const path = `entities/${relativePath}`;
    assertType(`${path}.id`, data.id, 'string');
    assertType(`${path}.type`, data.type, 'string');
    assertType(`${path}.name`, data.name, 'string');

    const expectedId = `${type}:${slug}`;
    if (data.id !== expectedId) {
      throw new Error(`Integrity Violation: Entity ID "${data.id}" in file ${relativePath} must equal "${expectedId}"`);
    }
    if (data.type !== type) {
      throw new Error(`Integrity Violation: Entity type "${data.type}" in file ${relativePath} must equal "${type}"`);
    }

    assertType(`${path}.schemaVersion`, data.schemaVersion, 'string');
    assertType(`${path}.contentVersion`, data.contentVersion, 'string');
    assertType(`${path}.verificationStatus`, data.verificationStatus, 'string');
    assertType(`${path}.reviewPolicy`, data.reviewPolicy, 'string');
    assertType(`${path}.recommendedReviewInterval`, data.recommendedReviewInterval, 'number');

    validateDate(`${path}.createdAt`, data.createdAt);
    validateDate(`${path}.updatedAt`, data.updatedAt);
    validateDate(`${path}.lastReviewedAt`, data.lastReviewedAt);

    if (!['draft', 'researched', 'reviewed', 'verified', 'deprecated'].includes(data.verificationStatus)) {
      throw new Error(`Verification Status Error at [${path}.verificationStatus]: Invalid state "${data.verificationStatus}"`);
    }
    if (!['static', 'volatile', 'stable'].includes(data.reviewPolicy)) {
      throw new Error(`Review Policy Error at [${path}.reviewPolicy]: Invalid policy "${data.reviewPolicy}"`);
    }

    if (data.provenance) {
      assertType(`${path}.provenance`, data.provenance, 'object');
      if (data.provenance.sourceId) {
        if (!sources.has(data.provenance.sourceId)) {
          throw new Error(`Referential Integrity Error: Entity "${data.id}" references source ID "${data.provenance.sourceId}" which does not exist.`);
        }
      }
      if (data.provenance.sourceIds) {
        assertType(`${path}.provenance.sourceIds`, data.provenance.sourceIds, 'array');
        for (const sId of data.provenance.sourceIds) {
          if (!sources.has(sId)) {
            throw new Error(`Referential Integrity Error: Entity "${data.id}" references source ID "${sId}" which does not exist.`);
          }
        }
      }
    }

    if (entities.has(data.id)) {
      throw new Error(`Duplicate ID Error: Global ID "${data.id}" is already registered.`);
    }
    entities.set(data.id, data);
  }
  console.log(`Loaded and validated ${entities.size} knowledge entities.`);

  for (const [id, src] of sources) {
    if (src.publisher && !entities.has(src.publisher) && src.publisher !== 'authority:iso') {
      throw new Error(`Referential Integrity Error: Source "${id}" references publisher authority ID "${src.publisher}" which does not exist as an entity.`);
    }
  }

  // 3. Load relationships
  const relsContent = await readFile(relationshipsFile, 'utf8');
  let rawRelationships;
  try {
    rawRelationships = JSON.parse(relsContent);
  } catch (err) {
    throw new Error(`Syntax Error: Failed to parse relationships.json: ${err.message}`);
  }

  const relationships = [];
  const relKeys = new Set();

  for (let idx = 0; idx < rawRelationships.length; idx++) {
    const rel = rawRelationships[idx];
    const path = `relationships[${idx}]`;

    assertType(`${path}.source`, rel.source, 'string');
    assertType(`${path}.type`, rel.type, 'string');
    assertType(`${path}.target`, rel.target, 'string');

    if (!entities.has(rel.source)) {
      throw new Error(`Referential Integrity Error: Source ID "${rel.source}" at ${path} is not a valid entity.`);
    }
    if (!entities.has(rel.target)) {
      throw new Error(`Referential Integrity Error: Target ID "${rel.target}" at ${path} is not a valid entity.`);
    }

    const verb = VOCABULARY[rel.type];
    if (!verb) {
      throw new Error(`Vocabulary Error: Relationship type "${rel.type}" at ${path} is not part of the controlled vocabulary.`);
    }

    const sourceEnt = entities.get(rel.source);
    const targetEnt = entities.get(rel.target);

    if (!verb.sourceTypes.includes(sourceEnt.type)) {
      throw new Error(`Semantic Constraint Mismatch: Verb "${rel.type}" at ${path} does not allow source type "${sourceEnt.type}". Allowed: [${verb.sourceTypes.join(', ')}]`);
    }
    if (!verb.targetTypes.includes(targetEnt.type)) {
      throw new Error(`Semantic Constraint Mismatch: Verb "${rel.type}" at ${path} does not allow target type "${targetEnt.type}". Allowed: [${verb.targetTypes.join(', ')}]`);
    }

    if (rel.evidence) {
      assertType(`${path}.evidence`, rel.evidence, 'array');
      for (let eIdx = 0; eIdx < rel.evidence.length; eIdx++) {
        const ev = rel.evidence[eIdx];
        const evPath = `${path}.evidence[${eIdx}]`;
        validateDate(`${evPath}.verifiedAt`, ev.verifiedAt);

        if (ev.sourceId) {
          if (!sources.has(ev.sourceId)) {
            throw new Error(`Referential Integrity Error: Relationship evidence at ${evPath} references source ID "${ev.sourceId}" which does not exist.`);
          }
        }
        if (ev.sourceIds) {
          assertType(`${evPath}.sourceIds`, ev.sourceIds, 'array');
          for (const sId of ev.sourceIds) {
            if (!sources.has(sId)) {
              throw new Error(`Referential Integrity Error: Relationship evidence at ${evPath} references source ID "${sId}" which does not exist.`);
            }
          }
        }

        if (ev.confidence !== undefined) {
          assertType(`${evPath}.confidence`, ev.confidence, 'number');
          if (ev.confidence < 0.0 || ev.confidence > 1.0) {
            throw new Error(`Confidence Value Error at [${evPath}.confidence]: "${ev.confidence}" must be a float between 0.0 and 1.0.`);
          }
        }
        if (ev.evidenceStrength) {
          if (!['weak', 'moderate', 'strong', 'authoritative'].includes(ev.evidenceStrength)) {
            throw new Error(`Evidence Strength Error at [${evPath}.evidenceStrength]: Invalid value "${ev.evidenceStrength}"`);
          }
        }
        if (ev.sourceAuthorityLevel) {
          if (!['community', 'secondary', 'standards-body', 'government', 'official-registry'].includes(ev.sourceAuthorityLevel)) {
            throw new Error(`Source Authority Level Error at [${evPath}.sourceAuthorityLevel]: Invalid value "${ev.sourceAuthorityLevel}"`);
          }
        }
      }
    }

    const key = `${rel.source}|${rel.type}|${rel.target}`;
    if (relKeys.has(key)) {
      throw new Error(`Duplicate Relationship Error: "${rel.source} --${rel.type}--> ${rel.target}" is declared multiple times.`);
    }
    relKeys.add(key);

    relationships.push(rel);
  }
  console.log(`Loaded and validated ${relationships.length} semantic relationships.`);

  // 4. Freshness and Overdue Reviews
  const overdueEntities = [];
  for (const [id, data] of entities) {
    if (data.lastReviewedAt && data.recommendedReviewInterval !== null) {
      const lastT = Date.parse(data.lastReviewedAt);
      const intervalDays = data.recommendedReviewInterval;
      if (intervalDays > 0) {
        const expiry = lastT + (intervalDays * 24 * 60 * 60 * 1000);
        if (expiry < buildTime.getTime()) {
          const overdueMs = buildTime.getTime() - expiry;
          const overdueDays = Math.floor(overdueMs / (24 * 60 * 60 * 1000));

          overdueEntities.push({
            id,
            lastReviewedAt: data.lastReviewedAt,
            recommendedReviewInterval: intervalDays,
            overdueDays
          });

          const msg = `WARNING: Freshness Policy Overdue: Entity "${id}" is overdue for review by ${overdueDays} days.`;
          if (STRICT_FRESHNESS) {
            throw new Error(`Strict Freshness Mode Violation: ${msg}`);
          } else {
            console.warn(msg);
          }
        }
      }
    }
  }

  // 5. Build Graph Adjacency representation
  const graph = {};
  for (const [id, entity] of entities) {
    graph[id] = {
      entity,
      relations: []
    };
  }

  for (const rel of relationships) {
    const verb = VOCABULARY[rel.type];
    graph[rel.source].relations.push({
      type: rel.type,
      target: rel.target,
      direction: 'out',
      evidence: rel.evidence || null
    });
    graph[rel.target].relations.push({
      type: verb.inverse,
      target: rel.source,
      direction: 'in',
      evidence: rel.evidence || null
    });
  }

  // Directed cycle check
  const visited = new Set();
  const recStack = new Set();
  function detectCycle(id) {
    visited.add(id);
    recStack.add(id);
    const node = graph[id];
    for (const edge of node.relations) {
      if (edge.direction === 'out') {
        const neighbor = edge.target;
        if (!visited.has(neighbor)) {
          if (detectCycle(neighbor)) return true;
        } else if (recStack.has(neighbor)) {
          throw new Error(`Prohibited Cycle Error: Directed loop detected involving "${id}" and "${neighbor}".`);
        }
      }
    }
    recStack.delete(id);
    return false;
  }
  for (const id of entities.keys()) {
    if (!visited.has(id)) {
      detectCycle(id);
    }
  }

  // Orphans warning list
  const orphans = [];
  for (const id of entities.keys()) {
    const node = graph[id];
    if (node.relations.length === 0) {
      orphans.push(id);
      console.warn(`WARNING: Orphan Entity: "${id}" is loaded but has no relationships.`);
    }
  }

  // 6. Discovery Index Generation
  console.log('--- COMPILING DISCOVERY INDEXES ---');

  const countryToIdentifiers = {};
  const countryToPayments = {};
  const identifierToCountries = {};
  const workbenchIndex = {};
  const workbenchDiscovery = {};
  const compiledDiscovery = { countries: {}, workbenches: {} };
  const searchIndex = {};
  const homepageWidgets = {
    popularStandards: [],
    countriesAdded: [],
    developerEssentials: [],
    recentlyVerified: [],
    featuredWorkbenches: []
  };

  const countries = Array.from(entities.values()).filter(e => e.type === 'country');
  const workbenches = Array.from(entities.values()).filter(e => e.type === 'workbench' || e.type === 'tool');

  // Compute identifiers used by country and vice versa
  for (const c of countries) {
    const cSlug = c.id.split(':')[1];
    const node = graph[c.id];

    const usedIds = node.relations
      .filter(r => r.type === 'USES_IDENTIFIER' && r.direction === 'out')
      .map(r => r.target);
    countryToIdentifiers[cSlug] = usedIds.map(id => entities.get(id).name).sort();

    usedIds.forEach(id => {
      const iSlug = id.split(':')[1];
      if (!identifierToCountries[iSlug]) {
        identifierToCountries[iSlug] = [];
      }
      if (!identifierToCountries[iSlug].includes(c.name)) {
        identifierToCountries[iSlug].push(c.name);
      }
    });

    const supportedPayments = node.relations
      .filter(r => r.type === 'SUPPORTS_PAYMENT_SYSTEM' && r.direction === 'out')
      .map(r => r.target);
    countryToPayments[cSlug] = supportedPayments.map(id => entities.get(id).name).sort();
  }

  // Final sort on identifierToCountries
  for (const k of Object.keys(identifierToCountries)) {
    identifierToCountries[k].sort();
  }

  // Build Workbench Discovery Index
  for (const w of workbenches) {
    const wSlug = w.id.split(':')[1];
    const node = graph[w.id];

    // Find validated identifiers and standards
    const validatesRels = node.relations.filter(r => r.type === 'VALIDATES' && r.direction === 'out');
    const validatedIds = validatesRels.filter(r => r.target.startsWith('identifier:')).map(r => r.target);
    const validatedStandards = validatesRels.filter(r => r.target.startsWith('banking-standard:')).map(r => r.target);

    // Authorities governing these identifiers/standards
    const auths = [];
    validatesRels.forEach(r => {
      const targetNode = graph[r.target];
      if (targetNode) {
        targetNode.relations
          .filter(tr => tr.type === 'GOVERNED_BY' && tr.direction === 'out')
          .forEach(tr => {
            const authName = entities.get(tr.target).name;
            if (!auths.includes(authName)) auths.push(authName);
          });
      }
    });

    // Supported countries (countries using the validated identifiers)
    const supportedCountries = [];
    validatedIds.forEach(id => {
      const idNode = graph[id];
      if (idNode) {
        idNode.relations
          .filter(r => r.type === 'USED_BY_COUNTRY' && r.direction === 'in')
          .forEach(r => {
            const countryName = entities.get(r.target).name;
            if (!supportedCountries.includes(countryName)) {
              supportedCountries.push(countryName);
            }
          });
      }
    });

    const wRecord = {
      validates: validatedIds.map(id => entities.get(id).name).sort(),
      standards: validatedStandards.map(id => entities.get(id).name).sort(),
      authorities: auths.sort(),
      countries: supportedCountries.sort()
    };

    workbenchIndex[wSlug] = wRecord;
    // Map to compound keys (like poland-pesel-validator) to prevent collisions
    const belongsToCountry = w.id.split(':')[1].split('-')[0];
    if (entities.has(`country:${belongsToCountry}`)) {
      workbenchDiscovery[`${belongsToCountry}-${wSlug}`] = wRecord;
    } else {
      workbenchDiscovery[wSlug] = wRecord;
    }
  }

  // Build Country-specific discovery data (Related Resources + Related Countries)
  for (const c of countries) {
    const cSlug = c.id.split(':')[1];
    const node = graph[c.id];

    const ids = node.relations.filter(r => r.type === 'USES_IDENTIFIER' && r.direction === 'out').map(r => r.target);
    const pays = node.relations.filter(r => r.type === 'SUPPORTS_PAYMENT_SYSTEM' && r.direction === 'out').map(r => r.target);
    const stds = node.relations.filter(r => r.type === 'PARTICIPATES_IN' && r.direction === 'out').map(r => r.target);

    // Link resolution helper
    const resolveLink = (targetId) => {
      // Check if target is validated by a workbench owned by this country
      const targetNode = graph[targetId];
      if (targetNode) {
        const validatorRel = targetNode.relations.find(r => r.type === 'VALIDATED_BY_ENTITY' && r.direction === 'in');
        if (validatorRel) {
          const valSlug = validatorRel.target.split(':')[1];
          const valBelongs = valSlug.split('-')[0];
          if (valBelongs === cSlug) {
            return `${cSlug}/${valSlug}`;
          } else if (validatorRel.target.startsWith('tool:')) {
            return `tools/${valSlug}`;
          }
        }
      }
      return null;
    };

    const relatedResources = {
      identifiers: ids.map(id => ({
        name: entities.get(id).name,
        slug: id.split(':')[1],
        description: entities.get(id).shortDefinition,
        link: resolveLink(id)
      })).sort((a, b) => a.name.localeCompare(b.name)),
      payments: pays.map(id => ({
        name: entities.get(id).name,
        slug: id.split(':')[1],
        description: entities.get(id).shortDefinition,
        link: resolveLink(id)
      })).sort((a, b) => a.name.localeCompare(b.name)),
      standards: stds.map(id => ({
        name: entities.get(id).name,
        slug: id.split(':')[1],
        description: entities.get(id).shortDefinition,
        link: resolveLink(id)
      })).sort((a, b) => a.name.localeCompare(b.name)),
      authorities: node.relations
        .filter(r => r.type === 'REFERENCED_BY_AUTHORITY' && r.direction === 'in')
        .map(r => ({
          name: entities.get(r.target).name,
          slug: r.target.split(':')[1],
          description: entities.get(r.target).shortDefinition,
          link: null
        })).sort((a, b) => a.name.localeCompare(b.name)),
      workbenches: node.relations
        .filter(r => r.type === 'USES_IDENTIFIER' && r.direction === 'out')
        .flatMap(r => {
          const idNode = graph[r.target];
          return idNode ? idNode.relations.filter(ir => ir.type === 'VALIDATED_BY_ENTITY' && ir.direction === 'in').map(ir => ir.target) : [];
        })
        .filter(id => id.startsWith('workbench:') && id.split(':')[1].split('-')[0] === cSlug)
        .map(id => ({
          name: entities.get(id).name,
          slug: id.split(':')[1],
          description: entities.get(id).shortDefinition,
          link: `${cSlug}/${id.split(':')[1]}`
        })).sort((a, b) => a.name.localeCompare(b.name))
    };

    // Remove duplicates from authorities/workbenches
    relatedResources.authorities = Array.from(new Map(relatedResources.authorities.map(a => [a.slug, a])).values());
    relatedResources.workbenches = Array.from(new Map(relatedResources.workbenches.map(w => [w.slug, w])).values());

    // Related Countries (shares standards or payments)
    const shareCounts = {};
    for (const pId of pays) {
      const pNode = graph[pId];
      pNode.relations
        .filter(r => r.type === 'SUPPORTED_BY_COUNTRY' && r.direction === 'in' && r.target !== c.id)
        .forEach(r => {
          const oSlug = r.target.split(':')[1];
          if (!shareCounts[oSlug]) shareCounts[oSlug] = [];
          shareCounts[oSlug].push(entities.get(pId).name);
        });
    }
    for (const sId of stds) {
      const sNode = graph[sId];
      sNode.relations
        .filter(r => r.type === 'PARTICIPATED_IN_BY_COUNTRY' && r.direction === 'in' && r.target !== c.id)
        .forEach(r => {
          const oSlug = r.target.split(':')[1];
          if (!shareCounts[oSlug]) shareCounts[oSlug] = [];
          shareCounts[oSlug].push(entities.get(sId).name);
        });
    }

    const relatedCountries = Object.keys(shareCounts).map(slug => ({
      name: entities.get(`country:${slug}`).name,
      slug,
      via: shareCounts[slug].sort()
    })).sort((a, b) => {
      // Sort by share count desc, then alphabetically
      const diff = b.via.length - a.via.length;
      if (diff !== 0) return diff;
      return a.name.localeCompare(b.name);
    }).slice(0, 3); // Limit to top 3

    compiledDiscovery.countries[cSlug] = {
      relatedResources,
      relatedCountries
    };
  }

  compiledDiscovery.workbenches = workbenchIndex;

  // Build Search Index
  for (const [id, data] of entities) {
    const summary = [];
    const node = graph[id];
    node.relations.filter(r => r.direction === 'out').forEach(r => {
      const targetName = entities.get(r.target) ? entities.get(r.target).name : r.target;
      summary.push(`${r.type.toLowerCase().replace(/_/g, ' ')} ${targetName}`);
    });

    const countryRefs = [];
    node.relations.forEach(r => {
      if (r.target.startsWith('country:')) {
        const cSlug = r.target.split(':')[1];
        if (!countryRefs.includes(cSlug)) countryRefs.push(cSlug);
      }
    });

    searchIndex[id] = {
      title: data.name,
      aliases: data.aliases || [],
      keywords: [data.type, ...(data.aliases || [])],
      countryReferences: countryRefs.sort(),
      relationshipSummaries: summary.sort()
    };
  }

  // Build Homepage Widgets
  homepageWidgets.countriesAdded = countries.map(c => c.name).sort();
  homepageWidgets.popularStandards = Array.from(entities.values())
    .filter(e => e.type === 'banking-standard' || e.type === 'payment-system')
    .map(e => {
      const node = graph[e.id];
      const count = node.relations.filter(r => r.direction === 'in' && r.target.startsWith('country:')).length;
      return { name: e.name, count };
    })
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));

  homepageWidgets.developerEssentials = Array.from(entities.values())
    .filter(e => e.type === 'banking-standard' || e.id === 'identifier:steuer-id' || e.id === 'identifier:pesel' || e.id === 'identifier:cpf')
    .map(e => e.name).sort();

  homepageWidgets.recentlyVerified = Array.from(entities.values())
    .filter(e => e.verificationStatus === 'verified')
    .sort((a, b) => Date.parse(b.lastReviewedAt) - Date.parse(a.lastReviewedAt) || a.name.localeCompare(b.name))
    .map(e => e.name);

  homepageWidgets.featuredWorkbenches = workbenches.map(w => w.name).sort();

  // Write all index outputs deterministically
  await writeFile(resolve(graphDir, 'compiled-discovery.json'), JSON.stringify(sortObjectKeys(compiledDiscovery), null, 2) + '\n', 'utf8');
  await writeFile(resolve(graphDir, 'country-to-identifiers.json'), JSON.stringify(sortObjectKeys(countryToIdentifiers), null, 2) + '\n', 'utf8');
  await writeFile(resolve(graphDir, 'country-to-payments.json'), JSON.stringify(sortObjectKeys(countryToPayments), null, 2) + '\n', 'utf8');
  await writeFile(resolve(graphDir, 'identifier-to-countries.json'), JSON.stringify(sortObjectKeys(identifierToCountries), null, 2) + '\n', 'utf8');
  await writeFile(resolve(graphDir, 'workbench-index.json'), JSON.stringify(sortObjectKeys(workbenchIndex), null, 2) + '\n', 'utf8');
  await writeFile(resolve(graphDir, 'search-index.json'), JSON.stringify(sortObjectKeys(searchIndex), null, 2) + '\n', 'utf8');
  await writeFile(resolve(graphDir, 'homepage-widgets.json'), JSON.stringify(sortObjectKeys(homepageWidgets), null, 2) + '\n', 'utf8');
  console.log('Deterministic lightweight indexes compiled successfully.');

  // 7. Dynamic Compile step for assets/js/countries.js
  const countryFiles = await readdir(countriesDataDir);
  const jsonFiles = countryFiles.filter(f => f.endsWith('.json') && f !== 'schema.json');
  jsonFiles.sort();

  const visualAssets = {};
  const hubs = {};
  const catalog = [];

  for (const file of jsonFiles) {
    const content = await readFile(resolve(countriesDataDir, file), 'utf8');
    let data;
    try {
      data = JSON.parse(content);
    } catch (err) {
      throw new Error(`Syntax Error: Failed to parse JSON in country profile file ${file}: ${err.message}`);
    }

    if (data.visualAssets) {
      visualAssets[data.id] = data.visualAssets;
    }

    // Attach compiled graph-powered discovery blocks to each country hub
    const cSlug = data.id;
    if (compiledDiscovery.countries[cSlug]) {
      data.hub.discovery = compiledDiscovery.countries[cSlug];
    }

    catalog.push(data.catalog);

    if (data.hub) {
      hubs[data.id] = data.hub;
    }
  }

  const template = await readFile(templateScript, 'utf8');
  const indent = (obj, spaces = 2) => {
    return JSON.stringify(obj, null, spaces)
      .split('\n')
      .map((line, idx) => idx === 0 ? line : ' '.repeat(spaces) + line)
      .join('\n');
  };

  const compiledJs = template
    .replace('/*__COUNTRY_VISUAL_ASSETS__*/', indent(visualAssets, 2))
    .replace('/*__COUNTRY_HUBS__*/', indent(hubs, 2))
    .replace('/*__COUNTRY_PORTAL_CATALOG__*/', indent(catalog, 2))
    .replace('/*__WORKBENCH_DISCOVERY__*/', indent(sortObjectKeys(workbenchDiscovery), 2));

  await writeFile(outputScript, compiledJs, 'utf8');

  // Write reports
  await mkdir(reportsDir, { recursive: true });

  const totalNodes = entities.size;
  const verifiedNodes = Array.from(entities.values()).filter(e => e.verificationStatus === 'verified').length;

  const coverage = {
    criticalIdentifiersAndStandards: {
      total: Array.from(entities.values()).filter(e => e.type === 'identifier' || e.type === 'banking-standard').length,
      verified: Array.from(entities.values()).filter(e => (e.type === 'identifier' || e.type === 'banking-standard') && e.verificationStatus === 'verified').length,
    },
    totalAuthoritativeFactsCount: relationships.filter(r => r.evidence && r.evidence.some(e => e.evidenceStrength === 'authoritative')).length,
    totalSecondaryFactsCount: relationships.filter(r => r.evidence && r.evidence.some(e => e.evidenceStrength === 'moderate')).length,
    overallVerifiedRatio: totalNodes > 0 ? Number((verifiedNodes / totalNodes).toFixed(4)) : 0
  };
  await writeFile(resolve(reportsDir, 'coverage.json'), JSON.stringify(coverage, null, 2) + '\n', 'utf8');

  const countsByStatus = {};
  for (const e of entities.values()) {
    countsByStatus[e.verificationStatus] = (countsByStatus[e.verificationStatus] || 0) + 1;
  }
  const verification = {
    countsByStatus: Object.keys(countsByStatus).sort().reduce((acc, k) => {
      acc[k] = countsByStatus[k];
      return acc;
    }, {})
  };
  await writeFile(resolve(reportsDir, 'verification.json'), JSON.stringify(verification, null, 2) + '\n', 'utf8');

  overdueEntities.sort((a, b) => a.id.localeCompare(b.id));
  const freshness = {
    overdueEntities,
    freshCount: totalNodes - overdueEntities.length,
    overdueCount: overdueEntities.length
  };
  await writeFile(resolve(reportsDir, 'freshness.json'), JSON.stringify(freshness, null, 2) + '\n', 'utf8');

  orphans.sort();
  await writeFile(resolve(reportsDir, 'orphans.json'), JSON.stringify({ orphans }, null, 2) + '\n', 'utf8');

  const countsByType = {};
  for (const e of entities.values()) {
    countsByType[e.type] = (countsByType[e.type] || 0) + 1;
  }
  const statistics = {
    nodeCount: totalNodes,
    edgeCount: relationships.length,
    density: totalNodes > 1 ? Number((relationships.length / (totalNodes * (totalNodes - 1))).toFixed(6)) : 0,
    countsByEntityType: Object.keys(countsByType).sort().reduce((acc, k) => {
      acc[k] = countsByType[k];
      return acc;
    }, {})
  };
  await writeFile(resolve(reportsDir, 'statistics.json'), JSON.stringify(statistics, null, 2) + '\n', 'utf8');
  console.log(`Reports updated in ${reportsDir}.`);

  console.log(`Knowledge Graph artifact written to ${graphOutputFile}`);
  console.log(`PASS: Dynamic country registry compiled to assets/js/countries.js`);
}

main().catch(err => {
  console.error('Graph Compiler failed:', err);
  process.exit(1);
});
