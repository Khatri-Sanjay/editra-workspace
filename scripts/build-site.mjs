import { spawn } from 'node:child_process';
import { cp, mkdir, readFile, rm, writeFile, access } from 'node:fs/promises';
import { resolve, sep } from 'node:path';

const site = process.argv[2];
if (!['documentation', 'playground'].includes(site))
	throw new Error('Usage: npm run build:site -- documentation|playground');
const npm = process.env.npm_execpath;
if (!npm) throw new Error('Run this script with npm run build:site');
await new Promise((resolveResult, reject) => {
	const child = spawn(
		process.execPath,
		[npm, 'run', site === 'documentation' ? 'build:docs' : 'build:playground'],
		{ stdio: 'inherit' },
	);
	child.once('error', reject);
	child.once('exit', (code) =>
		code === 0 ? resolveResult() : reject(new Error(`Site build failed: ${code}`)),
	);
});

const parent = resolve('artifacts/sites');
const staging = resolve(parent, site);
if (!staging.startsWith(parent + sep)) throw new Error('Invalid staging directory');
await rm(staging, { recursive: true, force: true });
const output = resolve(staging, '.vercel/output');
const browser = resolve('dist', site, 'browser');
await access(resolve(browser, 'index.html'));
await mkdir(output, { recursive: true });
await cp(browser, resolve(output, 'static'), { recursive: true });
const pages =
	site === 'documentation'
		? (await readFile('apps/documentation/prerender-routes.txt', 'utf8')).trim().split(/\r?\n/)
		: ['/'];
const routes = pages
	.filter((page) => page !== '/')
	.map((page) => ({
		src: `^${page.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}/?$`,
		dest: `${page}/index.html`,
	}));
await writeFile(
	resolve(output, 'config.json'),
	JSON.stringify(
		{
			version: 3,
			routes: [...routes, { handle: 'filesystem' }, { src: '/.*', dest: '/index.html' }],
		},
		null,
		2,
	) + '\n',
);
// Deploy from this isolated directory so the legacy workspace engine is not used by Vercel.
await writeFile(
	resolve(staging, 'package.json'),
	JSON.stringify(
		{ name: `editra-${site}-site`, private: true, engines: { node: '24.x' } },
		null,
		2,
	) + '\n',
);
console.log(`Prepared static Vercel output: ${staging}`);
