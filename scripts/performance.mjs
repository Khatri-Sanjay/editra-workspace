import { EditraEngine } from '../dist/ngx-editra/fesm2022/ngx-editra-core.mjs';
import { performance } from 'node:perf_hooks';
import { writeFile } from 'node:fs/promises';
const results = [];
for (const paragraphs of [100, 1000, 5000]) {
	const html =
		'<p>One reasonably sized paragraph with <strong>formatted text</strong> and normal words.</p>'.repeat(
			paragraphs,
		);
	const start = performance.now(),
		engine = new EditraEngine({}, html),
		parsed = performance.now();
	const output = engine.getHTML(),
		serialized = performance.now();
	engine.apply(engine.state.tr.insertText('x', 1));
	const transaction = performance.now();
	results.push({
		paragraphs,
		inputBytes: Buffer.byteLength(html),
		outputBytes: Buffer.byteLength(output),
		parseMilliseconds: parsed - start,
		serializeMilliseconds: serialized - parsed,
		transactionMilliseconds: transaction - serialized,
	});
}
await writeFile(
	'artifacts/performance.json',
	JSON.stringify({ node: process.version, platform: process.platform, results }, null, 2) + '\n',
);
console.log(JSON.stringify(results, null, 2));
