import { Component, EventEmitter, Input, Output } from '@angular/core';
import type { EditraToolbarItem } from 'ngx-editra/core';
import { EditraIconComponent } from './icon.component';

@Component({
	selector: 'editra-menu',
	standalone: true,
	imports: [EditraIconComponent],
	template: ` <div
		role="menu"
		aria-label="Table actions"
		tabindex="0"
		(keydown)="navigate($event)"
	>
		@for (item of items; track item.id) {
			<button
				type="button"
				role="menuitem"
				[disabled]="!enabled(item.command)"
				(click)="execute.emit(item.command)"
			>
				<editra-icon [name]="item.icon ?? item.command" /> {{ item.label }}
			</button>
		}
	</div>`,
	styles: [
		`
			[role='menu'] {
				display: grid;
				gap: 4px;
			}
			button {
				display: flex;
				align-items: center;
				gap: 10px;
				font: inherit;
				text-align: left;
				min-height: 36px;
				padding: 6px 10px;
				background: var(--editra-surface, #fff);
				color: inherit;
				border: 1px solid var(--editra-border, #ccd2dc);
				border-radius: 4px;
			}
			button:focus-visible {
				outline: 3px solid var(--editra-focus, #1763d1);
			}
			button:disabled {
				opacity: 0.5;
			}
		`,
	],
})
export class EditraMenuComponent {
	@Input() items: readonly EditraToolbarItem[] = [];
	@Input() enabled: (id: string) => boolean = () => true;
	@Output() readonly execute = new EventEmitter<string>();
	navigate(event: KeyboardEvent): void {
		if (
			!['ArrowUp', 'ArrowDown', 'Home', 'End'].includes(event.key) ||
			!(event.currentTarget instanceof HTMLElement)
		)
			return;
		const buttons = Array.from(
				event.currentTarget.querySelectorAll<HTMLButtonElement>('button:not(:disabled)'),
			),
			index = buttons.findIndex((button) => button === event.target);
		const next =
			event.key === 'Home'
				? 0
				: event.key === 'End'
					? buttons.length - 1
					: (index + (event.key === 'ArrowUp' ? -1 : 1) + buttons.length) %
						buttons.length;
		buttons[next]?.focus();
		event.preventDefault();
	}
}
