import { inject, Pipe } from '@angular/core';
import type { PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import type { SafeHtml } from '@angular/platform-browser';
import type { EditraConfig } from '../core/public-api';
import { EDITRA_CONFIG } from '../config/editra.config';
import { staticPreview } from '../utils/static-preview';
import { EditraContentStyles } from './content-styles.service';

/** Preserves validated editor formatting for Angular [innerHTML] bindings. */
@Pipe({ name: 'editraHtml', standalone: true })
export class EditraHtmlPipe implements PipeTransform {
	private readonly sanitizer = inject(DomSanitizer);
	private readonly defaults = inject(EDITRA_CONFIG);
	constructor() {
		inject(EditraContentStyles);
	}

	transform(html: string | null | undefined, config: EditraConfig = this.defaults): SafeHtml {
		const content = staticPreview(html ?? '', config);
		const theme =
			config.theme === 'dark'
				? ' editra-dark'
				: config.theme === 'auto'
					? ' editra-auto'
					: '';
		return this.sanitizer.bypassSecurityTrustHtml(
			`<div class="editra-content editra-html${theme}">${content}</div>`,
		);
	}
}
