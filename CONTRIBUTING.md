# Contributing

Use Node 20.20.2/npm 10.8.2 for package compilation. Run npm ci, npm run format:check,
npm run lint, npm run typecheck, npm run build, npm run test:ci and npm run build:playground.
Browser tests use npm run test:e2e; install Chromium with npx playwright install chromium
or set EDITRA_BROWSER to an installed compatible browser executable.

Core must have no Angular runtime dependency or browser-global evaluation. Keep changes transaction-based,
strictly typed and covered by meaningful tests. Do not use any or ts-ignore. The only permitted Angular
HTML trust boundary is EditraHtmlPipe: it must reconstruct input through staticPreview's schema-based
parser and serializer before calling bypassSecurityTrustHtml. Never trust raw input or bypass this
validation path. Custom schema serializers are trusted application code and require independent review.
New features need security, serialization, undo/redo and accessibility consideration.
Run npm run pack and test the tarball in independent consumers before widening peer ranges.
Compatibility scripts require EDITRA_NPM_CLI, EDITRA_NODE20 and EDITRA_NODE24 as documented
in scripts/run-compatibility.mjs. Consumer lockfiles keep each tooling graph separate.

Update PROGRESS.md, docs and CHANGELOG.md. Never publish automatically or claim unexecuted checks passed.

`npm start` and `npm run build:playground` build the library first. During library development,
run `npm run watch` in a second terminal to refresh the distribution consumed by the apps.
Run `npm run test:architecture` when changing import-boundary rules. Browser unit tests use
CHROME_BIN; Playwright uses EDITRA_BROWSER when a system Chromium browser is selected.

Root documents and `docs/` are canonical. Do not copy them into package source.
`npm run build` compiles the library and assembles documents directly in `dist/ngx-editra`;
bare `ng build ngx-editra` and `npm run watch` compile code and local styles only.
The package source contains implementation and configuration; generated output belongs
in `dist/`, reports and archives in `artifacts/`. See ARCHITECTURE.md for ownership.
