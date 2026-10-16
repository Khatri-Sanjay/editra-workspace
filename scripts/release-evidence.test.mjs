import { test } from 'node:test';
import assert from 'node:assert/strict';
import { assertReleaseEvidence, requiredChecks } from './release-evidence.mjs';

const manifest = { sourceSha256: 'source', archiveSha256: 'archive' };
const report = () => ({
	status: 'passed',
	...manifest,
	steps: [...requiredChecks, 'test:compatibility'].map((name) => ({ name, exitCode: 0 })),
	compatibility: [17, 18, 19, 20, 21, 22].map((angular) => ({
		angular,
		...manifest,
		install: true,
		build: true,
		browserFormsSsrHydration: true,
		productionAudit: angular === 22 ? true : null,
		peerBypass: false,
	})),
});

test('accepts matching complete release evidence', () => {
	assert.doesNotThrow(() => assertReleaseEvidence(report(), manifest, 'source', 'archive'));
});
test('rejects source or archive changes after validation', () => {
	assert.throws(() => assertReleaseEvidence(report(), manifest, 'changed', 'archive'), /source/);
	assert.throws(() => assertReleaseEvidence(report(), manifest, 'source', 'changed'), /archive/);
});
test('rejects failed, incomplete or mismatched consumer evidence', () => {
	const cases = [
		{ ...report(), status: 'running' },
		{ ...report(), steps: [{ exitCode: 1 }] },
		{ ...report(), compatibility: [] },
		{ ...report(), steps: [] },
	];
	for (const candidate of cases)
		assert.throws(() => assertReleaseEvidence(candidate, manifest, 'source', 'archive'));
	const candidate = report();
	candidate.compatibility[5].productionAudit = false;
	assert.throws(
		() => assertReleaseEvidence(candidate, manifest, 'source', 'archive'),
		/Angular 22/,
	);
	candidate.compatibility[5].productionAudit = true;
	candidate.compatibility[0].peerBypass = true;
	assert.throws(
		() => assertReleaseEvidence(candidate, manifest, 'source', 'archive'),
		/Angular 17/,
	);
	candidate.compatibility[0].peerBypass = false;
	candidate.compatibility[0].archiveSha256 = 'previous-archive';
	assert.throws(
		() => assertReleaseEvidence(candidate, manifest, 'source', 'archive'),
		/Angular 17/,
	);
});
