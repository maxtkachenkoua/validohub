#!/usr/bin/env node

import { createHash } from 'node:crypto';
import { createReadStream, promises as fs } from 'node:fs';
import { basename, dirname, resolve } from 'node:path';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(scriptDir, '..');

const defaults = {
  host: '137.74.173.107',
  user: 'ubuntu',
  remoteRoot: '/srv/validohub',
  releaseId: null,
  archive: null,
  baseUrl: 'http://137.74.173.107',
  publicSmoke: true,
  timeoutMs: 30_000,
};

function usage() {
  return [
    'Usage:',
    '  node scripts/deploy-vps-site.mjs deploy --release-id <id> [--archive <path>] [--base-url <url>]',
    '  node scripts/deploy-vps-site.mjs rollback --release-id <id> [--base-url <url>]',
    '  node scripts/deploy-vps-site.mjs status',
    '  node scripts/deploy-vps-site.mjs list',
    '',
    'Commands:',
    '  deploy    Upload archive, verify checksum, extract immutable release, switch current, smoke-check.',
    '  rollback  Switch current to an existing release and reload Caddy.',
    '  status    Show current release, Caddy status, disk, and basic HTTP status.',
    '  list      List release directories and uploaded archives on the VPS.',
    '',
    'Options:',
    '  --host <ip-or-host>        Default: 137.74.173.107',
    '  --user <ssh-user>          Default: ubuntu',
    '  --remote-root <path>       Default: /srv/validohub',
    '  --release-id <id>          Example: 20260802-011524',
    '  --archive <path>           Default: generated/releases/validohub-<release-id>.tar.gz',
    '  --base-url <url>           Default: http://137.74.173.107',
    '  --no-public-smoke          Skip public HTTP checks after switch.',
  ].join('\n');
}

function parseArgs(argv) {
  const command = argv[0];
  const args = { ...defaults };
  for (let index = 1; index < argv.length; index += 1) {
    const arg = argv[index];
    const [key, inlineValue] = arg.split('=');
    const nextValue = inlineValue ?? argv[index + 1];
    if (arg === '--no-public-smoke') {
      args.publicSmoke = false;
    } else if (key === '--host' && nextValue) {
      args.host = nextValue;
      if (inlineValue === undefined) index += 1;
    } else if (key === '--user' && nextValue) {
      args.user = nextValue;
      if (inlineValue === undefined) index += 1;
    } else if (key === '--remote-root' && nextValue) {
      args.remoteRoot = nextValue;
      if (inlineValue === undefined) index += 1;
    } else if (key === '--release-id' && nextValue) {
      args.releaseId = nextValue;
      if (inlineValue === undefined) index += 1;
    } else if (key === '--archive' && nextValue) {
      args.archive = resolve(projectRoot, nextValue);
      if (inlineValue === undefined) index += 1;
    } else if (key === '--base-url' && nextValue) {
      args.baseUrl = nextValue.replace(/\/+$/, '');
      if (inlineValue === undefined) index += 1;
    } else {
      throw new Error(`Unknown option: ${arg}\n\n${usage()}`);
    }
  }
  return { command, args };
}

function validateReleaseId(releaseId) {
  if (!releaseId || !/^[0-9]{8}-[0-9]{6}[A-Za-z0-9._-]*$/.test(releaseId)) {
    throw new Error(`Invalid or missing release id: ${releaseId || '(missing)'}`);
  }
}

function sshTarget(args) {
  return `${args.user}@${args.host}`;
}

function shellQuote(value) {
  return `'${String(value).replaceAll("'", "'\"'\"'")}'`;
}

function remotePath(...parts) {
  return parts.map(part => String(part).replace(/^\/+|\/+$/g, '')).filter(Boolean).join('/');
}

function run(command, args, options = {}) {
  return new Promise((resolvePromise, rejectPromise) => {
    const child = spawn(command, args, {
      cwd: options.cwd || projectRoot,
      stdio: options.capture ? ['ignore', 'pipe', 'pipe'] : ['ignore', 'pipe', 'pipe'],
    });
    let stdout = '';
    let stderr = '';
    child.stdout.on('data', (chunk) => {
      stdout += chunk;
      if (!options.capture) process.stdout.write(chunk);
    });
    child.stderr.on('data', (chunk) => {
      stderr += chunk;
      if (!options.capture) process.stderr.write(chunk);
    });
    child.on('error', rejectPromise);
    child.on('close', (code) => {
      if (code === 0) {
        resolvePromise({ stdout, stderr });
      } else {
        rejectPromise(new Error(`${command} ${args.join(' ')} failed with code ${code}${stderr ? `: ${stderr.trim()}` : ''}`));
      }
    });
  });
}

async function ssh(args, command, options = {}) {
  return run('ssh', [sshTarget(args), command], options);
}

async function remoteCapture(args, command) {
  const result = await ssh(args, command, { capture: true });
  return result.stdout.trim();
}

