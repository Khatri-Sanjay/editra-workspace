import {
	ChangeDetectionStrategy,
	Component,
	inject,
	Input,
	ViewEncapsulation,
} from '@angular/core';
import type { OnChanges } from '@angular/core';
import type { SafeHtml } from '@angular/platform-browser';
import type { EditraConfig } from '../../core/public-api';
import { EDITRA_CONFIG } from '../../config/editra.config';
import { EditraCodeCopyDirective } from '../../directives/code-copy.directive';
import { EditraHtmlPipe } from '../../pipes/html.pipe';

/** Read-only, server-safe rendering of saved editor HTML. */
@Component({
	selector: 'ngx-editra-viewer',
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	providers: [EditraHtmlPipe],
	imports: [EditraCodeCopyDirective],
	template: '<div class="editra-content" editraCodeCopy [innerHTML]="content"></div>',
	styleUrl: '../../../styles/content.scss',
	host: {
		'[class.editra-dark]': 'config.theme === "dark"',
		'[class.editra-auto]': 'config.theme === "auto"',
	},
})
export class NgxEditraViewerComponent implements OnChanges {
	@Input() html = '';
	@Input() config: EditraConfig = inject(EDITRA_CONFIG);
	private readonly renderHtml = inject(EditraHtmlPipe);
	content: SafeHtml = '';

	ngOnChanges(): void {
		this.content = this.renderHtml.transform(this.html, this.config);
	}
}
