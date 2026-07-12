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
const buildTime = new Date('2026-07-12T18:30:00Z'); // Staged reference time
const CLOCK_SKEW_TOLERANCE_MS = 5 * 60 * 1000; // 5 minutes

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

// Assertion Helper
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
  // Clock-skew audit
  if (t > buildTime.getTime() + CLOCK_SKEW_TOLERANCE_MS) {
    throw new Error(`Future Date Error at [${path}]: "${dateStr}" is set in the future relative to build time.`);
  }
}

// Recursive Directory Reader
async function getJsonFiles(dir) {
  const dirents = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(dirents.map((dirent) => {
    const res = resolve(dir, dirent.name);
    return dirent.isDirectory() ? getJsonFiles(res) : res;
  }));
  return files.flat().filter(f => f.endsWith('.json'));
}

async function main() {
  console.log('--- STARTING PLATFORM V2 GRAPH COMPILER (PROVENANCE EDITION) ---');

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

  // 2. Validate supersededBySourceId referential integrity
  for (const [id, src] of sources) {
    if (src.supersededBySourceId) {
      if (!sources.has(src.supersededBySourceId)) {
        throw new Error(`Referential Integrity Error: Source "${id}" references superseded target "${src.supersededBySourceId}" which does not exist.`);
      }
    }
  }

  // 3. Load entities
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

    // Versioning & Freshness validations
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

    // Provenance Source validation
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

  // 4. Validate source publisher authorityId referential integrity
  for (const [id, src] of sources) {
    if (src.publisher && !entities.has(src.publisher) && src.publisher !== 'authority:iso') {
      throw new Error(`Referential Integrity Error: Source "${id}" references publisher authority ID "${src.publisher}" which does not exist as an entity.`);
    }
  }

  // 5. Load relationships
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

    // Referential Integrity
    if (!entities.has(rel.source)) {
      throw new Error(`Referential Integrity Error: Source ID "${rel.source}" at ${path} is not a valid entity.`);
    }
    if (!entities.has(rel.target)) {
      throw new Error(`Referential Integrity Error: Target ID "${rel.target}" at ${path} is not a valid entity.`);
    }

    // Vocabulary rules validation
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

    // Evidence checks
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

    // Duplicates check
    const key = `${rel.source}|${rel.type}|${rel.target}`;
    if (relKeys.has(key)) {
      throw new Error(`Duplicate Relationship Error: "${rel.source} --${rel.type}--> ${rel.target}" is declared multiple times.`);
    }
    relKeys.add(key);

    relationships.push(rel);
  }
  console.log(`Loaded and validated ${relationships.length} semantic relationships.`);

  // 6. Freshness and Overdue Reviews
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

  // 7. Graph compilation
  const graph = {};
  const inEdges = {};
  for (const [id, entity] of entities) {
    graph[id] = {
      entity,
      relations: []
    };
    inEdges[id] = [];
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
    inEdges[rel.target].push(rel.source);
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

  // 8. Generate Reports
  await mkdir(reportsDir, { recursive: true });

  // coverage.json
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

  // verification.json
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

  // freshness.json
  overdueEntities.sort((a, b) => a.id.localeCompare(b.id));
  const freshness = {
    overdueEntities,
    freshCount: totalNodes - overdueEntities.length,
    overdueCount: overdueEntities.length
  };
  await writeFile(resolve(reportsDir, 'freshness.json'), JSON.stringify(freshness, null, 2) + '\n', 'utf8');

  // orphans.json
  orphans.sort();
  await writeFile(resolve(reportsDir, 'orphans.json'), JSON.stringify({ orphans }, null, 2) + '\n', 'utf8');

  // statistics.json
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
  console.log(`Provenance and Freshness reports compiled and written to ${reportsDir}.`);

  // Write compiled graph JSON
  const graphPayload = {
    nodes: graph,
    relationships
  };
  await writeFile(graphOutputFile, JSON.stringify(graphPayload, null, 2) + '\n', 'utf8');
  console.log(`Knowledge Graph artifact written to ${graphOutputFile}`);

  // Compile assets/js/countries.js
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

    if (data.visualAssets) visualAssets[data.id] = data.visualAssets;
    catalog.push(data.catalog);
    if (data.hub) hubs[data.id] = data.hub;
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
    .replace('/*__COUNTRY_PORTAL_CATALOG__*/', indent(catalog, 2));

  await writeFile(outputScript, compiledJs, 'utf8');
  console.log(`PASS: Dynamic country registry compiled to assets/js/countries.js`);
}

main().catch(err => {
  console.error('Graph Compiler failed:', err);
  process.exit(1);
});
