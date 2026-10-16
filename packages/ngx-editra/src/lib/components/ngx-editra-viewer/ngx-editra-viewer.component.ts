import {
	ChangeDetectionStrategy,
	Component,
	inject,
	Input,
	ViewEncapsulation,
} from '@angular/core';
import type { EditraConfig } from '../../core/public-api';
import { EDITRA_CONFIG } from '../../config/editra.config';
import { EditraContentDirective } from '../../directives/content.directive';

/** Read-only, server-safe rendering of saved editor HTML. */
@Component({
	selector: 'ngx-editra-viewer',
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	imports: [EditraContentDirective],
	template: '<div [editraContent]="html" [editraContentConfig]="config"></div>',
	host: {
		'[class.editra-dark]': 'config.theme === "dark"',
		'[class.editra-auto]': 'config.theme === "auto"',
	},
})
export class NgxEditraViewerComponent {
	@Input() html = '';
	@Input() config: EditraConfig = inject(EDITRA_CONFIG);
}
