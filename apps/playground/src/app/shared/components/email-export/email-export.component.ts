import { isPlatformBrowser } from '@angular/common';
import type { AfterViewInit, ElementRef, OnChanges } from '@angular/core';
import { Component, Input, PLATFORM_ID, ViewChild, inject, signal } from '@angular/core';
import type { EditraConfig, EditraEmailResult } from 'ngx-editra';
import { exportEmail } from 'ngx-editra';

@Component({
	selector: 'app-email-export',
	standalone: true,
	templateUrl: './email-export.component.html',
	styleUrl: './email-export.component.scss',
})
export class EmailExportComponent implements OnChanges, AfterViewInit {
	@Input() html = '';
	@Input() config: EditraConfig = {};
	@ViewChild('preview') preview?: ElementRef<HTMLIFrameElement>;
	readonly browser = isPlatformBrowser(inject(PLATFORM_ID));
	readonly feedback = signal('');
	result: EditraEmailResult | undefined;
	error = '';
	ngOnChanges(): void {
		this.feedback.set('');
		try {
			this.result = exportEmail(this.html, { title: 'Editra email preview' }, this.config);
			this.error = '';
		} catch (error) {
			this.result = undefined;
			this.error = error instanceof Error ? error.message : 'Email export failed.';
		}
		this.updatePreview();
	}
	ngAfterViewInit(): void {
		this.updatePreview();
	}
	private updatePreview(): void {
		if (!this.browser || !this.preview) return;
		// This sink accepts only the schema-rebuilt email exporter result, never input HTML.
		// The iframe is sandboxed without scripts, forms, same-origin access or top navigation.
		const policy =
			'<meta http-equiv="Content-Security-Policy" content="default-src &#39;none&#39;; style-src &#39;unsafe-inline&#39;; img-src https: http:; base-uri &#39;none&#39;; form-action &#39;none&#39;">';
		this.preview.nativeElement.srcdoc =
			this.result?.html.replace('<head>', '<head>' + policy) ?? '';
	}
	async copy(kind: 'html' | 'text'): Promise<void> {
		if (!this.result) return;
		try {
			await navigator.clipboard.writeText(this.result[kind]);
			this.feedback.set(`Email ${kind} copied.`);
		} catch {
			this.feedback.set('Copy unavailable. Select the email source and copy it manually.');
		}
	}
}
