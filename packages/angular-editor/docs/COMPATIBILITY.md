# Compatibility evidence

The package is compiled with Angular 17 APIs and partial-Ivy. The exact installed tarball
was validated in independent applications with normal npm peer resolution and isolated tooling.

| Angular | Node    | TypeScript | Production build | Forms | SSR  | Hydration boundary activation | Browser E2E |
| ------- | ------- | ---------- | ---------------- | ----- | ---- | ----------------------------- | ----------- |
| 17.3.12 | 20.20.2 | 5.4.5      | Pass             | Pass  | Pass | Pass                          | 16 passed   |
| 18.2.14 | 20.20.2 | 5.5.4      | Pass             | Pass  | Pass | Pass                          | 16 passed   |
| 19.2.25 | 20.20.2 | 5.8.3      | Pass             | Pass  | Pass | Pass                          | 16 passed   |
| 20.3.33 | 20.20.2 | 5.9.3      | Pass             | Pass  | Pass | Pass                          | 16 passed   |
| 21.2.25 | 24.21.0 | 5.9.3      | Pass             | Pass  | Pass | Pass                          | 16 passed   |
| 22.2.2  | 24.21.0 | 6.0.3      | Pass             | Pass  | Pass | Pass                          | 16 passed   |

Tests exercise reactive forms, reset, disabled/read-only mode, repeated mounting, selection formatting,
security rejection, URL media, tables, themes, mobile layout, axe accessibility, server HTML and browser
activation without duplicate nodes or browser console/runtime errors. Media responses are mocked;
this establishes integration and canonical URLs, not external provider availability.

The editor host deliberately uses ngSkipHydration. The surrounding application hydrates;
ProseMirror-managed DOM is activated after rendering rather than hydrated directly.

Peer ranges begin at tested patch versions: ^17.3.12 || ^18.2.14 || ^19.2.25 || ^20.3.33 ||
^21.2.25 || ^22.2.2. Future patches/minors rely on SemVer expectations and should remain in CI;
older patches and future Angular majors are not claimed as verified.

Machine-readable results: artifacts/compatibility-results.json and per-version E2E reports.
The separate playground suite passed 21 tests and the core/Angular suite passed 41 tests.
The consumer suite includes colour palettes, quick table insertion, pointer/keyboard row and column
resizing, isolated undo, save/reload, merged cells, AutoFit, and light/dark/mobile accessibility.
It also covers automatic image/video dimensions, fitted alignment, full-content-width mode,
iframe pointer resizing, independent dimensions, responsive media and actual MP4 metadata.
The maintained Angular 22 production graph's npm audit reported zero vulnerabilities at validation time.
GitHub Actions is configured but has not executed remotely in this environment.

To rerun, set EDITRA_NPM_CLI to npm's JavaScript CLI, EDITRA_NODE20 and EDITRA_NODE24 to
appropriate executables, optionally EDITRA_BROWSER to an installed Chromium browser, then
run npm run test:compatibility. Each consumer has its own package-lock.json. When validating
unchanged consumers, npm ci installs the existing lockfile; the runner uses npm install to refresh
an explicitly supplied newly built tarball. Candidate-only peer bypass requires explicit
EDITRA_CANDIDATE_PEERS=1 and is not used for the final report.

Legacy Angular and Node versions have reached end of support. Compatibility is not a
security-maintenance guarantee. Runtime/compiler ranges are based on the
[official Angular table](https://angular.dev/reference/versions).
