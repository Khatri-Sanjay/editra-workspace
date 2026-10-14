# Installation

This repository currently produces a prerelease tarball. It has not been published.

```sh
npm ci
npm run pack
# From an independent Angular application:
npm install /absolute/path/to/artifacts/ngx-editra-0.1.0-alpha.0.tgz
```

Angular core, common and forms are peers. Angular is never bundled. See COMPATIBILITY.md
for executed version evidence. Use the Node/TypeScript range required by your Angular version.
The library build itself uses Node 20.20.2/npm 10.8.2/Angular 17.3/TypeScript 5.4.

Add the public stylesheet to your application's SCSS:

```scss
@use 'ngx-editra/styles/editor.scss';
```

ProseMirror modules and parse5 are runtime dependencies. Do not force incompatible
ProseMirror versions through package overrides. No Angular Material/CDK dependency is required.
