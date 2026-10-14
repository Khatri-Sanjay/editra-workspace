# Angular Forms

Import `EditraEditorComponent` with `ReactiveFormsModule` or `FormsModule`.
`[formControl]`, `formControlName`, and `[(ngModel)]` use stable HTML strings.
Null resets to an empty paragraph. `setValue`, `patchValue`, reset, disable and enable
are supported through ControlValueAccessor.

```html
<editra-editor
	formControlName="description"
	[required]="true"
	[readonly]="readOnly"
	(contentChange)="onContentChange($event)"
/>
```

`required` on the editor validates semantic emptiness, since `<p></p>` is a nonempty string
to Angular's ordinary string validator. Set `[required]="true"` when you need this behavior.
Editor-to-form transactions emit changes; programmatic writes do not emit `contentChange`
or mark the form dirty. Touched is reported when focus leaves the entire editor, including
its toolbar/dialog. Moving focus within the editor does not touch the form.

For autosave, subscribe to form `valueChanges` or `contentChange`, and debounce storage
requests in your application. Required form consistency itself is synchronous.
