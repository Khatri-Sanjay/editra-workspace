import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
@Component({
	selector: 'app-docs-home',
	standalone: true,
	imports: [RouterLink],
	templateUrl: './home.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
	readonly example = `import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { EditraEditorComponent } from 'ngx-editra';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, EditraEditorComponent],
  template: '<editra-editor [formControl]="body" />',
})
export class ExampleComponent {
  readonly body = new FormControl('<p>Hello, Editra.</p>',
    { nonNullable: true });
}`;
}
