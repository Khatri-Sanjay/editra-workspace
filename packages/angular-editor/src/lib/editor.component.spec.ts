import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { EditraEditorComponent } from './editor.component';

@Component({
	standalone: true,
	imports: [ReactiveFormsModule, FormsModule, EditraEditorComponent],
	template: `<editra-editor [formControl]="control" [required]="true" /><editra-editor
			[(ngModel)]="value"
		/>`,
})
class FormHostComponent {
	control = new FormControl('<p>Initial value</p>', { nonNullable: true });
	value = '<p>Template driven</p>';
}
@Component({
	standalone: true,
	imports: [FormsModule, ReactiveFormsModule, EditraEditorComponent],
	template: `<form [formGroup]="form"><editra-editor formControlName="body" required /></form>
		<form><editra-editor name="body" [(ngModel)]="body" /></form>`,
})
class ParentFormHostComponent {
	readonly form = new FormGroup({
		body: new FormControl('<p>Form group</p>', { nonNullable: true }),
	});
	body = '<p>Named ngModel</p>';
}
describe('Angular forms adapter', () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [FormHostComponent, ParentFormHostComponent, EditraEditorComponent],
		}).compileComponents();
	});
	it('integrates formControlName and named ngModel inside parent forms', async () => {
		const fixture = TestBed.createComponent(ParentFormHostComponent);
		fixture.detectChanges();
		await fixture.whenStable();
		fixture.detectChanges();
		const editors = fixture.debugElement
				.queryAll(By.directive(EditraEditorComponent))
				.map((element) => element.componentInstance as EditraEditorComponent),
			reactive = editors[0],
			template = editors[1];
		if (!reactive || !template) throw new Error('Missing editors');
		expect(reactive.getText()).toBe('Form group');
		expect(template.getText()).toBe('Named ngModel');
		fixture.componentInstance.form.patchValue({ body: '<p>Patched</p>' });
		fixture.detectChanges();
		expect(reactive.getText()).toBe('Patched');
		reactive.setHTML('<p>Public setter</p>');
		expect(fixture.componentInstance.form.controls.body.value).toBe(reactive.getHTML());
		expect(fixture.componentInstance.form.controls.body.pristine).toBeTrue();
		fixture.componentInstance.form.controls.body.setValue('<h1></h1>');
		fixture.detectChanges();
		expect(fixture.componentInstance.form.controls.body.hasError('required')).toBeTrue();
		fixture.destroy();
	});
	it('supports reactive and template-driven writes, reset and disabled state', async () => {
		const fixture = TestBed.createComponent(FormHostComponent);
		fixture.detectChanges();
		await fixture.whenStable();
		fixture.detectChanges();
		const editors = fixture.debugElement.children.map(
			(child) => child.componentInstance as EditraEditorComponent,
		);
		const reactive = editors[0],
			template = editors[1];
		if (!reactive || !template) throw new Error('Missing editors');
		expect(reactive.getText()).toBe('Initial value');
		expect(template.getText()).toBe('Template driven');
		fixture.componentInstance.control.setValue('<p>Updated</p>');
		fixture.detectChanges();
		expect(reactive.getText()).toBe('Updated');
		fixture.componentInstance.control.disable();
		fixture.detectChanges();
		expect(reactive.disabled).toBeTrue();
		fixture.componentInstance.control.enable();
		fixture.componentInstance.control.reset();
		fixture.detectChanges();
		expect(reactive.getText()).toBe('Initial value');
		fixture.componentInstance.control.setValue('');
		fixture.detectChanges();
		expect(fixture.componentInstance.control.hasError('required')).toBeTrue();
		fixture.destroy();
	});
	it('does not emit changes for programmatic writes and supports conversion before activation', () => {
		const fixture = TestBed.createComponent(EditraEditorComponent);
		const editor = fixture.componentInstance;
		const changes = jasmine.createSpy('changes');
		const events = jasmine.createSpy('events');
		editor.registerOnChange(changes);
		editor.contentChange.subscribe(events);
		editor.writeValue('<p><strong>Value</strong></p>');
		expect(editor.getText()).toBe('Value');
		expect(editor.getJSON().type).toBe('doc');
		expect(changes).not.toHaveBeenCalled();
		expect(events).not.toHaveBeenCalled();
		expect(editor.isDirty()).toBeFalse();
		fixture.destroy();
	});
	it('repeatedly mounts and destroys independent instances', () => {
		for (let index = 0; index < 3; index++) {
			const fixture = TestBed.createComponent(EditraEditorComponent);
			fixture.componentInstance.writeValue(`<p>${index}</p>`);
			fixture.detectChanges();
			expect(fixture.componentInstance.getText()).toBe(String(index));
			fixture.destroy();
		}
	});
});
