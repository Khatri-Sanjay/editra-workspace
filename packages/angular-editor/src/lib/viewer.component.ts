import {
	ChangeDetectionStrategy,
	Component,
	inject,
	Input,
	ViewEncapsulation,
} from '@angular/core';
import type { OnChanges } from '@angular/core';
import type { SafeHtml } from '@angular/platform-browser';
import type { EditraConfig } from 'ngx-editra/core';
import { EDITRA_CONFIG } from './configuration';
import { EditraCodeCopyDirective } from './code-copy.directive';
import { EditraHtmlPipe } from './html.pipe';

/** Read-only, server-safe rendering of saved editor HTML. */
@Component({
	selector: 'editra-viewer',
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	providers: [EditraHtmlPipe],
	imports: [EditraCodeCopyDirective],
	template: '<div class="editra-content" editraCodeCopy [innerHTML]="content"></div>',
	styleUrl: '../styles/content.scss',
	host: {
		'[class.editra-dark]': 'config.theme === "dark"',
		'[class.editra-auto]': 'config.theme === "auto"',
	},
})
export class EditraViewerComponent implements OnChanges {
	@Input() html = '';
	@Input() config: EditraConfig = inject(EDITRA_CONFIG);
	private readonly renderHtml = inject(EditraHtmlPipe);
	content: SafeHtml = '';

	ngOnChanges(): void {
		this.content = this.renderHtml.transform(this.html, this.config);
	}
}
