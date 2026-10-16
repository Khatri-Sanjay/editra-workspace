# editra workspace

Source repository for **ngx-editra**, a standalone Angular rich-text editor, its
playground, and its documentation website. The initial `0.1.0-alpha.0` npm release
is in preparation; no package has been published.

## Use the library

See the [npm package README](packages/ngx-editra/README.md) for installation, forms,
editor and saved-content examples. Full guides live in [docs](docs/INSTALLATION.md).
The package README is copied into the compiled npm distribution; this root README
explains repository development and deployment.

## Repository layout

| Path                | Purpose                                      | Distribution                           |
| ------------------- | -------------------------------------------- | -------------------------------------- |
| packages/ngx-editra | Public library and consumer README           | npm compiled tarball                   |
| apps/playground     | Interactive library demo                     | Separate Vercel static site            |
| apps/documentation  | Searchable guides and live example           | Separate Vercel static site            |
| docs                | Canonical feature and project guides         | GitHub, documentation app and npm docs |
| scripts             | Build, validation and deployment preparation | Workspace tooling                      |

## Develop locally

The legacy compilation baseline uses Node 20.20.2 and npm 10.8.2. Use the application's
own Angular requirements for consumers; this baseline is not a production runtime recommendation.

```sh
npm ci
npm run start:all
```

Playground: http://localhost:4200. Documentation: http://localhost:4300.
Set `PLAYGROUND_PORT` or `DOCS_PORT` to override ports. Press Ctrl+C to stop both.
Use `npm start` or `npm run start:docs` to run one app. Each starts from the compiled
public library; run `npm run watch` in another terminal when editing library sources.
Windows PowerShell can use `npm.cmd` if npm.ps1 is blocked.

## Documentation

Edit canonical Markdown in `docs/` and the root project policies, then run:

```sh
npm run docs:generate
npm run docs:check
```

Do not edit generated guide files. See the [documentation app README](apps/documentation/README.md)
and [playground README](apps/playground/README.md).

## Validate and publish the npm library

```sh
npm run validate -- --compatibility
npm run verify:evidence
```

The checks build and pack the library and install that exact archive into independent
Angular 17-22 consumers. Configure Node/browser prerequisites using the
[release guide](docs/RELEASING.md). Publishing is an explicit owner action using the
validated tarball and `next` tag. Do not publish the private workspace or source folder.

## Deploy the websites from GitHub to Vercel

The two apps are independent static sites. Build them in GitHub Actions with the
repository toolchain, then deploy the prepared output using Node 24. This avoids
Vercel's retired Node 20 build runtime and does not deploy the legacy Express SSR server.

```sh
npm run build:site -- documentation
npm run build:site -- playground
```

Use the manual **Deploy static site to Vercel** GitHub workflow for preview or production.
Configure the two Vercel projects and GitHub secrets first. Follow the complete
[deployment guide](docs/DEPLOYMENT.md); no deployment runs automatically on push.
No live site URL is claimed until a deployment has been verified.

## Project policies

[Architecture](ARCHITECTURE.md) · [Contributing](CONTRIBUTING.md) ·
[Maintenance](docs/MAINTENANCE.md) · [Project status](PROGRESS.md) ·
[Changelog](CHANGELOG.md) · [Security reporting](SECURITY.md)

## Licence

MIT. The root [LICENSE](LICENSE) is canonical and is included in the npm archive.
