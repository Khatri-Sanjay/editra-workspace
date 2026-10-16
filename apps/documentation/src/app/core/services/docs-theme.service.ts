import { DOCUMENT } from '@angular/common';
import { Injectable, afterNextRender, inject, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DocsTheme {
	private readonly document = inject(DOCUMENT);
	private readonly state = signal(false);
	readonly dark = this.state.asReadonly();
	constructor() {
		afterNextRender(() => {
			try {
				this.apply(
					this.document.defaultView?.localStorage.getItem('editra-docs-theme') === 'dark',
				);
			} catch {
				/* Storage is optional; keep the default theme. */
			}
		});
	}
	toggle(): void {
		this.apply(!this.dark());
		try {
			this.document.defaultView?.localStorage.setItem(
				'editra-docs-theme',
				this.dark() ? 'dark' : 'light',
			);
		} catch {
			/* Theme remains usable without persistent storage. */
		}
	}
	private apply(dark: boolean): void {
		this.state.set(dark);
		this.document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
	}
}
