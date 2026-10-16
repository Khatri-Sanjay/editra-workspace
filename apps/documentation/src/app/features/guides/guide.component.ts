import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { guides } from '../../content/generated/guides';
import type { Guide } from '../../shared/models/guide';
import { CodeExampleComponent } from '../../shared/components/code-example/code-example.component';

@Component({
	selector: 'app-docs-guide',
	standalone: true,
	imports: [RouterLink, CodeExampleComponent],
	templateUrl: './guide.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GuideComponent {
	private readonly router = inject(Router);
	private readonly document = inject(DOCUMENT);
	private readonly title = inject(Title);
	private readonly meta = inject(Meta);
	readonly guide = signal<Guide | undefined>(undefined);
	readonly copyStatus = signal('');
	constructor() {
		inject(ActivatedRoute)
			.paramMap.pipe(takeUntilDestroyed())
			.subscribe((params) => {
				const page = guides.find((guide) => guide.slug === params.get('slug'));
				this.guide.set(page);
				this.copyStatus.set('');
				this.title.setTitle(`${page?.title ?? 'Page not found'} | Editra Docs`);
				this.meta.updateTag({
					name: 'description',
					content: page?.summary ?? 'Documentation page not found.',
				});
			});
	}
	get previous(): Guide | undefined {
		return guides[guides.findIndex((guide) => guide.slug === this.guide()?.slug) - 1];
	}
	get next(): Guide | undefined {
		return guides[guides.findIndex((guide) => guide.slug === this.guide()?.slug) + 1];
	}
	onContentClick(event: Event): void {
		if (!(event.target instanceof Element)) return;
		if (
			event instanceof MouseEvent &&
			(event.ctrlKey || event.metaKey || event.shiftKey || event.button !== 0)
		)
			return;
		const href = event.target.closest('a')?.getAttribute('href');
		if (href?.startsWith('/guides/')) {
			event.preventDefault();
			void this.router.navigateByUrl(href);
		}
	}
	async copyExamples(): Promise<void> {
		const text = Array.from(
			this.document.querySelectorAll('.guide-prose pre code'),
			(block) => block.textContent ?? '',
		).join('\n\n');
		await this.copyText(text, 'Code examples copied.');
	}
	private async copyText(text: string, success: string): Promise<void> {
		try {
			const clipboard = this.document.defaultView?.navigator.clipboard;
			if (!clipboard) throw new Error('Clipboard unavailable');
			await clipboard.writeText(text);
			this.copyStatus.set(success);
		} catch {
			this.copyStatus.set('Copy unavailable. Select the code and copy it manually.');
		}
	}
}
