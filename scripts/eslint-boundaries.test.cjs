const path = require('node:path');
const { RuleTester } = require('eslint');
const rule = require('./eslint-boundaries.cjs');

const filename = (file) => path.resolve(__dirname, '..', file);
const core = 'packages/ngx-editra/src/lib/core/nested/example.ts';
const extension = 'packages/ngx-editra/src/lib/extensions/example.ts';
const app = 'apps/playground/src/app/example.ts';
const ui = 'packages/ngx-editra/src/lib/example.ts';
const sample = (file, code) => ({ filename: filename(file), code });
const rejected = (file, code) => ({ ...sample(file, code), errors: [{ messageId: 'boundary' }] });

new RuleTester({ parserOptions: { ecmaVersion: 2022, sourceType: 'module' } }).run(
	'architecture/boundaries',
	rule,
	{
		valid: [
			sample(core, "import { x } from '../types';"),
			sample(core, "import { x } from 'prosemirror-state';"),
			sample(extension, "import { x } from '../core/public-api';"),
			sample(ui, "import { x } from './extensions/public-api';"),
			sample(app, "import { x } from 'ngx-editra';"),
			sample(ui, "import { x } from './core/public-api';"),
		],
		invalid: [
			rejected(core, "import { x } from '@angular/core';"),
			rejected(core, "export { x } from '../../extensions/media';"),
			rejected(extension, "import { x } from '../components/example';"),
			rejected(extension, "import { x } from 'ngx-editra';"),
			rejected(ui, "import { x } from 'ngx-editra';"),
			rejected(ui, "import { x } from '../../../../apps/playground/src/app/example';"),
			rejected(app, "export * from 'ngx-editra/src/lib/public-api';"),
			rejected(app, "import { x } from 'ngx-editra/core';"),
			rejected(app, "import { x } from 'ngx-editra/extensions';"),
			rejected(app, "import('../../../../packages/ngx-editra/src/public-api');"),
		],
	},
);
