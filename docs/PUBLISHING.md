# Publish ngx-editra to npm

This guide publishes the initial `ngx-editra@0.1.0-alpha.0` prerelease with the
`next` tag. Run commands from the workspace root in PowerShell, one at a time.
Stop whenever a command fails. Validation and dry runs do not publish anything;
step 7 makes the package public.

## 1. Prepare your npm account

Create an account at [npm](https://www.npmjs.com/signup), verify your email address,
and enable two-factor authentication in account settings. Complete authentication
prompts in your own browser or terminal; never commit or share tokens or OTP codes.
See [npm publishing authentication](https://docs.npmjs.com/requiring-2fa-for-package-publishing-and-settings-modification/).

## 2. Configure the Windows toolchain

The compilation baseline is Node 20.20.2/npm 10.8.2. Compatibility tests also need
Node 24 and a Chromium browser. Adjust these executable paths for your machine.
This example uses the existing local installations and Microsoft Edge:

```powershell
cd F:\POJECTS\editra-workspace

$env:EDITRA_NODE20 = 'C:\Program Files\nodejs\node.exe'
$env:EDITRA_NODE24 = 'C:\Users\Sanjay Khatri\AppData\Local\JetBrains\IntelliJIdea2026.2\acp-agents\.runtimes\node\24.19.0\node.exe'
$env:EDITRA_NPM_CLI = 'C:\Program Files\nodejs\node_modules\npm\bin\npm-cli.js'
$env:PATH = 'C:\Program Files\nodejs;' + $env:PATH
$env:CHROME_BIN = 'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'
$env:EDITRA_BROWSER = $env:CHROME_BIN

function editraNpm { & $env:EDITRA_NODE20 $env:EDITRA_NPM_CLI @args }

& $env:EDITRA_NODE20 --version
& $env:EDITRA_NODE24 --version
editraNpm --version
```

Expect Node 20, Node 24 and npm 10 respectively. The `editraNpm` helper explicitly
selects npm 10; changing PATH alone can still select another npm installation.
Keep this terminal open for the remaining steps. These environment variables and
the helper apply only to this terminal session.

## 3. Sign in and check the package name

```powershell
editraNpm login --registry=https://registry.npmjs.org/
editraNpm whoami --registry=https://registry.npmjs.org/
editraNpm view ngx-editra name versions --registry=https://registry.npmjs.org/
```

Complete the browser login and confirm `whoami` prints your intended account.
An E404 from `view` means no existing package was found; it does not reserve the
name or guarantee npm will allow publication. If a package exists, confirm you
have publishing access and the intended version has never been published.

The version comes from `packages/ngx-editra/package.json`, not the private root
package. If you change the version, update release notes and tarball references
before validation. See the [release process](RELEASING.md).

## 4. Stop dev servers and install dependencies

Press Ctrl+C in terminals running `start:all`, `ng serve`, or build watchers.
Stop corresponding IDE run configurations too. Running servers can lock esbuild
and Rollup files on Windows.

```powershell
editraNpm ci
```

Wait for successful completion before continuing. Review current dependency
findings with `editraNpm audit` and, separately, `editraNpm audit --omit=dev`.
Audit can exit nonzero when it finds vulnerabilities. Resolve or document findings
under the [maintenance policy](MAINTENANCE.md); the workspace audit includes app
and legacy toolchain dependencies, so assess the library and supported consumers
as well. Do not blindly run `npm audit fix --force` before a release.

## 5. Validate the exact release

```powershell
editraNpm run validate -- --compatibility
editraNpm run verify:evidence
```

Both commands must succeed. Validation builds and packs the library, exercises
the apps, and installs the generated archive in independent Angular 17–22 consumers.
The archive for this version is:

```text
artifacts/ngx-editra-0.1.0-alpha.0.tgz
```

Review `artifacts/release-validation.json` and `artifacts/compatibility-results.json`,
complete applicable manual release checks, and confirm remote CI passes for the
release revision. Remaining acceptance work is tracked in [project status](../PROGRESS.md).
Do not represent this alpha as stable.

Source, documentation, or archive changes invalidate release evidence. Make all
edits before validation; if anything changes afterward, repeat this step. Do not
rebuild or repack after verification and then publish the replacement archive.

## 6. Preview package publication

```powershell
editraNpm publish ./artifacts/ngx-editra-0.1.0-alpha.0.tgz --access public --tag next --registry=https://registry.npmjs.org/ --dry-run
```

Review the package name, version, tag and file list. Confirm the archive contains
compiled library files, public declarations, README, LICENSE and distributed
styles. A successful dry run checks packaging; it does not prove publishing
permissions or reserve the name/version.

## 7. Publish the tested archive

When you intend to make this release public, run:

```powershell
editraNpm run verify:evidence
editraNpm publish ./artifacts/ngx-editra-0.1.0-alpha.0.tgz --access public --tag next --registry=https://registry.npmjs.org/
```

Run the second command only if evidence verification succeeds. Complete npm's
authentication prompt. Publish the tested tarball, not the private workspace root
or `packages/ngx-editra` source directory. No repository workflow publishes npm
packages automatically.

The `next` tag identifies the prerelease. A published name/version combination
cannot be reused, even after unpublishing. See the [npm publish reference](https://docs.npmjs.com/cli/commands/npm-publish/).

## 8. Verify the public package

```powershell
editraNpm view ngx-editra@0.1.0-alpha.0 version dist.integrity --registry=https://registry.npmjs.org/
editraNpm view ngx-editra dist-tags --registry=https://registry.npmjs.org/
```

Confirm `next` points to `0.1.0-alpha.0` and open the
[package page](https://www.npmjs.com/package/ngx-editra). In a separate supported
Angular application, install the release:

```powershell
npm.cmd install ngx-editra@next
```

Follow [quick start](QUICK_START.md) and verify editing, forms, saved-content
rendering and code copying without an application Sass import. Update repository
release status and installation instructions to reflect the actual publication,
then regenerate the documentation. Never mark publication complete before npm
confirms it.

## Troubleshooting

### EPERM unlink: esbuild.exe or Rollup

A running dev server, watcher or other process may hold the file open. Stop this
workspace's servers and watchers, then retry `editraNpm ci`. If the lock remains,
close the relevant IDE run configuration or restart Windows and retry before
starting the apps. Do not kill every Node process or disable antivirus globally.

### Cannot find markdown-it after npm ci failed

The dependency installation is incomplete. Fix the install error and rerun
`editraNpm ci` successfully before validation. Do not install a single missing
package to conceal the interrupted clean install.

### Validation is incomplete or failed

Fix the first failed validation step, rerun the complete compatibility validation,
then verify evidence again. Never edit evidence reports to mark checks as passed.

### E401, E403 or version already exists

For authentication errors, repeat login and confirm `whoami`. For E403, read npm's
message and check account permissions, 2FA requirements and package-name policy.
If the version exists, inspect the registry first: a previous attempt may have
succeeded. A genuinely new release needs a new version and fresh validation.

## Subsequent releases

Use a new version such as `0.1.0-alpha.1`, update the changelog and tarball
references, then repeat validation and publication using `next`. Release `1.0.0`
or another stable version with `latest` only after stable acceptance criteria are
met; review the package's default publishing tag at that time.
