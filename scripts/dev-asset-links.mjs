import { readdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

async function scanHtmlFiles(dir) {
  const out = [];
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return out;
  }

  for (const entry of entries) {
    const full = resolve(dir, entry.name);
    if (entry.isDirectory()) out.push(...await scanHtmlFiles(full));
    else if (entry.isFile() && entry.name === 'index.html') out.push(full);
  }

  return out;
}

export function updateBundleAssetLinks(content, assetsManifest) {
  let next = content;
  next = next.replace(/<link rel="stylesheet" href="\/assets\/css\/bundle\.[a-f0-9]{6}\.css">/gi, `<link rel="stylesheet" href="${assetsManifest.css}">`);
  next = next.replace(/<script src="\/assets\/js\/bundle\.[a-f0-9]{6}\.js"( defer)?><\/script>/gi, `<script src="${assetsManifest.js}" defer></script>`);
  if (!/<link rel="stylesheet" href="\/assets\/css\/bundle\.[a-f0-9]{6}\.css">/i.test(next) && !next.includes(`href="${assetsManifest.css}"`)) {
    next = next.replace('</head>', `  <link rel="stylesheet" href="${assetsManifest.css}">\n</head>`);
  }
  if (!next.includes(`src="${assetsManifest.js}"`)) {
    next = next.replace('</body>', `<script src="${assetsManifest.js}" defer></script>\n</body>`);
  }
  return next;
}

export async function refreshGeneratedAssetLinks(siteRoot, assetsManifest) {
  const htmlFiles = await scanHtmlFiles(siteRoot);
  let updated = 0;

  for (const filePath of htmlFiles) {
    const content = await readFile(filePath, 'utf8');
    const next = updateBundleAssetLinks(content, assetsManifest);
    if (next !== content) {
      await writeFile(filePath, next, 'utf8');
      updated += 1;
    }
  }

  return { checked: htmlFiles.length, updated };
}
