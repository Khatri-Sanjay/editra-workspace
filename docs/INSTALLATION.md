# Installation

Install `ngx-editra` into an existing Angular application, then import its standalone components. Their styles load automatically. The npm commands below describe consumption after publication. Until publication, use the local archive option at the end of this guide.

## 1. Check the two environments

Your consuming application needs Angular common, core, forms, and platform-browser packages that satisfy the library's peer ranges. See [compatibility](COMPATIBILITY.md). Use the Node/TypeScript versions required by that application's Angular version.

Building this repository itself uses Node 20.20.2, npm 10.8.2, Angular 17.3, and TypeScript 5.4. These are the package compilation tools; they do not require every consumer to use Angular 17. Node 20/Angular 17 are legacy tooling and compatibility is not a maintenance guarantee.

## 2. Install from npm after publication

```sh
npm install ngx-editra
```

This installs the release tagged `latest`. If the first alpha is published under the `next` tag, use:

```sh
npm install ngx-editra@next
```

For a reproducible installation of the initial alpha after it is published:

```sh
npm install ngx-editra@0.1.0-alpha.0
```

Run these commands in your application's root. Consumers do not clone this repository, build the library, configure TypeScript path aliases, or install ProseMirror packages separately.

## 3. Add the component

Both components include their default styles. You do not need to edit `styles.scss`,
register a stylesheet in `angular.json`, or install Sass. If you previously imported
`ngx-editra/styles/editor.scss` or `ngx-editra/styles/content.scss` only for these
components, remove that import to avoid duplicate CSS. Optional Sass exports remain
available for content rendered outside the components; see [theming](THEMING.md).

Continue to [Quick start](QUICK_START.md) for a complete standalone component. Import from ngx-editra; there are no separate core/extensions package imports. No Angular Material/CDK or external icon-font setup is required.

The editor is `NgxEditraComponent` with selector `<ngx-editra>`. The read-only renderer is `NgxEditraViewerComponent` with selector `<ngx-editra-viewer [html]="savedHtml" />`. Both are exported from `ngx-editra`; the viewer input is `html`.

## Local archive option before publication

For library development or testing an unpublished version, run these commands from this repository's root:

```sh
npm ci
npm run pack
```

Then, from a separate consuming application's root, install the generated archive:

```sh
npm install /absolute/path/to/artifacts/ngx-editra-0.1.0-alpha.0.tgz
```

Use the actual archive path and version. Quote paths containing spaces on Windows. Automatic styles work identically for archive and npm installations.

## Dependency notes

Angular is a peer dependency rather than a bundled runtime. ProseMirror modules and parse5 are runtime dependencies. Do not force incompatible
ProseMirror versions through package overrides. No Angular Material/CDK dependency is required.

To work on the library instead of installing it in another app, run npm start in this workspace. Open the playground URL printed by Angular CLI. For this documentation website, use npm run start:docs and open http://localhost:4300.
