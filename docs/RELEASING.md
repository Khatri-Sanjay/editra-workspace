# Release preparation

1. Run the validation commands in CONTRIBUTING.md and complete the outstanding acceptance
   criteria in PROGRESS.md. Do not call this alpha a stable release.
2. Update package version, changelog, consumer tarball paths and any demonstrated peer ranges.
3. Run npm run pack (production build, dry-run package validation and actual tarball).
4. Install that exact tarball into independent consumers; run the full compatibility matrix.
5. Confirm README, LICENSE, public declarations, the single root API export and SCSS are in the archive.
6. Verify package-name ownership and npm account permissions immediately before publication.
7. After explicit owner authorization, publish the exact tested archive from the workspace root with the prerelease tag:

```sh
npm publish ./artifacts/ngx-editra-0.1.0-alpha.0.tgz --access public --tag next
```

No workflow publishes automatically. GitHub Actions prepares validation evidence and archives.
The package is named `ngx-editra`; source metadata defaults publishing to public access and the
`next` tag. The workspace root is private. Do not publish `packages/ngx-editra` directly:
ng-packagr's compiled distribution is the package consumers need. Update the archive filename
when the version changes. After a stable release is approved, explicitly publish that stable
archive with `--tag latest` and update the source publishing default accordingly.

After publication, verify the published alpha and its consumer instructions:

```sh
npm view ngx-editra@next version dist-tags peerDependencies
npm install ngx-editra@next
```

Run installation in a separate Angular application and follow [installation](INSTALLATION.md)
and [quick start](QUICK_START.md). Verify both components work without any application Sass import.
Package-name ownership and availability must be checked at release time; no name is reserved.
See the [official npm publish reference](https://docs.npmjs.com/cli/v10/commands/npm-publish/)
for archive publishing and tags.
