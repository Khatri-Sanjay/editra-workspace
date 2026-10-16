import { readFile } from 'node:fs/promises';
import { archiveInfo, assertReleaseEvidence, sourceFingerprint } from './release-evidence.mjs';

const read = async (path) => JSON.parse(await readFile(path, 'utf8'));
const report = await read('artifacts/release-validation.json');
const manifest = await read('artifacts/package-manifest.json');
const archive = await archiveInfo();
assertReleaseEvidence(report, manifest, await sourceFingerprint(), archive.archiveSha256);
console.log(
	`Release evidence matches current source and archive ${archive.archiveSha256}. No package was published.`,
);
