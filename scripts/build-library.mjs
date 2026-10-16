import { spawn } from 'node:child_process';
import { copyFile, cp } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const root = new URL('../', import.meta.url);
const distribution = new URL('dist/ngx-editra/', root);

await new Promise((resolve, reject) => {
	const child = spawn(
		process.execPath,
		[
			fileURLToPath(new URL('node_modules/@angular/cli/bin/ng.js', root)),
			'build',
			'ngx-editra',
			...process.argv.slice(2),
		],
		{ cwd: fileURLToPath(root), shell: false, stdio: 'inherit' },
	);
	child.once('error', reject);
	child.once('exit', (code, signal) =>
		code === 0 ? resolve() : reject(new Error(`Library build failed: ${signal ?? code}`)),
	);
});

// The package README targets npm consumers; project policies live at the root.
await copyFile(new URL('packages/ngx-editra/README.md', root), new URL('README.md', distribution));
for (const name of [
	'LICENSE',
	'PROGRESS.md',
	'SECURITY.md',
	'CONTRIBUTING.md',
	'CHANGELOG.md',
	'ARCHITECTURE.md',
])
	await copyFile(new URL(name, root), new URL(name, distribution));
await cp(new URL('docs/', root), new URL('docs/', distribution), { recursive: true });
