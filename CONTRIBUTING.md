# Contributing

Use Node 20.20.2/npm 10.8.2 for package compilation. Run npm ci, npm run format:check,
npm run lint, npm run typecheck, npm run build, npm run test:ci and npm run build:playground.
Browser tests use npm run test:e2e; install Chromium with npx playwright install chromium
or set EDITRA_BROWSER to an installed compatible browser executable.

Core must have no Angular runtime dependency or browser-global evaluation. Keep changes transaction-based,
strictly typed and covered by meaningful tests. Do not use any, ts-ignore or sanitizer bypasses.
New features need security, serialization, undo/redo and accessibility consideration.
Run npm run pack and test the tarball in independent consumers before widening peer ranges.
Compatibility scripts require EDITRA_NPM_CLI, EDITRA_NODE20 and EDITRA_NODE24 as documented
in scripts/run-compatibility.mjs. Consumer lockfiles keep each tooling graph separate.

Update PROGRESS.md, docs and CHANGELOG.md. Never publish automatically or claim unexecuted checks passed.
