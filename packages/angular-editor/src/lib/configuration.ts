import { InjectionToken } from '@angular/core';
import type { Provider } from '@angular/core';
import type { EditraConfig } from 'ngx-editra/core';

/** Application defaults; individual editor inputs can override the complete configuration. */
export const EDITRA_CONFIG = new InjectionToken<EditraConfig>('EDITRA_CONFIG', {
	providedIn: 'root',
	factory: () => ({}),
});
export function provideEditra(config: EditraConfig): Provider {
	return { provide: EDITRA_CONFIG, useValue: config };
}
/** Override presentation while retaining the library's typed dialog contents and commands. */
export interface EditraDialogPresenter {
	open(dialog: HTMLDialogElement): void;
	close(dialog: HTMLDialogElement): void;
}
export const EDITRA_DIALOG_PRESENTER = new InjectionToken<EditraDialogPresenter>(
	'EDITRA_DIALOG_PRESENTER',
	{
		providedIn: 'root',
		factory: () => ({
			open: (dialog) => dialog.showModal(),
			close: (dialog) => dialog.close(),
		}),
	},
);
export function provideEditraDialogs(presenter: EditraDialogPresenter): Provider {
		return { provide: EDITRA_DIALOG_PRESENTER, useValue: presenter };
}
