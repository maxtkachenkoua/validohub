#!/usr/bin/env node

import { readdir, readFile, writeFile, mkdir } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(scriptDir, '..');

const countriesDataDir = resolve(projectRoot, 'countries/data');
const graphDir = resolve(projectRoot, 'knowledge');
const entitiesDir = resolve(graphDir, 'entities');
const relationshipsFile = resolve(graphDir, 'relationships.json');

const templateScript = resolve(projectRoot, 'assets/js/countries.template.js');
const outputScript = resolve(projectRoot, 'assets/js/countries.js');
const graphOutputFile = resolve(graphDir, 'compiled-graph.json');

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

// 1. Recursive Directory Reader
async function getJsonFiles(dir) {
  const dirents = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(dirents.map((dirent) => {
    const res = resolve(dir, dirent.name);
    return dirent.isDirectory() ? getJsonFiles(res) : res;
  }));
  return files.flat().filter(f => f.endsWith('.json'));
}

async function main() {
  console.log('--- STARTING PLATFORM V2 GRAPH COMPILER ---');

  // 1. Load entities
  const entityFiles = await getJsonFiles(entitiesDir);
  const entities = new Map();

  for (const file of entityFiles) {
    const relativePath = file.substring(entitiesDir.length + 1);
    const parts = relativePath.split('/');
    if (parts.length < 2) continue; // Skip root file if any
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

    // Schema checks
    assertType(`${relativePath}.id`, data.id, 'string');
    assertType(`${relativePath}.type`, data.type, 'string');
    assertType(`${relativePath}.name`, data.name, 'string');
    assertType(`${relativePath}.shortDefinition`, data.shortDefinition, 'string', true);
    assertType(`${relativePath}.aliases`, data.aliases, 'array', true);
    assertType(`${relativePath}.stableReferences`, data.stableReferences, 'array', true);

    const expectedId = `${type}:${slug}`;
    if (data.id !== expectedId) {
      throw new Error(`Integrity Violation: Entity ID "${data.id}" in file ${relativePath} must equal "${expectedId}"`);
    }
    if (data.type !== type) {
      throw new Error(`Integrity Violation: Entity type "${data.type}" in file ${relativePath} must equal "${type}"`);
    }

    if (entities.has(data.id)) {
      throw new Error(`Duplicate ID Error: Global ID "${data.id}" is already registered.`);
    }

    entities.set(data.id, data);
  }
  console.log(`Loaded and validated ${entities.size} knowledge entities.`);

  // 2. Load relationships
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

    // Duplicates check
    const key = `${rel.source}|${rel.type}|${rel.target}`;
    if (relKeys.has(key)) {
      throw new Error(`Duplicate Relationship Error: "${rel.source} --${rel.type}--> ${rel.target}" is declared multiple times.`);
    }
    relKeys.add(key);

    relationships.push(rel);
  }
  console.log(`Loaded and validated ${relationships.length} semantic relationships.`);

  // 3. Build Bidirectional Graph & Resolve Adjacencies
  const graph = {};
  for (const [id, entity] of entities) {
    graph[id] = {
      entity,
      relations: []
    };
  }

  for (const rel of relationships) {
    const verb = VOCABULARY[rel.type];
    // Add out-edge
    graph[rel.source].relations.push({
      type: rel.type,
      target: rel.target,
      direction: 'out',
      evidence: rel.evidence || null
    });
    // Add in-edge (inverse)
    graph[rel.target].relations.push({
      type: verb.inverse,
      target: rel.source,
      direction: 'in',
      evidence: rel.evidence || null
    });
  }

  // 4. Cycle Audits (Only for explicitly hierarchical relations - e.g., none currently in vocabulary, but let's implement the validator structure)
  // Check for directed cycles using DFS
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
          // Verify if this cycle is prohibited (hierarchical loops). For Phase 2 seed, we check generally and throw if cycles are found.
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

  // 5. Orphan warnings
  for (const id of entities.keys()) {
    const node = graph[id];
    if (node.relations.length === 0) {
      console.warn(`WARNING: Orphan Entity: "${id}" is loaded but has no relationships.`);
    }
  }

  // 6. Output compiled knowledge graph artifact
  const graphPayload = {
    compiledAt: new Date().toISOString(),
    nodes: graph,
    relationships
  };
  await writeFile(graphOutputFile, JSON.stringify(graphPayload, null, 2) + '\n', 'utf8');
  console.log(`Knowledge Graph artifact written to ${graphOutputFile}`);

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

    // Visual assets validation
    if (data.visualAssets) {
      visualAssets[data.id] = data.visualAssets;
    }

    // Catalog validation
    catalog.push(data.catalog);

    // Hub validation
    if (data.hub) {
      hubs[data.id] = data.hub;
    }
  }

  // Load template
  const template = await readFile(templateScript, 'utf8');

  // Indented JSON helper
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
