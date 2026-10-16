# Load, save, and convert content

The editor does not save to a server automatically. Your application owns storage, authentication, loading indicators, and error handling. Angular Forms supplies the current HTML value.

## Save HTML from a form

Read the form control when the user submits. Send that string to your own backend, where it must be validated and authorized before storage. This example deliberately shows the integration boundary rather than an invented server endpoint.

```typescript
// Inside the component that owns your FormControl:
save(): void {
  this.body.markAsTouched();
  if (this.body.invalid || this.body.disabled) return;
  const html = this.body.value;
  // Pass html to your application's persistence service.
}
```

For automatic saving, subscribe to the form control's valueChanges in your application, debounce changes, and clean up the subscription. Decide how to handle failed requests and concurrent writes. The library does not provide autosave or conflict resolution.

## Restore HTML

```typescript
this.body.setValue('<p>A previously saved document.</p>');
this.body.reset('<p>A fresh draft.</p>');
this.body.disable();
this.body.enable();
```

Programmatic form writes update the editor through ControlValueAccessor. Angular's own setValue emits valueChanges unless you use its emitEvent option; this is separate from the editor's contentChange event. Programmatic writes do not mark the form dirty or emit the editor's contentChange.

## Choose an output format

| Format     | How to get it                          | When to use it                                             |
| ---------- | -------------------------------------- | ---------------------------------------------------------- |
| HTML       | Form control value or editor.getHTML() | Supported rich content for storage and rendering           |
| JSON       | editor.getJSON()                       | A structured document using EditraDocument                 |
| Plain text | editor.getText()                       | Search indexing, previews, or text-only output             |
| Markdown   | editor.getMarkdown()                   | CommonMark-oriented export with documented fidelity limits |

The editor reference comes from a template variable such as `<ngx-editra #editor [formControl]="body" />`, or an Angular ViewChild. Calling a getter does not change the form value type.

## Restore JSON or Markdown

```typescript
// editor is an NgxEditraComponent reference.
editor.setJSON(savedDocument);
editor.setMarkdown('# A heading\n\nA **bold** sentence.');
```

setJSON and setMarkdown can throw on invalid input; use try/catch in your import UI. setHTML and writeValue report parsing failures through editorError while retaining the current document. Respect the configured input-size limit.

Component setters silently synchronize an attached form control without emitting contentChange or valueChanges. Use an explicit application action if importing a document should trigger a save. clear() behaves as an editing action with history.

## Preserve the same configuration

Render or restore content with the same trusted extensions, URL rules, and video providers used to create it. Disabling a schema feature can remove its content when the document is normalized. Keep server-side validation aligned with the client. See [security](SECURITY.md), [Markdown](MARKDOWN.md), and [the viewer](VIEWER.md).
