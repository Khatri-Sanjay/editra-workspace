# Release preparation

1. Run the validation commands in CONTRIBUTING.md and complete the outstanding acceptance
   criteria in PROGRESS.md. Do not call this alpha a stable release.
2. Update package version, changelog, consumer tarball paths and any demonstrated peer ranges.
3. Run npm run pack (production build, dry-run package validation and actual tarball).
4. Install that exact tarball into independent consumers; run the full compatibility matrix.
5. Confirm README, LICENSE, public declarations, core/extensions exports and SCSS are in the archive.
6. Verify package-name ownership and npm account permissions immediately before publication.
7. After explicit owner authorization, publish from dist/ngx-editra with an appropriate prerelease tag:

```sh
npm publish --tag next
```

No workflow publishes automatically. GitHub Actions prepares validation evidence and archives.
The npm names checked during development were unregistered; that does not reserve a name or scope.
