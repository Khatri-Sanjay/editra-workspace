# Progress

## Status

Milestones 1–5 have working implementations and passed automated regression and normal-peer
consumer validation. Milestone 6 is not complete; this is an alpha release.
No package has been published and no stable-release claim is made.

## Implemented

-   Documentation application with generated Markdown guides, search, routed pages, mobile
    navigation, light/dark themes, public-package live example and prerendered output.
    Its production build prerenders 20 routes; four documentation browser tests passed,
    including all guide routes, code copying, forms editing and automated accessibility.

-   npm workspaces, Angular Package Format/partial-Ivy, core and extensions public entry points.
-   Angular-free ProseMirror engine; strict typed document/configuration/extension contracts.
-   Schema for paragraphs, H1–H6, quotes, lists, code, rules, breaks, URL media and tables.
-   All requested text marks, alignment/indent/line height, history, shortcuts and clear formatting.
-   Server-safe parse5/schema import, deterministic escaped HTML output, JSON validation/round trips.
-   HTML-valued CVA, reactive/named template forms, required semantic validation, disabled/read-only,
    reset/patchValue/setValue, programmatic public setters that silently synchronize form models.
-   Secure static SSR representation, explicit ngSkipHydration boundary, atomic browser activation,
    OnPush/explicit change notifications for modern Angular scheduling, destruction/repeated mounting.
-   Configurable grouped/scrolling/floating toolbar, hidden controls, native dialogs and a presenter DI seam.
-   Local SVG toolbar icons, separated formatting/command strips, default command groups,
    accessible icon labels/tooltips, current-colour indicators and contextual table-action icons.
-   URL-only image/video insertion/editing/replacement, captions/alt/dimensions/alignment/wrapping,
    borders/radius/spacing, pointer/keyboard resize, aspect preservation and clipboard URL copying.
-   Optional automatic media dimensions, full-content-width mode, fitted left/centre/right figures,
    wrapping captions and media-attached corner resizing with cancellation and independent dimensions.
-   Exact-host YouTube/watch/short/Shorts and Vimeo providers, direct MP4, canonical/sandboxed embeds,
    explicit provider registry, responsive geometry, and loading failure status/error events.
-   Tables: insertion grid, contextual menu, row/column operations, merge/split/headers, cell colours,
    block alignment, consistent 1 px table/cell borders, invisible pointer/keyboard row and column boundaries, preview/cancel,
    isolated history, AutoFit/equal columns, quick insertion and persisted minimum row heights.
-   Word-style split font/highlight/cell-shading palettes with theme/standard/recent colours,
    custom hex/native colour input, removal actions, keyboard navigation and selection preservation.
-   Literal find/replace/navigation, word/Unicode character counts, caption-aware plain text,
    CommonMark conversion with explicitly documented presentation limitations.
-   Extension ordering/dependencies/conflict detection, schema import hooks, custom commands/providers,
    browser lifecycle callbacks and multiple isolated editor instances.
-   Playground with real package public imports, forms, outputs, themes/presets/plugins and HTML/Markdown import.
-   Developer/API/security/SSR/media/release documentation, MIT license and GitHub Actions preparation workflow.

## Executed validation so far

-   Clean npm ci with Node 20.20.2/npm 10.8.2 passed after removing generated-tarball install dependency.
-   Package production builds, actual npm pack and dry-run required-asset checks passed.
-   41 current unit/integration tests passed, including automatic/full-width media round trips, parent forms,
    required validation, spanned-table resizing and nested-table preservation.
-   All 21 current production playground browser tests passed: toolbar state/groups, custom commands,
    colour palettes, row/column pointer and keyboard resizing, isolated undo/save-reload, safe paste,
    full-width row-border dragging, consistent solid/dashed/none borders, grid/menu, video replacement,
    automatic image/video sizing, full-width mode, alignment, real MP4 metadata and independent resizing,
    forms, SSR/hydration, axe and performance.
-   Four documentation app browser tests passed, including the live editor and mobile accessibility.
-   Candidate Angular 17–21 consumers passed production builds and six browser tests each.
-   Angular 22's asynchronous activation issue was fixed with explicit change detection; its six tests passed.
-   Current normal-peer Angular 17–22 matrix passed: six production consumer builds and 96 browser tests,
    including Word-style palettes, table insertion, resizing, persistence and keyboard accessibility.
-   npm audit --omit=dev on the Angular 22 production graph reported zero vulnerabilities.
-   Browser import/render observations: about 363 ms for 1,000 paragraphs and 529 ms for 100?20 cells.
-   Reports and visual capture are in artifacts/.
-   Pure Node core import/parse/render/transaction runs succeeded without DOM globals.
-   Empty/malformed/oversized-span table normalization checks passed.
-   Core measurements at 5,000 paragraphs: approximately 224 ms parse, 45 ms serialize, 10 ms transaction
    in one Windows/Node 20 run. These are observations, not universal performance guarantees.

## Architectural decisions

See ARCHITECTURE.md. One published package prevents unnecessary fragmentation. Model ownership is
centralized in the engine (its EditorState is readable but cannot be reassigned). Browser views use
transactions and node views; SSR never constructs them. Imported data never chooses executable
callbacks or iframe origins. ProseMirror modules are shared external dependencies.

## Remaining release work and known limitations

-   Automated compiler/unit/browser/consumer checks passed; packaging/documentation consistency is finalized separately.
-   Manual screen-reader/high-contrast evaluation and independent application/security review.
-   More native clipboard/table resize/browser memory stress coverage; current tests cannot establish
    all real assistive-technology and external-service behavior.
-   Full demo exceeds the CLI's 500 kB warning budget. Core and browser performance measurements
    are recorded; further optional-feature bundling work is needed before calling it lightweight.
-   SSR Angular sanitization strips styles/iframes in static content; interactive content uses the
    validated canonical model inside the explicit boundary.
-   CommonMark cannot retain all font/colour/table/media presentation; the conversion policy is documented.
-   Row heights are minimums and cannot force content to render shorter than its natural height.
-   Real YouTube/Vimeo/media availability and embeddability cannot be inferred from valid URLs;
    deterministic tests use mock responses for network resources.
-   Legacy Angular 17/Node 20/ESLint 8 are end of support. Compatibility is not a maintenance guarantee.
-   GitHub Actions files are configured but have not run remotely in this environment.
-   Future Angular versions and npm name/account ownership remain unverified until explicitly checked.

## Single-entry package architecture

Core and extensions remain in src/lib/core and src/lib/extensions. Their public symbols
are exported from ngx-editra alongside Angular components. Root secondary packaging
folders are removed; consumers must replace previous /core and /extensions imports.
Earlier compatibility evidence applies to its recorded archive hash and must be refreshed
for the consolidated package before publication.

## Root and package ownership

Documentation now includes a feature index and task-based guides for installation, forms,
formatting, media, tables, columns, code, content conversion, persistence, events, rendering,
keyboard use and troubleshooting. The documentation app includes per-example copying,
reading-time metadata, live Markdown output and a reader preview. The content-only Sass
entry is exported for the documented viewer-only integration.

Root documents and docs/ are canonical. Package source now contains only implementation,
styles and build configuration. The library build assembles all release documentation
directly in dist/ngx-editra. Duplicate package documents and the unused compatibility
fixture generator have been removed. Applications inherit one package alias and use
separate compiler output directories.
