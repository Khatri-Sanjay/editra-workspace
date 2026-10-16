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

If your layout needs its own container, import EditraHtmlPipe and EditraCodeCopyDirective in the component's imports and use:

```html
<div class="editra-content" editraCodeCopy [innerHTML]="savedHtml | editraHtml: config"></div>
```

The pipe reconstructs supported content before trusting it for Angular rendering. The directive adds copy controls to code blocks. Replace the config object when changing configuration so the pipe can observe the change.

## Content styles

No stylesheet import is needed for the editor or standalone viewer. If you render saved HTML in your own container using the HTML pipe rather than either component, import the optional content stylesheet globally:

```scss
@use 'ngx-editra/styles/content.scss';
```

Plain Angular innerHTML may remove inline styles and embedded players. Do not solve this by trusting raw user HTML yourself. Prefer the viewer or the validated pipe, and validate content on the server as well. Custom extension serializers are trusted code and must be reviewed.

## Readonly versus viewer

Use `[readonly]="true"` on an editor when you want to keep the editor component and its form integration while preventing changes. Use NgxEditraViewerComponent for a separate reading surface. See [Forms](ANGULAR_FORMS.md) for how disabled state affects form values.
