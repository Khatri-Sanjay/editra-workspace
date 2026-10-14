# SSR and hydration

The core entry point is safe to import and construct without window, document, DOMParser
or navigator. parse5 converts HTML to the canonical document on both server and browser.
The deterministic serializer uses escaped strings and validated schema attributes.

The Angular component renders static content through Angular's HTML sanitization.
Angular may strip styles and embedded iframes from the static representation. There is no
sanitizer bypass. The canonical document still retains allowed attributes and media URLs.

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
