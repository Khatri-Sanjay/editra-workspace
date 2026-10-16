# Changelog

## 0.1.0-alpha.0 — unreleased

-   Renamed the public editor to `NgxEditraComponent` (`ngx-editra`) and viewer to
    `NgxEditraViewerComponent` (`ngx-editra-viewer`), including component directories,
    styles, examples and tests. Consumers of earlier source snapshots must update
    their imports and template selectors; viewer HTML remains bound through `[html]`.
-   Documented npm installation, prerelease tags and complete published-package usage.
-   Bundled default editor styles with the component so applications no longer need
    a global Sass import. The standalone viewer also includes its content styles.

-   ProseMirror document engine with server-safe parsing and deterministic HTML rendering.
-   Expanded task-based documentation with setup, feature walkthroughs, saving/rendering,
    events, accessibility and troubleshooting; per-example copying and live Markdown/viewer previews.
-   Organized the documentation app into a shared layout, lazy feature pages, core services,
    shared models, generated content and ordered stylesheet modules.
-   Standalone Angular HTML-valued forms adapter and explicit hydration boundary.
-   Text formatting, keyboard history, lists, URL media, table commands and resizing.
-   Extension registry, themes, find/replace, counts and CommonMark conversions.
-   Packaged SCSS, playground, security/command/forms tests and browser validation.
-   Independent Angular consumer matrix and release-preparation workflow.
-   Consolidated public imports into ngx-editra; removed /core and /extensions package entry points.
-   Centralized documentation at the workspace root and assembled release documents directly
    into the distribution, with one build script and no duplicate package-source documents.
-   Library sources organized under packages/ngx-editra/src with explicit public exports,
    enforced entry-point boundaries, build-before-serve scripts and package export validation.

This is a prerelease. Completion gaps and executed compatibility evidence are recorded in PROGRESS.md
and docs/COMPATIBILITY.md. No package has been published.
