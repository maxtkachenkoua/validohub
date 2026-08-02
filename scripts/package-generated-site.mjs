#!/usr/bin/env node

import { createHash } from 'node:crypto';
import { createReadStream, promises as fs } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(scriptDir, '..');

function parseArgs(argv) {
  const args = {
    siteDir: resolve(projectRoot, 'generated', 'validohub'),
    outDir: resolve(projectRoot, 'generated', 'releases'),
    format: 'tar.gz',
    releaseId: releaseIdFromDate(new Date()),
    dryRun: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    const [key, inlineValue] = arg.split('=');
    const nextValue = inlineValue ?? argv[index + 1];
    if (arg === '--dry-run') {
      args.dryRun = true;
    } else if (key === '--site-dir' && nextValue) {
      args.siteDir = resolve(projectRoot, nextValue);
      if (inlineValue === undefined) index += 1;
    } else if (key === '--out-dir' && nextValue) {
      args.outDir = resolve(projectRoot, nextValue);
      if (inlineValue === undefined) index += 1;
    } else if (key === '--format' && nextValue) {
      args.format = nextValue;
      if (inlineValue === undefined) index += 1;
    } else if (key === '--release-id' && nextValue) {
      args.releaseId = nextValue;
      if (inlineValue === undefined) index += 1;
    } else if (key === '--name' && nextValue) {
      args.name = nextValue;
      if (inlineValue === undefined) index += 1;
    }
  }

  if (!['tar.gz', 'tar.zst', 'zip'].includes(args.format)) {
    throw new Error(`Unsupported archive format: ${args.format}. Use tar.gz, tar.zst, or zip.`);
  }

  return args;
}

function releaseIdFromDate(date) {
  const pad = (value) => String(value).padStart(2, '0');
  return [
    date.getFullYear(),
    pad(date.getMonth() + 1),
    pad(date.getDate()),
    '-',
    pad(date.getHours()),
    pad(date.getMinutes()),
    pad(date.getSeconds()),
  ].join('');
}

function archiveName(args) {
  if (args.name) return args.name;
  const extension = args.format === 'zip' ? 'zip' : args.format;
  return `validohub-${args.releaseId}.${extension}`;
}

function runProcess(command, args, options = {}) {
  return new Promise((resolvePromise, rejectPromise) => {
    const child = spawn(command, args, {
      stdio: ['ignore', 'pipe', 'pipe'],
      ...options,
      env: packageEnvironment(options.env),
    });
    let stderr = '';
    child.stdout.on('data', (chunk) => process.stdout.write(chunk));
    child.stderr.on('data', (chunk) => {
      stderr += chunk;
      process.stderr.write(chunk);
    });
    child.on('error', rejectPromise);
    child.on('close', (code) => {
      if (code === 0) resolvePromise();
      else rejectPromise(new Error(`${command} exited with code ${code}${stderr ? `: ${stderr.trim()}` : ''}`));
    });
  });
}

function packageEnvironment(extraEnv = {}) {
  return {
    ...process.env,
    // Avoid macOS extended attributes in deploy archives; GNU tar on Ubuntu otherwise
    // prints one warning per file while extracting LIBARCHIVE.xattr metadata.
    COPYFILE_DISABLE: '1',
    ...extraEnv,
  };
}

function runTarZstd(siteDir, archivePath) {
  return new Promise((resolvePromise, rejectPromise) => {
    const tar = spawn('tar', ['-C', siteDir, '--exclude', '.DS_Store', '--exclude', './.build', '-cf', '-', '.'], {
      stdio: ['ignore', 'pipe', 'pipe'],
      env: packageEnvironment(),
    });
    const zstd = spawn('zstd', ['-T0', '-19', '-q', '-o', archivePath], {
      stdio: ['pipe', 'pipe', 'pipe'],
      env: packageEnvironment(),
    });
    let stderr = '';

    tar.stdout.pipe(zstd.stdin);
    tar.stderr.on('data', (chunk) => {
      stderr += chunk;
      process.stderr.write(chunk);
    });
    zstd.stderr.on('data', (chunk) => {
      stderr += chunk;
      process.stderr.write(chunk);
    });
    zstd.stdout.on('data', (chunk) => process.stdout.write(chunk));

    tar.on('error', rejectPromise);
    zstd.on('error', rejectPromise);
    tar.on('close', (code) => {
      if (code !== 0) rejectPromise(new Error(`tar exited with code ${code}${stderr ? `: ${stderr.trim()}` : ''}`));
    });
    zstd.on('close', (code) => {
      if (code === 0) resolvePromise();
      else rejectPromise(new Error(`zstd exited with code ${code}${stderr ? `: ${stderr.trim()}` : ''}`));
    });
  });
}

async function sha256File(filePath) {
  const hash = createHash('sha256');
  await new Promise((resolvePromise, rejectPromise) => {
    const stream = createReadStream(filePath);
    stream.on('data', (chunk) => hash.update(chunk));
    stream.on('error', rejectPromise);
    stream.on('end', resolvePromise);
  });
  return hash.digest('hex');
}

async function writeChecksum(filePath, checksum) {
  await fs.writeFile(`${filePath}.sha256`, `${checksum}  ${filePath.split('/').pop()}\n`, 'utf8');
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const archivePath = resolve(args.outDir, archiveName(args));
  const smokePath = resolve(args.siteDir, 'en', 'index.html');

  await fs.access(smokePath);
  await fs.mkdir(args.outDir, { recursive: true });

  console.log(`Packaging ValidoHub generated site`);
  console.log(`siteDir: ${args.siteDir}`);
  console.log(`archive: ${archivePath}`);
  console.log(`format: ${args.format}`);

  if (args.dryRun) {
    console.log('Dry run only; archive was not created.');
    return;
  }

  const startedAt = Date.now();
  if (args.format === 'tar.gz') {
    await runProcess('tar', ['-C', args.siteDir, '--exclude', '.DS_Store', '--exclude', './.build', '-czf', archivePath, '.']);
  } else if (args.format === 'tar.zst') {
    await runTarZstd(args.siteDir, archivePath);
  } else {
    await runProcess('zip', ['-qry', archivePath, '.', '-x', '*.DS_Store', '.build/*'], { cwd: args.siteDir });
  }

  const checksum = await sha256File(archivePath);
  await writeChecksum(archivePath, checksum);
  const stat = await fs.stat(archivePath);
  const elapsedSeconds = Math.round((Date.now() - startedAt) / 1000);

  console.log('✓ ValidoHub archive created');
  console.log(JSON.stringify({
    archivePath,
    checksumPath: `${archivePath}.sha256`,
    format: args.format,
    bytes: stat.size,
    sha256: checksum,
    elapsedSeconds,
  }, null, 2));
}

main().catch((error) => {
  console.error(error.message || error);
  process.exit(1);
});
