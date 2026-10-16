const path = require('node:path');

const workspace = path.resolve(__dirname, '..');
const library = path.join(workspace, 'packages/ngx-editra');
const core = path.join(library, 'src/lib/core');
const extensions = path.join(library, 'src/lib/extensions');
const applications = path.join(workspace, 'apps');
const distribution = path.join(workspace, 'dist/ngx-editra');
const inside = (file, directory) => {
	const relative = path.relative(directory, file);
	return relative !== '..' && !relative.startsWith(`..${path.sep}`) && !path.isAbsolute(relative);
};

module.exports = {
	meta: {
		type: 'problem',
		schema: [],
		messages: { boundary: '{{reason}}' },
	},
	create(context) {
		const file = path.resolve(context.getFilename());
		function check(node) {
			const source = node.source;
			if (!source || typeof source.value !== 'string') return;
			const specifier = source.value;
			const target = specifier.startsWith('.')
				? path.resolve(path.dirname(file), specifier)
				: null;
			let reason;
			if (inside(file, library)) {
				if (specifier === 'ngx-editra' || specifier.startsWith('ngx-editra/'))
					reason =
						'Library code must use relative internal imports, not its own public package.';
				else if (target && !inside(target, library))
					reason = 'Library code cannot import workspace files outside its package.';
				else if (inside(file, core)) {
					if (specifier.startsWith('@angular/') || (target && !inside(target, core)))
						reason = 'Core must remain independent of Angular, UI and extensions.';
				} else if (inside(file, extensions)) {
					if (
						specifier.startsWith('@angular/') ||
						(target && !inside(target, extensions) && !inside(target, core))
					)
						reason =
							'Extensions may depend on core and other extensions, but cannot depend on Angular UI.';
				}
			} else if (inside(file, applications)) {
				if (
					specifier.startsWith('ngx-editra/') ||
					(target && (inside(target, library) || inside(target, distribution)))
				)
					reason =
						'Applications must consume the library through its public package entry points.';
			}
			if (reason) context.report({ node: source, messageId: 'boundary', data: { reason } });
		}
		return {
			ImportDeclaration: check,
			ExportNamedDeclaration: check,
			ExportAllDeclaration: check,
			ImportExpression: check,
		};
	},
};