async function sha256File(filePath) {
  const hash = createHash('sha256');
  await new Promise((resolvePromise, rejectPromise) => {
    const stream = createReadStream(filePath);
    stream.on('data', chunk => hash.update(chunk));
    stream.on('error', rejectPromise);
    stream.on('end', resolvePromise);
  });
  return hash.digest('hex');
}

async function verifyLocalArchive(archivePath) {
  const checksumPath = `${archivePath}.sha256`;
  await fs.access(archivePath);
  await fs.access(checksumPath);
  const expectedLine = await fs.readFile(checksumPath, 'utf8');
  const expected = expectedLine.trim().split(/\s+/)[0];
  const actual = await sha256File(archivePath);
  if (expected !== actual) {
    throw new Error(`Local checksum mismatch for ${archivePath}: expected ${expected}, got ${actual}`);
  }
  return { checksumPath, sha256: actual };
}

function archivePathFor(args) {
  if (args.archive) return args.archive;
  validateReleaseId(args.releaseId);
  return resolve(projectRoot, 'generated', 'releases', `validohub-${args.releaseId}.tar.gz`);
}

function archiveFormat(archivePath) {
  if (archivePath.endsWith('.tar.gz')) return 'tar.gz';
  if (archivePath.endsWith('.tar.zst')) return 'tar.zst';
  if (archivePath.endsWith('.zip')) return 'zip';
  throw new Error(`Unsupported archive format: ${archivePath}`);
}

function remoteReleaseDir(args, releaseId = args.releaseId) {
  return `/${remotePath(args.remoteRoot, 'releases', releaseId)}`;
}

function remoteArchivePath(args, archiveBaseName) {
  return `/${remotePath(args.remoteRoot, 'releases', archiveBaseName)}`;
}

function remoteChecksumCommand(archiveBaseName) {
  const checksum = shellQuote(`${archiveBaseName}.sha256`);
  return `if command -v sha256sum >/dev/null 2>&1; then sha256sum -c ${checksum}; else shasum -a 256 -c ${checksum}; fi`;
}

function remoteExtractCommand(args, archiveBaseName, format) {
  const releasesDir = `/${remotePath(args.remoteRoot, 'releases')}`;
  const releaseDir = remoteReleaseDir(args);
  const archivePath = remoteArchivePath(args, archiveBaseName);
  const quotedReleaseDir = shellQuote(releaseDir);
  const quotedArchivePath = shellQuote(archivePath);
  let extract;
  if (format === 'tar.gz') {
    extract = `tar --warning=no-unknown-keyword -xzf ${quotedArchivePath} -C ${quotedReleaseDir}`;
  } else if (format === 'tar.zst') {
    extract = `tar --warning=no-unknown-keyword --use-compress-program=unzstd -xf ${quotedArchivePath} -C ${quotedReleaseDir}`;
  } else {
    extract = `unzip -q ${quotedArchivePath} -d ${quotedReleaseDir}`;
  }
  return [
    'set -e',
    `cd ${shellQuote(releasesDir)}`,
    `if [ -e ${quotedReleaseDir} ]; then echo "release directory already exists: ${releaseDir}" >&2; exit 3; fi`,
    `mkdir -p ${quotedReleaseDir}`,
    extract,
    `test -f ${shellQuote(`${releaseDir}/en/index.html`)}`,
    `test -f ${shellQuote(`${releaseDir}/sitemap.xml`)}`,
    `find ${shellQuote(`${releaseDir}/assets/css`)} -maxdepth 1 -name 'bundle.*.css' -type f | grep -q .`,
    `find ${shellQuote(`${releaseDir}/assets/js`)} -maxdepth 1 -name 'bundle.*.js' -type f | grep -q .`,
    `printf '%s\\n' ${shellQuote(args.releaseId)} > ${shellQuote(`${releaseDir}/.validohub-release`)}`,
    `echo "release ready: ${releaseDir}"`,
  ].join('; ');
}

async function ensureRemoteRoot(args) {
  const root = shellQuote(args.remoteRoot);
  await ssh(args, `set -e; sudo mkdir -p ${root}/releases; sudo chown -R ${shellQuote(args.user)}:${shellQuote(args.user)} ${root}; test -d ${root}/releases`);
}

async function uploadArchive(args, archivePath, checksumPath) {
  await run('rsync', [
    '-ah',
    '--progress',
    '--partial',
    '--timeout=60',
    archivePath,
    checksumPath,
    `${sshTarget(args)}:${remoteReleaseDir({ ...args, releaseId: '' }).replace(/\/$/, '')}/`,
  ]);
}

async function publicSmoke(args) {
  if (!args.publicSmoke) return;
  const urls = [
    `${args.baseUrl}/`,
    `${args.baseUrl}/en/`,
    `${args.baseUrl}/en/tools/`,
  ];
  for (const url of urls) {
    const response = await fetch(url, { method: 'HEAD', redirect: 'follow', signal: AbortSignal.timeout(args.timeoutMs) });
    if (!response.ok) {
      throw new Error(`Public smoke failed for ${url}: HTTP ${response.status}`);
    }
    console.log(`✓ ${url} -> ${response.status}`);
  }
}

