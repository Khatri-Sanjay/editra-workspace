# Theming

Match the editor to your application with a theme, then adjust supported CSS custom properties when you need brand-specific colours. Editor and viewer styles load automatically; no global Sass import is required for either component.

```typescript
import type { EditraConfig } from 'ngx-editra';
export const config: EditraConfig = { theme: 'auto' };
```

Bind this config through the editor's config input. Auto follows the operating system's preferred colour scheme; choose light or dark for an explicit application setting.

```scss
ngx-editra {
	--editra-focus: #155d4f;
	--editra-border: #b8c7c1;
}
```

## Themes, variables, and contrast

Choose light, dark or auto (prefers-color-scheme) through config.theme. Styles are scoped to the
Angular editor; the public ProseMirror stylesheet targets only editor-generated class names.

Override CSS custom properties on ngx-editra: --editra-surface, --editra-text,
--editra-border, --editra-active and --editra-focus. Preserve contrast and visible focus.
Fonts are constrained to Arial, Georgia, Verdana, Times New Roman and monospace.
Built-in toolbar icons use local SVG paths; custom text glyphs are supported. Arbitrary SVG/HTML strings are not interpreted as markup.

The UI respects reduced motion, wraps on narrow screens, and provides 36px editor controls.
WCAG automated checks are supplemented by browser keyboard tests, not a full screen-reader audit.

## Rendering saved HTML

Import `NgxEditraViewerComponent` from `ngx-editra` and use:

```html
<ngx-editra-viewer [html]="savedHtml" [config]="config" />
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
feedback to rendered code blocks, including when the HTML changes. `ngx-editra-viewer`
already includes it. Clipboard access requires HTTPS or localhost. Copy controls stay
out of saved HTML; language selectors and resize handles remain editor-only.
