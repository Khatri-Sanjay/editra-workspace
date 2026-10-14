# Architecture and implementation plan

## Decisions

-   npm workspaces: `packages/angular-editor` and `apps/playground`. Compatibility consumers
    live outside workspace dependency resolution so each major owns its Node/TypeScript graph.
-   One distribution: `ngx-editra`, with public `ngx-editra/core` and `ngx-editra/extensions`
    secondary entry points. Core contains no Angular runtime imports. ProseMirror modules are
    ordinary shared dependencies, never copied or bundled as private instances.
-   Compile with Angular 17 APIs, partial-Ivy and ng-packagr. Advertise only verified peer ranges.
-   One canonical ProseMirror document; transactions own editing/history. Angular implements
    ControlValueAccessor with stable HTML values and explicit conversion methods.
-   parse5 parses untrusted HTML on server and client. Only schema-supported structures and
    validated attributes survive. A deterministic serializer escapes text and attributes.
-   Server renders validated static content. The editor component uses a documented
    `ngSkipHydration` boundary; afterNextRender mounts the browser view without executing DOM
    code on the server. No arbitrary Angular sanitizer bypass.
-   Deterministic extensions declare schema/commands/plugins/node views and dependencies;
    duplicate identifiers and command collisions are rejected.
-   URL policy defaults to HTTPS; video providers match exact host/path and produce canonical
    embeds. No uploads, data URLs, execCommand, or uncontrolled contenteditable mutation.

## Dependencies

Registry metadata checked on 2026-10-13: ProseMirror model 1.25.12, state 1.4.4,
view 1.42.6, commands 1.7.2, schema-list 1.5.1, history 1.5.1, keymap 1.2.3,
tables 1.8.5, markdown 1.13.8; parse5 8.0.1; Playwright 1.64.0; axe-core 4.14.0.
Angular compilation retains 17.3 and TypeScript 5.4. Tests establish actual compatibility.

## Milestones and validation

1. Foundation: workspaces, core schema/security/parser/serializer, Angular forms/SSR adapter,
   initial unit tests and packaged playground.
2. Text: marks, block/list commands, keyboard history, toolbar and state.
3. Media: independent image/video extensions, URL dialogs, canonical providers, resizing.
4. Documents: tables, find/replace/counts/Markdown/fullscreen.
5. Extensions: registry, public configuration, themes and custom commands/providers.
6. Hardening: malicious-content tests, keyboard/axe E2E, SSR/hydration/consumer matrix,
   performance measurements, documentation and release preparation.

Each stage runs formatting/lint/compiler/build/tests as applicable. A stage remains incomplete
until its required behavior is implemented and its checks succeed. Package tarballs are tested
as consumer dependencies; installation alone is never compatibility evidence.

## Compatibility strategy

Angular 17/18 use Node 20 and their supported TypeScript versions. Angular 19–21 can use
Node 22 with their own TypeScript versions. Angular 22 uses Node 24 and TypeScript 6.
Matrix consumers exercise builds, forms, browser behavior, SSR and hydration independently.
Future releases remain unverified. No automatic publication is configured.
