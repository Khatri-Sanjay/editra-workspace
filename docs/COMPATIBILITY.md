# Compatibility evidence

The package is compiled with Angular 17 APIs and partial-Ivy. Consumer compatibility is
validated against the exact packed archive rather than an import from library source.
Historical results do not validate a changed source tree or archive.

## Declared consumer matrix

| Angular line | Peer range starts at | Consumer runtime |
| ------------ | -------------------- | ---------------- |
| 17           | 17.3.12              | EDITRA_NODE20    |
| 18           | 18.2.14              | EDITRA_NODE20    |
| 19           | 19.2.25              | EDITRA_NODE20    |
| 20           | 20.3.33              | EDITRA_NODE20    |
| 21           | 21.2.25              | EDITRA_NODE24    |
| 22           | 22.2.2               | EDITRA_NODE24    |

These ranges describe integration compatibility, not upstream security maintenance.
The runtime/compiler combination for each fixture is declared in its package manifest.
TypeScript changes require review against that Angular line's supported toolchain.
Future Angular majors are not claimed as verified.

## Current results

Run `npm run validate -- --compatibility`, followed by `npm run verify:evidence`.
Use `artifacts/release-validation.json` and `artifacts/compatibility-results.json` for
current results. Each consumer records Angular/Node versions, lockfile hash, browser
results, source fingerprint and archive SHA-256. The verifier rejects mismatched evidence.
No fixed test totals are copied into this guide. The Angular 22 consumer also performs
a production dependency audit and saves its report under artifacts/.

The runner installs the archive with normal npm peer resolution in independent Angular
applications. Coverage includes production build, forms, reset, disabled/read-only modes,
repeated mounting, selection formatting, HTML security rejection, media, tables, themes,
mobile layouts, automated accessibility, SSR and hydration. It also exercises the content
directive, HTML pipe and viewer through the public package entry point, including shared
styles and browser code-copy controls.

The editor host deliberately uses ngSkipHydration. The surrounding application hydrates;
ProseMirror-managed DOM activates after rendering. Media requests are mocked for deterministic
tests; valid canonical URLs do not establish external provider availability.

## Reproduce

Set EDITRA_NODE20 and EDITRA_NODE24 to suitable executables, EDITRA_NPM_CLI to npm's
JavaScript CLI when not running through npm, and optionally EDITRA_BROWSER to a compatible
installed Chromium browser. Run the full validation command above, or `npm run pack`
followed by `npm run test:compatibility` for consumer-only verification of a fresh archive.
The runner rejects a package manifest that does not match the current source/archive.

Consumer manifests and independent lockfiles are maintained without generated archive
references. The runner temporarily installs a candidate, records the installed lockfile
hash, and restores both files after testing, including on failure.
Candidate peer bypass is an explicit development option and does not
establish release compatibility. Release verification requires the normal-peer matrix.

See [maintenance policy](MAINTENANCE.md) for legacy tooling and migration requirements and
[the official Angular compatibility table](https://angular.dev/reference/versions) when
reviewing a toolchain update. Remote CI and repository protections must be verified on
the actual release revision; local reports do not prove those settings are enabled.
