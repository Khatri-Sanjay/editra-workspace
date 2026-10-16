import { Directive, inject, Input } from '@angular/core';
import type { OnChanges } from '@angular/core';
import type { SafeHtml } from '@angular/platform-browser';
import { EDITRA_CONFIG } from '../config/editra.config';
import type { EditraConfig } from '../core/public-api';
import { EditraHtmlPipe } from '../pipes/html.pipe';
import { EditraCodeCopyDirective } from './code-copy.directive';

/** Renders validated, styled saved content with interactive code-copy controls. */
@Directive({
	selector: '[editraContent]',
	standalone: true,
	providers: [EditraHtmlPipe],
	hostDirectives: [EditraCodeCopyDirective],
	host: { '[innerHTML]': 'content' },
})
export class EditraContentDirective implements OnChanges {
	@Input() editraContent: string | null | undefined = '';
	@Input() editraContentConfig: EditraConfig = inject(EDITRA_CONFIG);
	private readonly renderHtml = inject(EditraHtmlPipe);
	content: SafeHtml = '';

	ngOnChanges(): void {
		this.content = this.renderHtml.transform(this.editraContent, this.editraContentConfig);
	}
}
