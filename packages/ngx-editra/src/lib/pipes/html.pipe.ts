import { inject, Pipe } from '@angular/core';
import type { PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import type { SafeHtml } from '@angular/platform-browser';
import type { EditraConfig } from '../core/public-api';
import { EDITRA_CONFIG } from '../config/editra.config';
import { staticPreview } from '../utils/static-preview';

/** Preserves validated editor formatting for Angular [innerHTML] bindings. */
@Pipe({ name: 'editraHtml', standalone: true })
export class EditraHtmlPipe implements PipeTransform {
	private readonly sanitizer = inject(DomSanitizer);
	private readonly defaults = inject(EDITRA_CONFIG);

	transform(html: string | null | undefined, config: EditraConfig = this.defaults): SafeHtml {
		return this.sanitizer.bypassSecurityTrustHtml(staticPreview(html ?? '', config));
	}
}
