import { spawn } from 'node:child_process';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
await mkdir('artifacts', { recursive: true });
const cli = process.env['npm_execpath'] ?? process.env['EDITRA_NPM_CLI'];
if (!cli) throw new Error('Run through npm run pack, or set EDITRA_NPM_CLI');
function run(args, capture = false) {
	return new Promise((resolve, reject) => {
		const child = spawn(process.execPath, [cli, ...args], {
			shell: false,
			stdio: capture ? ['ignore', 'pipe', 'inherit'] : 'inherit',
		});
		let output = '';
		if (capture) child.stdout.on('data', (data) => (output += data));
		child.once('error', reject);
		child.once('exit', (code) =>
			code === 0 ? resolve(output) : reject(new Error(`npm exit ${code}`)),
		);
	});
}
await run(['run', 'build']);
const dry = JSON.parse(await run(['pack', './dist/ngx-editra', '--dry-run', '--json'], true));
const files = dry[0].files.map((file) => file.path);
for (const path of [
	'index.d.ts',
	'core/index.d.ts',
	'extensions/index.d.ts',
	'styles/editor.scss',
	'LICENSE',
	'README.md',
])
	if (!files.includes(path)) throw new Error(`Missing package asset: ${path}`);
const pkg = JSON.parse(await readFile('dist/ngx-editra/package.json', 'utf8'));
if (
	Object.values(pkg.dependencies).some(
		(value) => value.startsWith('file:') || value.startsWith('workspace:'),
	)
)
	throw new Error('Local distribution dependency');
if (dry[0].bundled.length) throw new Error('Unexpected bundled dependencies');
await writeFile('artifacts/package-report.json', JSON.stringify(dry, null, 2) + '\n');
console.log(
	await run(['pack', './dist/ngx-editra', '--pack-destination', 'artifacts', '--json'], true),
);
