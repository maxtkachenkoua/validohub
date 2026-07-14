import { readdir, readFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { normalizeCountryData } from './country-page-model.mjs';
import { renderCountryVisualHero, renderCountryCompletionCard, renderCountryOutlineCard, renderCountryLocationMapCard } from './render-country-visuals.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, '..');
const dataDir = resolve(projectRoot, 'countries/data');

async function testDeterministicRendering(model) {
  console.log(`Testing deterministic output for ${model.displayName}...`);
  const firstHero = await renderCountryVisualHero(model);
  const secondHero = await renderCountryVisualHero(model);
  
  if (firstHero !== secondHero) {
    throw new Error(`Regression: Visual hero renderer did not emit byte-identical output for ${model.displayName}`);
  }
  
  const firstProgress = renderCountryCompletionCard(model);
  const secondProgress = renderCountryCompletionCard(model);
  
  if (firstProgress !== secondProgress) {
    throw new Error(`Regression: Progress card renderer did not emit byte-identical output for ${model.displayName}`);
  }
}

async function testNoInlineStylesOrImgFallback(html, displayName) {
  console.log(`Verifying CSS and image constraints for ${displayName}...`);
  
  // 1. Assert no <img tag for the country outlines
  if (html.includes('<img') || html.includes('img src=')) {
    throw new Error(`Validation Error: Visual elements for ${displayName} contain an <img> tag fallback instead of inline SVG`);
  }

  // 2. Assert no inline style attributes (excluding internal SVG elements that might have style elements or attributes)
  // We check that the wrapper div/header tags don't contain style="..."
  const tagsWithStyle = html.match(/<(header|div|article|section|p|span|progress|h1|h3)[^>]+style=["'][^"']*["']/gi);
  if (tagsWithStyle) {
    throw new Error(`Validation Error: Visual components for ${displayName} contain inline style attributes: ${tagsWithStyle.join(', ')}`);
  }
}

async function main() {
  console.log('=== STARTING COUNTRY VISUALS UNIT TESTS ===');

  const files = await readdir(dataDir);
  const jsonFiles = files.filter(f => f.endsWith('.json') && f !== 'schema.json');

  for (const file of jsonFiles) {
    const raw = JSON.parse(await readFile(resolve(dataDir, file), 'utf8'));
    const model = normalizeCountryData(raw);

    // Skip testing visuals for countries that don't have outline/location map assets
    if (!model.visualAssets.outlineSrc || !model.visualAssets.mapSrc) {
      console.log(`Skipping visual checks for ${file} (missing map/outline src config)`);
      continue;
    }

    console.log(`\nValidating visuals for: ${model.displayName}`);
    
    // Render individual cards
    const outlineHtml = await renderCountryOutlineCard(model);
    const locationHtml = await renderCountryLocationMapCard(model);
    const progressHtml = renderCountryCompletionCard(model);
    const heroHtml = await renderCountryVisualHero(model);

    // Assert files exist and are referenced in components
    if (!outlineHtml.includes('<svg') || !outlineHtml.includes('</svg>')) {
      throw new Error(`Validation Error: Embedded outline SVG block is missing in ${model.displayName}`);
    }
    if (!locationHtml.includes('<svg') || !locationHtml.includes('</svg>')) {
      throw new Error(`Validation Error: Embedded location SVG block is missing in ${model.displayName}`);
    }

    // Assert vh-country-* class is applied for theme resolution
    const themeClass = `vh-country-theme--${model.slug}`;
    const slugClass = `vh-country-${model.slug}`;
    if (!heroHtml.includes(themeClass) || !heroHtml.includes(slugClass)) {
      throw new Error(`Validation Error: Hero markup for ${model.displayName} is missing theme classes: ${themeClass} / ${slugClass}`);
    }

    // Verify rules
    await testNoInlineStylesOrImgFallback(heroHtml, model.displayName);
    await testNoInlineStylesOrImgFallback(progressHtml, model.displayName);
    await testDeterministicRendering(model);

    console.log(`✓ Passed: Visual checks for ${model.displayName} passed successfully.`);
  }

  console.log('\n🎉 ALL COUNTRY VISUAL TESTS PASSED SUCCESSFULLY!');
}

main().catch(err => {
  console.error('\n❌ COUNTRY VISUAL TEST SUITE FAILED:');
  console.error(err.message || err);
  process.exit(1);
});
