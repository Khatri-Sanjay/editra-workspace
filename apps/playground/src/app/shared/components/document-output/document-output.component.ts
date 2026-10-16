import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	Input,
	Output,
	signal,
} from '@angular/core';
import type { OnChanges } from '@angular/core';

export type DocumentFormat = 'HTML' | 'JSON' | 'Text' | 'Markdown';

@Component({
	selector: 'app-document-output',
	standalone: true,
	templateUrl: './document-output.component.html',
	styleUrl: './document-output.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentOutputComponent implements OnChanges {
	@Input() value = '';
	@Input() format: DocumentFormat = 'HTML';
	@Output() readonly formatChange = new EventEmitter<DocumentFormat>();
	readonly formats: readonly DocumentFormat[] = ['HTML', 'JSON', 'Text', 'Markdown'];
	readonly feedback = signal('');
	ngOnChanges(): void {
		this.feedback.set('');
	}
	async copy(): Promise<void> {
		try {
			await navigator.clipboard.writeText(this.value);
			this.feedback.set('Document output copied.');
		} catch {
			this.feedback.set('Copy unavailable. Select the document source and copy it manually.');
		}
	}
}
