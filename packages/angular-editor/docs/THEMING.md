# Theming

Choose light, dark or auto (prefers-color-scheme) through config.theme. Styles are scoped to the
Angular editor; the public ProseMirror stylesheet targets only editor-generated class names.

Override CSS custom properties on editra-editor: --editra-surface, --editra-text,
--editra-border, --editra-active and --editra-focus. Preserve contrast and visible focus.
Fonts are constrained to Arial, Georgia, Verdana, Times New Roman and monospace.
Toolbar icons are text/unicode, never arbitrary HTML.

The UI respects reduced motion, wraps on narrow screens, and provides 36px editor controls.
WCAG automated checks are supplemented by browser keyboard tests, not a full screen-reader audit.

## Rendering saved HTML

Import `EditraViewerComponent` from `ngx-editra` and use:

```html
<editra-viewer [html]="savedHtml" [config]="config" />
```

The viewer renders headings, marks, lists, links, inline code, code blocks with language
labels, blockquotes, tables, images, captions, videos, dividers and columns. It uses the
same validated schema and content styles as the editor, without editing controls. Pass
the same configuration to retain custom extensions, video providers and URL policy.
Light, dark and auto themes are supported. The viewer includes code copy controls.
Language editing controls belong to the editor; saved HTML retains code text and language metadata.

For HTML rendered outside Angular, include `ngx-editra/styles/content.scss` and wrap
canonical HTML from `getHTML()` or `serializeHTML()` in a `.editra-content` container.
The existing `editor.scss` entry point also includes these styles. Never insert untrusted
raw HTML directly; the viewer validates input before rendering it.

## Using Angular innerHTML

Import the standalone `EditraHtmlPipe` and `EditraCodeCopyDirective` from `ngx-editra`
in your component imports.
Include `@use 'ngx-editra/styles/content.scss';` in your global stylesheet, then use:

```html
<div class="editra-content" editraCodeCopy [innerHTML]="savedHtml | editraHtml: config"></div>
```

The pipe validates saved HTML with the editor schema before trusting its output.
Plain Angular `[innerHTML]="savedHtml"` strips inline styles and embedded players;
the pipe preserves approved formatting and video URLs. Pass the editor configuration
for the same extensions and URL policy, and replace the configuration object when it changes.
Do not bypass Angular sanitization directly on raw saved HTML.

Exported HTML also includes portable inline styles for code, blockquotes and table cells,
so native `element.innerHTML` retains their basic appearance without editor CSS.
The shared stylesheet adds spacing, language labels and responsive presentation.
The `editraCodeCopy` directive adds accessible copy icons, clipboard handling and status
feedback to rendered code blocks, including when the HTML changes. `editra-viewer`
already includes it. Clipboard access requires HTTPS or localhost. Copy controls stay
out of saved HTML; language selectors and resize handles remain editor-only.
