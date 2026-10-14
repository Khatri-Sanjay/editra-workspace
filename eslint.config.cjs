const tsParser = require('@typescript-eslint/parser');
const tsPlugin = require('@typescript-eslint/eslint-plugin');
const angular = require('@angular-eslint/eslint-plugin');
const templates = require('@angular-eslint/eslint-plugin-template');
const templateParser = require('@angular-eslint/template-parser');
const prettier = require('eslint-config-prettier');

module.exports = [
	{
		ignores: [
			'**/node_modules/**',
			'**/dist/**',
			'**/out-tsc/**',
			'**/coverage/**',
			'**/.angular/**',
			'**/.npm-cache/**',
		],
	},
	{
		files: ['packages/**/*.ts', 'apps/playground/**/*.ts', 'apps/documentation/**/*.ts'],
		languageOptions: {
			parser: tsParser,
			parserOptions: {
				project: [
					'packages/angular-editor/tsconfig.lib.json',
					'packages/angular-editor/tsconfig.spec.json',
					'apps/playground/tsconfig.app.json',
					'apps/documentation/tsconfig.app.json',
				],
				tsconfigRootDir: __dirname,
			},
		},
		plugins: {
			'@typescript-eslint': tsPlugin,
			'@angular-eslint': angular,
			'@angular-eslint/template': templates,
		},
		processor: templates.processors['extract-inline-html'],
		rules: {
			...tsPlugin.configs['eslint-recommended'].overrides[0].rules,
			...tsPlugin.configs['recommended-type-checked'].rules,
			...angular.configs.recommended.rules,
			// Static hydration attributes and declarative host bindings are required by this adapter.
			'@angular-eslint/no-host-metadata-property': 'off',
			// TypeScript checks unused declarations across source and tests, including imports.
			'@typescript-eslint/no-unused-vars': 'off',
			'@typescript-eslint/consistent-type-imports': 'error',
			'@typescript-eslint/naming-convention': [
				'error',
				{ selector: 'typeLike', format: ['PascalCase'] },
			],
			'@angular-eslint/component-selector': [
				'error',
				{ type: 'element', prefix: 'editra', style: 'kebab-case' },
			],
			'@angular-eslint/directive-selector': [
				'error',
				{ type: 'attribute', prefix: 'editra', style: 'camelCase' },
			],
			'@angular-eslint/use-lifecycle-interface': 'error',
			'@angular-eslint/no-empty-lifecycle-method': 'error',
		},
	},
	{
		files: ['packages/**/*.html', 'apps/playground/**/*.html', 'apps/documentation/**/*.html'],
		languageOptions: { parser: templateParser },
		plugins: { '@angular-eslint/template': templates },
		rules: { ...templates.configs.recommended.rules, ...templates.configs.accessibility.rules },
	},
	{
		files: ['apps/playground/**/*.ts', 'apps/documentation/**/*.ts'],
		rules: {
			'@angular-eslint/component-selector': [
				'error',
				{ type: 'element', prefix: 'app', style: 'kebab-case' },
			],
		},
	},
	prettier,
];
