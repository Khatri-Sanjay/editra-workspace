# Documentation application

Use the workspace's Node 20.20.2 / npm 10.8.2 toolchain:

```sh
npm ci
npm run start:docs
```

Open http://localhost:4300. The start command builds the library first so the live example
uses its public distribution entry points.

For production:

```sh
npm run build:docs
npm run serve:ssr:docs
```

The production build prerenders the home page, live example, and all 18 guide pages.
`dist/documentation/browser` can be deployed to a static host supporting directory indexes
and an index.html fallback for unknown client-side routes. The SSR server defaults to port 4300;
set PORT to override it.

Edit files in `docs/`, PROGRESS.md, CONTRIBUTING.md, or CHANGELOG.md to update guides.
`npm run docs:generate` converts them to typed page data and regenerates the prerender routes.
Do not edit `src/app/generated/guides.ts` directly. Markdown-it is a build-time dependency;
raw HTML is disabled, and Angular sanitizes the rendered guide HTML. The generator rewrites
Markdown guide links to app routes.

The live example imports only public `ngx-editra` exports. Editor code is lazy-loaded when
the examples route opens. Search indexes complete guide text and runs locally.
Theme choice is saved locally when storage is available.

Browser checks:

```sh
npx playwright install chromium
npm run test:docs
```

Build the app before testing. The test server uses port 4301 (override with EDITRA_DOCS_PORT)
so development on port 4300 can continue. The checks use production SSR output and cover navigation,
search, theme persistence, mobile navigation, editing/forms behavior, and axe accessibility.
Automated checks do not replace manual assistive-technology evaluation.
