import { spawn } from 'node:child_process';
import { mkdir, writeFile, readFile, copyFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { resolve } from 'node:path';

const root = process.cwd(),
	results = [];
const node20 = process.env['EDITRA_NODE20'] ?? process.execPath;
const node24 = process.env['EDITRA_NODE24'] ?? process.execPath;
const npm = process.env['EDITRA_NPM_CLI'];
if (!npm) throw new Error('Set EDITRA_NPM_CLI to the npm CLI JavaScript entry point');
const majors = process.argv.slice(2).length
	? process.argv.slice(2).map(Number)
	: [17, 18, 19, 20, 21, 22];
function run(node, args, cwd, env = {}) {
	return new Promise((resolveResult) => {
		const child = spawn(node, args, {
			cwd,
			env: { ...process.env, ...env },
			stdio: 'inherit',
			shell: false,
		});
		child.once('error', (error) => {
			console.error(error);
			resolveResult(false);
		});
		child.once('exit', (code) => resolveResult(code === 0));
	});
}
await mkdir(resolve(root, 'artifacts'), { recursive: true });
const archive = resolve(root, 'artifacts/ngx-editra-0.1.0-alpha.0.tgz');
const archiveSha256 = createHash('sha256')
	.update(await readFile(archive))
	.digest('hex');
// Prevent npm caching an older same-version local package.
const snapshot = resolve(root, `artifacts/ngx-editra-${archiveSha256.slice(0, 12)}.tgz`);
await copyFile(archive, snapshot);
async function verify(major) {
	const node = major >= 21 ? node24 : node20,
		directory = resolve(root, `apps/compatibility/angular-${major}`);
	console.log(`\n=== Angular ${major} independent tarball consumer ===`);
	const result = {
		angular: major,
		archiveSha256,
		install: false,
		build: false,
		browserFormsSsrHydration: false,
	};
	results.push(result);
	// Candidate peer testing: publish metadata remains restricted until the matrix passes.
	result.install = await run(
		node,
		[
			npm,
			'install',
			snapshot,
			...(process.env['EDITRA_CANDIDATE_PEERS'] === '1' ? ['--legacy-peer-deps'] : []),
			'--workspaces=false',
			'--offline=false',
			'--cache',
			resolve(root, '.npm-cache'),
			'--no-audit',
			'--no-fund',
		],
		directory,
	);
	if (result.install)
		result.build = await run(
			node,
			['node_modules/@angular/cli/bin/ng.js', 'build', 'playground'],
			directory,
		);
	if (result.build)
		result.browserFormsSsrHydration = await run(
			node,
			[
				resolve(root, 'node_modules/@playwright/test/cli.js'),
				'test',
				'e2e/editor.spec.ts',
				'e2e/media.spec.ts',
				'e2e/media-layout.spec.ts',
				'e2e/word-tools.spec.ts',
			],
			root,
			{
				EDITRA_SERVER_COMMAND: `"${node}" "${resolve(directory, 'dist/playground/server/server.mjs')}"`,
				EDITRA_E2E_REPORT: `artifacts/angular-${major}-e2e.json`,
				EDITRA_TEST_OUTPUT: `test-results/angular-${major}`,
				EDITRA_BASE_URL: `http://localhost:${4700 + major}`,
				PORT: String(4700 + major),
				EDITRA_SCREENSHOT_PREFIX: `angular-${major}-word`,
			},
		);
	return result;
}
for (let index = 0; index < majors.length; index += 2) {
	await Promise.all(majors.slice(index, index + 2).map(verify));
	await writeFile(
		resolve(root, 'artifacts/compatibility-results.json'),
		JSON.stringify(
			results.sort((a, b) => a.angular - b.angular),
			null,
			2,
		) + '\n',
	);
}
if (results.some((result) => !result.build || !result.browserFormsSsrHydration))
	process.exitCode = 1;
