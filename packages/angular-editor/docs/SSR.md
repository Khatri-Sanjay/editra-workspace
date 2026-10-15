# SSR and hydration

The core entry point is safe to import and construct without window, document, DOMParser
or navigator. parse5 converts HTML to the canonical document on both server and browser.
The deterministic serializer uses escaped strings and validated schema attributes.

The Angular component uses `EditraViewerComponent` for its initial static content.
The viewer parses input through the schema and serializes validated attributes before
marking that canonical output as trusted HTML. This preserves styles and approved video
players on both server and browser. Raw input is never passed to Angular's trust API.
Extensions and video providers remain trusted application code.

The component host has a static `ngSkipHydration` boundary. Angular hydrates the consuming
application, recreates that editor boundary and activates its ProseMirror view afterNextRender.
This deliberately avoids hydrating ProseMirror-managed DOM. Initial form content survives;
static content is removed after activation and an empty browser surface owns the view.

Enable your application's normal `provideClientHydration`/server rendering providers.
Angular 18+ SSR bootstrap functions need the platform BootstrapContext, and patched newer
renderApplication APIs need explicit allowedHosts. The compatibility consumers demonstrate
version-specific server setup. Do not set browser globals on the server to hide errors.

Editor DOM methods are no-ops before activation. Conversion/state methods work during SSR.
Extension onCreate/onDestroy callbacks run for browser editor activation/destruction only.
