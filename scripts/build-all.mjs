import { exec } from 'node:child_process';
import { promisify } from 'node:util';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const execAsync = promisify(exec);
const scriptDir = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(scriptDir, '..');

async function runCommand(command, cwd) {
  console.log(`Running: ${command} in ${cwd}`);
  const { stdout, stderr } = await execAsync(command, { cwd });
  if (stdout) console.log(stdout);
  if (stderr) console.warn(stderr);
}

async function main() {
  try {
    console.log('=== STARTING DETERMINISTIC VALIDO-HUB BUILD PIPELINE ===');

    // 1. Compile Graph/Search Indexes
    console.log('\n[Step 1/4] Compiling Knowledge Graph & Search Indexes...');
    await runCommand('node scripts/compile-countries-registry.mjs', projectRoot);

    // 2. Publish/Materialize Static Site via Maven
    console.log('\n[Step 2/4] Executing Maven Site Publisher...');
    const engineDir = '/Users/maxtkachenko/work/valido-engine';
    await runCommand('mvn -pl valido-cli exec:java -Dexec.mainClass="com.validoengine.cli.EngineMain" -Dexec.args="publish --site /Users/maxtkachenko/work/validohub/site.yaml"', engineDir);

    // 3. Build Countries Portal Pages
    console.log('\n[Step 3/4] Rebuilding Countries Portals...');
    await runCommand('node scripts/build-countries-portal.mjs', projectRoot);

    // 4. Build Identifier Entity Pages
    console.log('\n[Step 4/4] Materializing Identifier Entity Pages...');
    await runCommand('node scripts/build-identifiers.mjs', projectRoot);

    console.log('\n=== BUILD PIPELINE SUCCESSFULLY COMPLETED ===');
  } catch (error) {
    console.error('\n!!! BUILD PIPELINE FAILED !!!');
    console.error(error);
    process.exit(1);
  }
}

main();
