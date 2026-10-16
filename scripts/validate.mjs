import { spawn } from 'node:child_process';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import {
	archiveInfo,
	assertReleaseEvidence,
	sourceFingerprint,
	requiredChecks,
} from './release-evidence.mjs';

const npm = process.env['npm_execpath'] ?? process.env['EDITRA_NPM_CLI'];
if (!npm) throw new Error('Run through npm run validate, or set EDITRA_NPM_CLI');
const flags = process.argv.slice(2);
if (flags.some((flag) => flag !== '--compatibility'))
	throw new Error('Supported option: --compatibility');

const checks = [
	...requiredChecks,
	...(flags.includes('--compatibility') ? ['test:compatibility'] : []),
];
await mkdir('artifacts', { recursive: true });
const report = {
	status: 'running',
	startedAt: new Date().toISOString(),
	node: process.version,
	sourceSha256: await sourceFingerprint(),
	compatibilityRequested: flags.includes('--compatibility'),
	published: false,
	steps: [],
};
const save = () =>
	writeFile('artifacts/release-validation.json', JSON.stringify(report, null, 2) + '\n');
await save();
try {
	for (const check of checks) {
		console.log(`\nValidating: ${check}`);
		const step = { name: check, startedAt: new Date().toISOString(), exitCode: null };
		report.steps.push(step);
		await save();
		let output = '';
		step.exitCode = await new Promise((resolve, reject) => {
			const child = spawn(process.execPath, [npm, 'run', check], {
				shell: false,
				stdio: ['ignore', 'pipe', 'inherit'],
			});
			child.stdout.on('data', (data) => {
				process.stdout.write(data);
				output = (output + data).slice(-65536);
			});
			child.once('error', reject);
			child.once('exit', (code) => resolve(code ?? 1));
		});
		step.finishedAt = new Date().toISOString();
		if (check === 'test:ci') {
			const total = /TOTAL: (\d+) SUCCESS/.exec(output.replace(/\u001b\[[0-9;]*m/g, ''));
			if (total) step.testsPassed = Number(total[1]);
		}
		await save();
		if (step.exitCode !== 0) throw new Error(`${check} failed: ${step.exitCode}`);
	}
	Object.assign(report, await archiveInfo());
	if (report.compatibilityRequested)
		report.compatibility = JSON.parse(
			await readFile('artifacts/compatibility-results.json', 'utf8'),
		);
	report.browserReports = {};
	for (const suite of ['e2e-results', 'documentation-e2e']) {
		const data = JSON.parse(await readFile(`artifacts/${suite}.json`, 'utf8'));
		if (
			Date.parse(data.stats.startTime) < Date.parse(report.startedAt) ||
			data.stats.unexpected ||
			data.stats.skipped ||
			data.stats.flaky
		)
			throw new Error(`Missing fresh passing report: ${suite}`);
		report.browserReports[suite] = data.stats;
	}
	report.status = 'passed';
	const manifest = JSON.parse(await readFile('artifacts/package-manifest.json', 'utf8'));
	assertReleaseEvidence(
		report,
		manifest,
		await sourceFingerprint(),
		report.archiveSha256,
		report.compatibilityRequested,
	);
	await save();
} catch (error) {
	report.status = 'failed';
	report.error = error.message;
	await save();
	throw error;
}
console.log('\nAll requested release checks passed. No package was published.');
