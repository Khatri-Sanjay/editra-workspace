import type { Routes } from '@angular/router';

export const routes: Routes = [
	{
		path: '',
		title: 'Editra Docs | Angular rich-text editor',
		loadComponent: () => import('./home.component').then((module) => module.HomeComponent),
	},
	{
		path: 'guides/:slug',
		loadComponent: () => import('./guide.component').then((module) => module.GuideComponent),
	},
	{
		path: 'examples',
		title: 'Live example | Editra Docs',
		loadComponent: () =>
			import('./examples.component').then((module) => module.ExamplesComponent),
	},
	{ path: '**', redirectTo: 'guides/not-found' },
];