async function currentReleasePath(args) {
  return remoteCapture(args, `readlink -f ${shellQuote(`${args.remoteRoot}/current`)} 2>/dev/null || true`);
}

async function switchRelease(args, releaseId) {
  validateReleaseId(releaseId);
  const releaseDir = remoteReleaseDir(args, releaseId);
  const previous = await currentReleasePath(args);
  await ssh(args, [
    'set -e',
    `test -f ${shellQuote(`${releaseDir}/en/index.html`)}`,
    `ln -sfn ${shellQuote(releaseDir)} ${shellQuote(`${args.remoteRoot}/current`)}`,
    `printf '%s\\n' ${shellQuote(previous)} > ${shellQuote(`${args.remoteRoot}/previous-release`)}`,
    'sudo systemctl reload caddy',
    `echo "current -> ${releaseDir}"`,
  ].join('; '));
  return previous;
}

async function rollbackToPrevious(args, previous) {
  if (!previous) return;
  console.error(`Public smoke failed; rolling back to ${previous}`);
  await ssh(args, [
    'set -e',
    `test -f ${shellQuote(`${previous}/en/index.html`)}`,
    `ln -sfn ${shellQuote(previous)} ${shellQuote(`${args.remoteRoot}/current`)}`,
    'sudo systemctl reload caddy',
    `echo "rolled back -> ${previous}"`,
  ].join('; '));
}

async function deploy(args) {
  validateReleaseId(args.releaseId);
  const archivePath = archivePathFor(args);
  const format = archiveFormat(archivePath);
  const archiveBaseName = basename(archivePath);
  const { checksumPath, sha256 } = await verifyLocalArchive(archivePath);
  console.log(`Local archive OK: ${archivePath}`);
  console.log(`sha256: ${sha256}`);

  await ensureRemoteRoot(args);
  await uploadArchive(args, archivePath, checksumPath);
  await ssh(args, [
    'set -e',
    `cd ${shellQuote(`${args.remoteRoot}/releases`)}`,
    remoteChecksumCommand(archiveBaseName),
  ].join('; '));
  await ssh(args, remoteExtractCommand(args, archiveBaseName, format));

  const previous = await switchRelease(args, args.releaseId);
  try {
    await publicSmoke(args);
  } catch (error) {
    await rollbackToPrevious(args, previous);
    throw error;
  }
  console.log(`✓ Deployed ${args.releaseId}`);
}

async function rollback(args) {
  validateReleaseId(args.releaseId);
  await switchRelease(args, args.releaseId);
  await publicSmoke(args);
  console.log(`✓ Rolled back/switched to ${args.releaseId}`);
}

async function status(args) {
  const command = [
    'set -e',
    `echo "host: $(hostname)"`,
    `echo "current: $(readlink -f ${shellQuote(`${args.remoteRoot}/current`)} 2>/dev/null || true)"`,
    `echo "previous: $(cat ${shellQuote(`${args.remoteRoot}/previous-release`)} 2>/dev/null || true)"`,
    `echo "caddy: $(systemctl is-active caddy || true)"`,
    'df -h /',
    `echo "release dirs: $(find ${shellQuote(`${args.remoteRoot}/releases`)} -mindepth 1 -maxdepth 1 -type d 2>/dev/null | wc -l | tr -d ' ')"`,
    `echo "uploaded archives: $(find ${shellQuote(`${args.remoteRoot}/releases`)} -maxdepth 1 -type f -name 'validohub-*.tar.*' 2>/dev/null | wc -l | tr -d ' ')"`,
  ].join('; ');
  await ssh(args, command);
  await publicSmoke(args);
}

async function list(args) {
  const releasesDir = `${args.remoteRoot}/releases`;
  await ssh(args, [
    'set -e',
    `echo "release directories:"`,
    `find ${shellQuote(releasesDir)} -maxdepth 1 -mindepth 1 -type d -printf '%f\\n' | sort || true`,
    `echo`,
    `echo "archives:"`,
    `find ${shellQuote(releasesDir)} -maxdepth 1 -type f \\( -name 'validohub-*.tar.gz' -o -name 'validohub-*.tar.zst' -o -name 'validohub-*.zip' \\) -printf '%f %s bytes\\n' | sort || true`,
  ].join('; '));
}

async function main() {
  const { command, args } = parseArgs(process.argv.slice(2));
  if (command === 'deploy') {
    await deploy(args);
  } else if (command === 'rollback') {
    await rollback(args);
  } else if (command === 'status') {
    await status(args);
  } else if (command === 'list') {
    await list(args);
  } else {
    throw new Error(usage());
  }
}

main().catch((error) => {
  console.error(error.message || error);
  process.exit(1);
});
