# Events and application integration

Use outputs to react to user actions without reaching into the component's private engine. Use Angular Forms for the document value and validation state.

## Listen for content and errors

```typescript
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgxEditraComponent } from 'ngx-editra';
import type { EditraChange } from 'ngx-editra';

@Component({
	selector: 'app-editor-events',
	standalone: true,
	imports: [ReactiveFormsModule, NgxEditraComponent],
	template: `
		<ngx-editra
			[formControl]="body"
			(contentChange)="onContentChange($event)"
			(editorError)="error = $event.message"
		/>
		<p role="status">{{ status }}</p>
		<p role="alert">{{ error }}</p>
	`,
})
export class EditorEventsComponent {
	readonly body = new FormControl('', { nonNullable: true });
	status = 'Start editing.';
	error = '';
	onContentChange(change: EditraChange): void {
		this.status = `Document changed: ${change.text.length} text characters.`;
	}
}
```

## Event reference

| Output                   | Payload                                       | Typical use                                                            |
| ------------------------ | --------------------------------------------- | ---------------------------------------------------------------------- |
| contentChange            | EditraChange: html, document, text            | Update an application preview after a document edit                    |
| selectionChange          | from, to positions                            | Reflect the current document selection                                 |
| transactionState         | docChanged, selectionChanged, from, to, dirty | Observe editing transactions without serializing the document yourself |
| dirtyChange              | boolean                                       | Show a document-edited indicator                                       |
| editorFocus / editorBlur | void                                          | Track editor focus                                                     |
| editorReady              | void                                          | Wait for browser editor activation before using DOM focus              |
| editorDestroyed          | void                                          | Observe component teardown                                             |
| editorError              | Error                                         | Present a parsing or initialization error in application UI            |

Selection-only transactions do not emit contentChange. Programmatic writes and component setters have different notification semantics from user edits; see [loading and saving](CONTENT.md).

## Lifecycle and cleanup

DOM focus and blur calls are no-ops before browser activation. Getters and document conversions can be used during server rendering. The component owns its browser view and destroys it on teardown. Extensions must release their own subscriptions, event listeners, and node-view resources.

Avoid writing the form value back into the editor on every contentChange: the form is already synchronized. This prevents feedback loops and unnecessary document replacement.
