import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, afterNextRender, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { guides } from './generated/guides';
import { DocsTheme } from './docs-theme.service';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [FormsModule, RouterLink, RouterLinkActive, RouterOutlet],
	templateUrl: './app.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
	private readonly document = inject(DOCUMENT);
	readonly guides = guides;
	readonly groups = [...new Set(guides.map((guide) => guide.group))];
	readonly menuOpen = signal(false);
	readonly dark = inject(DocsTheme).dark;
	query = '';
	constructor() {
		afterNextRender(() => {
			try {
				this.setTheme(
					this.document.defaultView?.localStorage.getItem('editra-docs-theme') === 'dark',
				);
			} catch {
				/* Storage is optional; keep the default theme. */
			}
		});
	}
	get results() {
		const query = this.query.trim().toLowerCase();
		return query
			? guides.filter((guide) =>
					`${guide.title.toLowerCase()} ${guide.search}`.includes(query),
				)
			: [];
	}
	toggleTheme(): void {
		this.setTheme(!this.dark());
		try {
			this.document.defaultView?.localStorage.setItem(
				'editra-docs-theme',
				this.dark() ? 'dark' : 'light',
			);
		} catch {
			/* Theme remains usable without persistent storage. */
		}
	}
	closeMenu(): void {
		this.menuOpen.set(false);
		this.query = '';
	}
	private setTheme(dark: boolean): void {
		this.dark.set(dark);
		this.document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
	}
}
