# Quick start

```typescript
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { EditraEditorComponent } from 'ngx-editra';

@Component({
	selector: 'app-example',
	standalone: true,
	imports: [ReactiveFormsModule, EditraEditorComponent],
	template: `<editra-editor [formControl]="body" />`,
})
export class ExampleComponent {
	readonly body = new FormControl('<p>Hello <strong>world</strong></p>', { nonNullable: true });
}
```

Import the public stylesheet as described in INSTALLATION.md. Form values remain HTML.
For a working SSR example, run `npm run build` followed by `npm start`, or build the
playground and run `npm run serve:ssr:playground`.
