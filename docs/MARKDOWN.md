# Markdown import and export

Markdown is useful for text-oriented workflows. It is an explicit conversion, not the editor's form value format: the form control always contains HTML.

## Convert through the component

```html
<ngx-editra #editor [formControl]="body" />
<button type="button" (click)="editor.setMarkdown('# Welcome')">Load Markdown</button>
<pre>{{ editor.getMarkdown() }}</pre>
```

Import ReactiveFormsModule and NgxEditraComponent in the owning component. Use error handling around programmatic imports in production; setMarkdown can throw for invalid input. Component setters do not automatically emit a save event.

## Understand conversion limits

CommonMark supports ordinary headings, paragraphs, lists, blockquotes, links, and code. It cannot represent every rich-text attribute. Font, colour, highlight, and size presentation may be lost. Tables and videos export as safe raw HTML, which the receiving Markdown renderer may reject or display differently.

Raw HTML Markdown import and custom nodes are not a lossless round trip. Choose HTML or JSON when retaining all supported document presentation is required. See [content formats](CONTENT.md).

## Advanced conversion functions

The public importMarkdown(markdown, schema, config) and exportMarkdown(doc) functions operate on ProseMirror documents. They are useful when you own an engine integration. Most Angular applications should use the component methods so parsing and configuration stay aligned with the editor.
