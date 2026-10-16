import type { Routes } from '@angular/router';

export const routes: Routes = [
	{
		path: '',
		loadComponent: () =>
			import('./layout/docs-shell/docs-shell.component').then(
				(module) => module.DocsShellComponent,
			),
		children: [
			{
				path: '',
				pathMatch: 'full',
				title: 'Editra Docs | Angular rich-text editor',
				loadComponent: () =>
					import('./features/home/home.component').then((module) => module.HomeComponent),
			},
			{
				path: 'guides/:slug',
				loadComponent: () =>
					import('./features/guides/guide.component').then(
						(module) => module.GuideComponent,
					),
			},
			{
				path: 'examples',
				title: 'Live example | Editra Docs',
				loadComponent: () =>
					import('./features/examples/examples.component').then(
						(module) => module.ExamplesComponent,
					),
			},
			{ path: '**', redirectTo: 'guides/not-found' },
		],
	},
];
