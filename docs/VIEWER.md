# Display saved content

Use the read-only viewer when a reader should see the saved document without editing tools. It validates input and applies the shared content presentation, including code blocks, tables, media, dividers, and columns.

## Use the standalone viewer

```typescript
import { Component } from '@angular/core';
import { NgxEditraViewerComponent } from 'ngx-editra';

@Component({
	selector: 'app-article',
	standalone: true,
	imports: [NgxEditraViewerComponent],
	template: '<ngx-editra-viewer [html]="savedHtml" />',
})
export class ArticleComponent {
	savedHtml = '<h2>Published article</h2><p>Ready to read.</p>';
}
```

The viewer includes its content styles automatically. Pass `[config]="config"` when the document uses custom extensions, providers, URL policy, or a specific theme. Code-copy controls are included in the viewer; editing and resizing controls are not.

## Use an existing HTML container

For automatic styling and code-copy buttons with one import, use `EditraContentDirective`:

```typescript
import { Component } from '@angular/core';
import { EditraContentDirective } from 'ngx-editra';

@Component({
	selector: 'app-article',
	standalone: true,
	imports: [EditraContentDirective],
	template: '<div [editraContent]="savedHtml"></div>',
})
export class ArticleComponent {
	savedHtml = '<h2>Published article</h2><pre><code>const value = 1;</code></pre>';
}
```

The directive validates saved HTML and loads content styles and code-copy controls automatically. No pipe, viewer, Sass import or separate copy directive is required. Use a `div` or `article` container; the directive owns its contents, so do not combine it with `[innerHTML]` or child templates on the same element. Code-copy buttons run in the browser and require HTTPS or localhost.

Configuration is optional. For custom extensions, URL policy or a theme, pass a new config object through `[editraContentConfig]="config"` alongside `[editraContent]`.

## Use an innerHTML binding

Import `EditraHtmlPipe` in your component's imports, then use:

```html
<div [innerHTML]="savedHtml | editraHtml"></div>
```

The pipe validates the HTML, adds a styled content wrapper, and loads shared styles automatically. No global Sass import, CSS class, viewer, or configuration is required. The wrapper is part of the rendered HTML, so use a container that accepts block content, such as a `div` or `article`.

Optionally pass `editraHtml: config` for custom extensions, URL policy or a theme. Replace the config object when changing it. For interactive code-copy buttons, also import `EditraCodeCopyDirective` and add `editraCodeCopy` to the container.

## Content styles

The editor, viewer, content directive and HTML pipe include their styles automatically. The optional `ngx-editra/styles/content.scss` export is only needed for HTML rendered without these Angular APIs.

Plain Angular innerHTML may remove inline styles and embedded players. Do not solve this by trusting raw user HTML yourself. Prefer the viewer or the validated pipe, and validate content on the server as well. Custom extension serializers are trusted code and must be reviewed.

## Readonly versus viewer

Use `[readonly]="true"` on an editor when you want to keep the editor component and its form integration while preventing changes. Use NgxEditraViewerComponent for a separate reading surface. See [Forms](ANGULAR_FORMS.md) for how disabled state affects form values.
