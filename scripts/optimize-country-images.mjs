#!/usr/bin/env node

import { promises as fs } from 'node:fs';
import { basename, dirname, join, resolve } from 'node:path';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(scriptDir, '..');

const defaults = {
  source: false,
  generated: false,
  pruneGeneratedPng: false,
  maxPixels: 720,
  quality: 72,
  dryRun: false,
};

function parseArgs(argv) {
  const args = { ...defaults };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    const [key, inlineValue] = arg.split('=');
    const nextValue = inlineValue ?? argv[index + 1];
    if (arg === '--source') {
      args.source = true;
    } else if (arg === '--generated') {
      args.generated = true;
    } else if (arg === '--prune-generated-png') {
      args.pruneGeneratedPng = true;
    } else if (arg === '--dry-run') {
      args.dryRun = true;
    } else if (key === '--max-pixels' && nextValue) {
      args.maxPixels = Number(nextValue);
      if (inlineValue === undefined) index += 1;
    } else if (key === '--quality' && nextValue) {
      args.quality = Number(nextValue);
      if (inlineValue === undefined) index += 1;
    } else {
      throw new Error(`Unknown option: ${arg}`);
    }
  }
  if (!args.source && !args.generated) {
    args.source = true;
    args.generated = true;
  }
  if (!Number.isInteger(args.maxPixels) || args.maxPixels < 240 || args.maxPixels > 1600) {
    throw new Error(`Invalid --max-pixels value: ${args.maxPixels}`);
  }
  if (!Number.isInteger(args.quality) || args.quality < 35 || args.quality > 95) {
    throw new Error(`Invalid --quality value: ${args.quality}`);
  }
  return args;
}

async function pathExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function listCountryPngs(dirPath) {
  if (!(await pathExists(dirPath))) return [];
  const entries = await fs.readdir(dirPath);
  return entries
    .filter(name => /-(outline|location)\.png$/.test(name))
    .sort()
    .map(name => join(dirPath, name));
}

async function fileSize(filePath) {
  try {
    const stat = await fs.stat(filePath);
    return stat.size;
  } catch {
    return 0;
  }
}

function runSips(sourcePath, outPath, args) {
  return new Promise((resolvePromise, rejectPromise) => {
    const child = spawn('sips', [
      '-Z',
      String(args.maxPixels),
      '-s',
      'format',
      'jpeg',
      '-s',
      'formatOptions',
      String(args.quality),
      sourcePath,
      '--out',
      outPath,
    ], {
      stdio: ['ignore', 'ignore', 'pipe'],
    });
    let stderr = '';
    child.stderr.on('data', chunk => {
      stderr += chunk;
    });
    child.on('error', rejectPromise);
    child.on('close', code => {
      if (code === 0) resolvePromise();
      else rejectPromise(new Error(`sips failed for ${sourcePath}: ${stderr.trim()}`));
    });
  });
}

async function convertDir(dirPath, args, options = {}) {
  const pngs = await listCountryPngs(dirPath);
  let sourceBytes = 0;
  let jpgBytes = 0;
  let converted = 0;
  let skipped = 0;
  let pruned = 0;

  for (const pngPath of pngs) {
    sourceBytes += await fileSize(pngPath);
    const jpgPath = pngPath.replace(/\.png$/, '.jpg');
    if (!args.dryRun) {
      const pngStat = await fs.stat(pngPath);
      let shouldConvert = true;
      try {
        const jpgStat = await fs.stat(jpgPath);
        shouldConvert = jpgStat.mtimeMs < pngStat.mtimeMs || jpgStat.size === 0;
      } catch {
        shouldConvert = true;
      }
      if (shouldConvert) {
        await runSips(pngPath, jpgPath, args);
        converted += 1;
      } else {
        skipped += 1;
      }
      jpgBytes += await fileSize(jpgPath);
      if (options.prunePng) {
        await fs.unlink(pngPath);
        pruned += 1;
      }
    }
  }

  return {
    dir: dirPath,
    pngCount: pngs.length,
    converted,
    skipped,
    pruned,
    sourceBytes,
    jpgBytes,
  };
}

async function rewriteGeneratedHtml(siteRoot) {
  if (!(await pathExists(siteRoot))) return { htmlFiles: 0, updated: 0 };
  const stack = [siteRoot];
  let htmlFiles = 0;
  let updated = 0;

  while (stack.length) {
    const dirPath = stack.pop();
    const entries = await fs.readdir(dirPath, { withFileTypes: true });
    for (const entry of entries) {
      const entryPath = join(dirPath, entry.name);
      if (entry.isDirectory()) {
        if (entry.name === '.build') continue;
        stack.push(entryPath);
      } else if (entry.isFile() && entry.name.endsWith('.html')) {
        htmlFiles += 1;
        const content = await fs.readFile(entryPath, 'utf8');
        const next = content
          .replaceAll('-outline.png', '-outline.jpg')
          .replaceAll('-location.png', '-location.jpg');
        if (next !== content) {
          await fs.writeFile(entryPath, next, 'utf8');
          updated += 1;
        }
      }
    }
  }

  return { htmlFiles, updated };
}

function formatMb(bytes) {
  return `${(bytes / 1024 / 1024).toFixed(1)}M`;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const sourceDir = resolve(projectRoot, 'assets', 'images', 'countries');
  const generatedDir = resolve(projectRoot, 'generated', 'validohub', 'assets', 'images', 'countries');
  const siteRoot = resolve(projectRoot, 'generated', 'validohub');
  const results = [];

  if (args.source) {
    results.push(await convertDir(sourceDir, args));
  }

  if (args.generated) {
    results.push(await convertDir(generatedDir, args, { prunePng: args.pruneGeneratedPng }));
  }

  const html = args.generated && !args.dryRun
    ? await rewriteGeneratedHtml(siteRoot)
    : { htmlFiles: 0, updated: 0 };

  console.log('Country image optimization complete');
  for (const result of results) {
    console.log(JSON.stringify({
      dir: result.dir,
      pngCount: result.pngCount,
      converted: result.converted,
      skipped: result.skipped,
      pruned: result.pruned,
      pngBytes: result.sourceBytes,
      jpgBytes: result.jpgBytes,
      pngSize: formatMb(result.sourceBytes),
      jpgSize: formatMb(result.jpgBytes),
    }, null, 2));
  }
  if (args.generated) {
    console.log(JSON.stringify({
      generatedHtmlFiles: html.htmlFiles,
      generatedHtmlUpdated: html.updated,
      generatedPngPruning: args.pruneGeneratedPng,
      maxPixels: args.maxPixels,
      quality: args.quality,
    }, null, 2));
  }
  if (!results.some(result => result.pngCount > 0)) {
    console.warn(`No country PNGs found under ${basename(sourceDir)} or generated assets.`);
  }
}

main().catch(error => {
  console.error(error.message || error);
  process.exit(1);
});
