# Current State

This document records the current ValidoHub and Valido Engine boundary so future sessions do not accidentally undo it.

## Repository Boundary

- Valido Engine is now a generic static site generator.
- ValidoHub owns product content, configuration, and browser assets.
- Site-specific browser behavior lives in `validohub/assets/`, not in Valido Engine.
- The browser-side Workbench Framework lives in `validohub/assets/js/workbench/`.
- Tool plugins live in `validohub/assets/js/tools/`.

## Current Working Plugins

- Base64 Workbench: `assets/js/tools/base64.js`
- URL Workbench: `assets/js/tools/url.js`
- JSON Workbench: `assets/js/tools/json.js`

## Generated Site Root

The generated static site root is:

```text
/Users/maxtkachenko/work/validohub/generated/validohub
```

This is intentional. Do not serve ValidoHub from the project root. The project root contains source files such as YAML, Markdown, product docs, and raw assets. The deployable website is the generated output directory.

## Commands

Run these from `/Users/maxtkachenko/work/valido-engine`.

Doctor:

```bash
mvn -q -pl valido-cli exec:java -Dexec.mainClass=com.validoengine.cli.EngineMain -Dexec.args="doctor --site /Users/maxtkachenko/work/validohub/site.yaml"
```

Publish:

```bash
mvn -q -pl valido-cli exec:java -Dexec.mainClass=com.validoengine.cli.EngineMain -Dexec.args="publish --site /Users/maxtkachenko/work/validohub/site.yaml"
```

Local preview:

```bash
cd /Users/maxtkachenko/work/validohub/generated/validohub
python3 -m http.server 8130 --bind 127.0.0.1
```

Then open:

```text
http://127.0.0.1:8130/
```

## Local Java Note

The target stack is Java 21. Some local Codex sessions currently have only Java 17 installed. In those sessions, the established temporary validation workaround is:

```bash
mvn clean test -Dmaven.compiler.release=17
```

Do not treat this workaround as a product architecture change.

## Hard Rule

Never serve from the ValidoHub project root. Always serve from `generated/validohub` after publishing.
