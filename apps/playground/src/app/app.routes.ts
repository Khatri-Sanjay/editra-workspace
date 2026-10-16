import type { Routes } from '@angular/router';

export const routes: Routes = [
	{
		path: '',
		loadComponent: () =>
			import('./features/playground/playground.component').then(
				(module) => module.PlaygroundComponent,
			),
	},
	{ path: '**', redirectTo: '' },
];
