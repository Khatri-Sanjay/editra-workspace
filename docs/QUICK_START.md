# Quick start

Create a standalone component with a non-nullable HTML form control. After this guide, you will have a working editor that updates that control as you type.

## 1. Complete installation

[Install ngx-editra](INSTALLATION.md) first. Styles are included automatically. The editor needs ReactiveFormsModule for the formControl binding and NgxEditraComponent for its selector.

## 2. Add this component

```typescript
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgxEditraComponent } from 'ngx-editra';

@Component({
	selector: 'app-example',
	standalone: true,
	imports: [ReactiveFormsModule, NgxEditraComponent],
	template: `<ngx-editra [formControl]="body" />`,
})
export class ExampleComponent {
	readonly body = new FormControl('<p>Hello <strong>world</strong></p>', { nonNullable: true });
}
```

Render app-example from a parent component that imports ExampleComponent, or use this pattern in your application's existing root component. Do not replace your application's bootstrap setup simply to add an editor.

## 3. Try an edit

Select world and click Bold, type another paragraph, or insert a list. The body control contains the updated HTML. Read body.value when saving. Use body.setValue(...) to load another HTML document and body.reset(...) to restore a draft.

For a temporary local preview in this same component, add `<pre>{{ body.value }}</pre>` after the editor. Render saved content for readers with the [viewer](VIEWER.md).

## 4. Configure and validate

Add `[config]="config"` when you need a typed [configuration](CONFIGURATION.md). Add `[required]="true"` for meaningful empty-document validation. See [Forms](ANGULAR_FORMS.md) for a complete form-group example and [content and saving](CONTENT.md) for persistence.

## What you should see

A toolbar, an editable document, and a stable HTML form value. If the component is missing or unstyled, follow [troubleshooting](TROUBLESHOOTING.md). Open the documentation's live example to compare a working integration.
