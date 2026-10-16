# ngx-editra

A standalone Angular rich-text editor built on ProseMirror. **0.1.0-alpha.0 is a prerelease**;
stable-release acceptance criteria and remaining gaps are tracked in [PROGRESS.md](PROGRESS.md).
No package has been published.

Workspace structure and dependency rules are described in [ARCHITECTURE.md](ARCHITECTURE.md).
The library lives in `packages/ngx-editra`, applications in `apps/`, and documentation in `docs/`.

## Working features

HTML-valued Reactive Forms and ngModel; strict typed configuration; text marks, headings,
lists, alignment, history and keyboard shortcuts; URL-only images/videos; model-backed
media resizing; Word-style font/highlight colour palettes; quick table insertion and contextual
table controls; pointer/keyboard row and column resizing; find/replace; counts; light/dark themes;
CommonMark conversion; deterministic extensions; SSR static rendering and a hydration boundary.

## Install and use after publication

For the initial alpha published under the `next` tag:

```sh
npm install ngx-editra@next
```

Once a stable version is published under `latest`, install it with `npm install ngx-editra`.
Until publication, use the [local archive installation](docs/INSTALLATION.md#local-archive-option-before-publication).
Your Angular packages must satisfy the [peer dependency ranges](docs/COMPATIBILITY.md).

Editor and viewer styles load automatically with their components. No Sass import,
global stylesheet registration, or Sass setup is required in your application.

Import both standalone components from the public package:

```typescript
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgxEditraComponent, NgxEditraViewerComponent } from 'ngx-editra';

@Component({
	selector: 'app-article',
	standalone: true,
	imports: [ReactiveFormsModule, NgxEditraComponent, NgxEditraViewerComponent],
	template: `<ngx-editra [formControl]="body" /> <ngx-editra-viewer [html]="body.value" />`,
})
export class ArticleComponent {
	readonly body = new FormControl('<p>Hello world</p>', { nonNullable: true });
}
```

The editor's form value is HTML. Save `body.value` to your backend and pass saved HTML to
`NgxEditraViewerComponent` through `[html]`. Both components and the framework-independent
engine, media extensions and Markdown utilities are exported from `ngx-editra`.
There are no separate `/core` or `/extensions` entry points.
See [quick start](docs/QUICK_START.md), [forms](docs/ANGULAR_FORMS.md) and [viewer](docs/VIEWER.md).

## Start developing

Package compilation uses Node 20.20.2 and npm 10.8.2, matching the Angular 17 build baseline.
Both are legacy tooling; Angular consumers must use their own supported runtime requirements.

```sh
npm ci
npm start
```

The start command builds the library first. The playground imports the built package's public API.
Run `npm run watch` in another terminal when editing library sources. For production SSR:

```sh
npm run build:playground
npm run serve:ssr:playground
```

## Validate and package

```sh
npm run lint
npm run format:check
npm run typecheck
npm run test:ci
npm run build:playground
npm run test:e2e
npm run pack
npm run test:performance
```

Chrome/Chromium is required for Karma. Set CHROME_BIN to an installed executable if needed.
Playwright can use installed Chromium through EDITRA_BROWSER, or install its browser with
`npx playwright install chromium`. Windows PowerShell can use npm.cmd when npm.ps1 is blocked.
The IDE may override npm's global prefix; verify runtime versions.

## Documentation

Run the searchable documentation app with `npm run start:docs` and open
http://localhost:4300. It includes all guides, a live editor, light/dark themes, and mobile
navigation. `npm run build:docs` produces prerendered pages; `npm run serve:ssr:docs`
serves the production application. See [the app README](apps/documentation/README.md).

-   [Installation](docs/INSTALLATION.md), [quick start](docs/QUICK_START.md), [configuration](docs/CONFIGURATION.md)
-   [Forms](docs/ANGULAR_FORMS.md), [SSR](docs/SSR.md), [security/CSP](docs/SECURITY.md)
-   [Toolbar](docs/TOOLBAR.md), [images](docs/IMAGES.md), [videos](docs/VIDEOS.md), [tables](docs/TABLES.md)
-   [Plugins](docs/PLUGINS.md), [themes](docs/THEMING.md), [API](docs/API.md)
-   [Compatibility evidence](docs/COMPATIBILITY.md), [release preparation](docs/RELEASING.md)
-   [Contributing](CONTRIBUTING.md), [changelog](CHANGELOG.md), [MIT license](LICENSE)

## Limits before stable release

SSR static HTML intentionally passes through Angular sanitization, which can strip styles/iframes.
CommonMark presentation limits are documented. Optional preview cards are future work;
manual screen-reader evaluation and broader clipboard/memory/bundle hardening remain release work.
Compatibility is established by executed consumer build/forms/SSR/hydration tests, never installation alone.
