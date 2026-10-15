import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
	EditraEditorComponent,
	EditraHtmlPipe,
	EditraCodeCopyDirective,
	defaultToolbar,
} from 'ngx-editra';
import type { EditraConfig, EditraChange, EditraTheme } from 'ngx-editra';
import { demoContent } from './demo-content';
import { imageExtension, videoExtension } from 'ngx-editra/extensions';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [
		FormsModule,
		ReactiveFormsModule,
		EditraEditorComponent,
		EditraHtmlPipe,
		EditraCodeCopyDirective,
	],
	templateUrl: './playground.html',
	styleUrl: './playground.scss',
})
export class AppComponent {
	@ViewChild('editor') editor?: EditraEditorComponent;
	readonly initial = demoContent;
	readonly form = new FormGroup({ body: new FormControl(demoContent, { nonNullable: true }) });
	config: EditraConfig = {
		theme: 'light',
		placeholder: 'Your story starts here…',
		minHeight: 320,
		extensions: [imageExtension(), videoExtension()],
	};
	preset(event: Event): void {
		if (!(event.target instanceof HTMLSelectElement)) return;
		const value = event.target.value;
		const toolbar =
			value === 'compact'
				? {
						items: defaultToolbar.filter((item) =>
							['undo', 'redo', 'bold', 'italic'].includes(item.id),
						),
						hiddenItems: [
							'image',
							'video',
							'table',
							'Cell background colour',
							'Table width percent',
							'Row height pixels',
							'Table border',
						],
					}
				: value === 'grouped'
					? {
							groups: [
								{
									id: 'history',
									label: 'History',
									items: defaultToolbar.filter((item) =>
										['undo', 'redo'].includes(item.id),
									),
								},
								{
									id: 'format',
									label: 'Text formatting',
									items: defaultToolbar.filter(
										(item) => !['undo', 'redo'].includes(item.id),
									),
								},
							],
							overflow: 'scroll' as const,
							floating: true,
						}
					: {};
		this.config = { ...this.config, toolbar };
	}
	readonly compactConfig: EditraConfig = { toolbar: { hidden: true } };
	readonly formats = ['HTML', 'JSON', 'Text', 'Markdown'];
	selected = 'HTML';
	readOnly = false;
	mounted = true;
	templateValue = '<p>A template-driven editor.</p>';
	markdownInput = '# Fresh ideas\n\nStart with **something small**.';
	htmlInput = '<h2>Imported HTML</h2><p>Safe <strong>formatting</strong> survives.</p>';
	error = '';
	changed(_event: EditraChange): void {
		this.error = '';
	}
	theme(value: EditraTheme): void {
		this.config = { ...this.config, theme: value };
	}
	disable(value: boolean): void {
		if (value) this.form.controls.body.disable();
		else this.form.controls.body.enable();
	}
	output(): string {
		if (!this.editor) return this.form.controls.body.value;
		switch (this.selected) {
			case 'JSON':
				return JSON.stringify(this.editor.getJSON(), null, 2);
			case 'Text':
				return this.editor.getText();
			case 'Markdown':
				return this.editor.getMarkdown();
			default:
				return this.form.controls.body.value;
		}
	}
	importMarkdown(): void {
		this.editor?.setMarkdown(this.markdownInput);
	}
	importHTML(): void {
		this.editor?.setHTML(this.htmlInput);
	}
}
