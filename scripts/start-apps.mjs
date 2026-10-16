import { spawn, spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const cli = fileURLToPath(new URL('../node_modules/@angular/cli/bin/ng.js', import.meta.url));
const children = new Set();
const playgroundPort = process.env.PLAYGROUND_PORT ?? '4200';
const documentationPort = process.env.DOCS_PORT ?? '4300';
let stopping = false;

function stop(code = 0) {
	if (stopping) return;
	stopping = true;
	process.exitCode = code;
	for (const child of children) {
		if (process.platform === 'win32') {
			spawnSync('taskkill', ['/pid', String(child.pid), '/T', '/F'], {
				stdio: 'ignore',
				windowsHide: true,
			});
		} else child.kill('SIGTERM');
	}
}

process.on('SIGINT', () => stop());
process.on('SIGTERM', () => stop());

function run(args) {
	return new Promise((resolve, reject) => {
		const child = spawn(process.execPath, args, {
			cwd: root,
			stdio: 'inherit',
			windowsHide: true,
		});
		children.add(child);
		child.once('error', (error) => {
			children.delete(child);
			reject(error);
		});
		child.once('exit', (code, signal) => {
			children.delete(child);
			if (stopping || code === 0) resolve();
			else reject(new Error(`Process failed: ${signal ?? code} (${args.join(' ')})`));
		});
	});
}

try {
	await run(['scripts/build-library.mjs']);
	if (!stopping) await run(['scripts/generate-documentation.mjs']);
	if (!stopping) {
		console.log(
			`\nPlayground: http://localhost:${playgroundPort}\nDocumentation: http://localhost:${documentationPort}`,
		);
		console.log('Press Ctrl+C to stop both apps.\n');
		// If either server exits, shut down the other server as well.
		await Promise.race([
			run([cli, 'serve', 'playground', '--port', playgroundPort]),
			run([cli, 'serve', 'documentation', '--port', documentationPort]),
		]);
		stop();
	}
} catch (error) {
	console.error(error.message);
	stop(1);
}
