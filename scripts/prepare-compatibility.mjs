import { mkdir, readFile, writeFile, cp } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = process.cwd();
const versions = [17, 18, 19, 20, 21, 22];
const ts = { 17: '~5.4.5', 18: '~5.5.4', 19: '~5.8.3', 20: '~5.9.3', 21: '~5.9.3', 22: '~6.0.2' };
async function latest(name, major) {
	const response = await fetch(`https://registry.npmjs.org/${encodeURIComponent(name)}`);
	if (!response.ok) throw new Error(`Registry ${response.status}: ${name}`);
	const metadata = await response.json();
	return Object.keys(metadata.versions)
		.filter((version) => version.startsWith(`${major}.`) && !version.includes('-'))
		.sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
		.at(-1);
}
for (const major of versions) {
	const directory = resolve(root, `apps/compatibility/angular-${major}`);
	await mkdir(directory, { recursive: true });
	await cp(resolve(root, 'apps/playground/src'), resolve(directory, 'src'), { recursive: true });
	const styles = await readFile(resolve(directory, 'src/styles.scss'), 'utf8');
	await writeFile(
		resolve(directory, 'src/styles.scss'),
		styles.replace(
			'../../../dist/ngx-editra/styles/editor.scss',
			'ngx-editra/styles/editor.scss',
		),
	);
	const angular = await latest('@angular/core', major),
		cli = await latest('@angular/cli', major);
	const dependencies = Object.fromEntries(
		[
			'common',
			'compiler',
			'core',
			'forms',
			'platform-browser',
			'platform-server',
			'router',
		].map((name) => [`@angular/${name}`, angular]),
	);
	const zone = major <= 18 ? '~0.14.10' : '~0.15.1';
	const pkg = {
		name: `editra-angular-${major}-consumer`,
		private: true,
		version: '0.0.0',
		type: 'module',
		engines: { node: major >= 21 ? '>=24.15 <25' : '>=20.19 <21' },
		scripts: { build: 'ng build playground' },
		dependencies: {
			...dependencies,
			'@angular/ssr': cli,
			'ngx-editra': 'file:../../../artifacts/ngx-editra-0.1.0-alpha.0.tgz',
			rxjs: '~7.8.2',
			tslib: '^2.8.1',
			'zone.js': zone,
		},
		devDependencies: {
			'@angular/cli': cli,
			'@angular-devkit/build-angular': cli,
			'@angular/compiler-cli': angular,
			typescript: ts[major],
			'@types/node': '^20.19.0',
		},
	};
	await writeFile(resolve(directory, 'package.json'), JSON.stringify(pkg, null, 2) + '\n');
	await writeFile(resolve(directory, '.nvmrc'), major >= 21 ? '24.21.0\n' : '20.20.2\n');
	await writeFile(
		resolve(directory, 'tsconfig.json'),
		JSON.stringify(
			{
				compilerOptions: {
					target: 'ES2022',
					module: 'ES2022',
					moduleResolution: 'bundler',
					strict: true,
					noUncheckedIndexedAccess: true,
					exactOptionalPropertyTypes: true,
					experimentalDecorators: true,
					skipLibCheck: true,
					esModuleInterop: true,
					useDefineForClassFields: false,
					lib: ['ES2022', 'DOM'],
				},
				angularCompilerOptions: { strictTemplates: true, strictInjectionParameters: true },
			},
			null,
			2,
		),
	);
	await writeFile(
		resolve(directory, 'tsconfig.app.json'),
		JSON.stringify(
			{
				extends: './tsconfig.json',
				compilerOptions: { outDir: './out-tsc', types: ['node'] },
				files: ['src/main.ts', 'src/main.server.ts', 'server.ts'],
			},
			null,
			2,
		),
	);
	const config = JSON.parse(await readFile(resolve(root, 'angular.json'), 'utf8')).projects
		.playground;
	config.root = '';
	config.sourceRoot = 'src';
	const options = config.architect.build.options;
	options.outputPath = 'dist/playground';
	options.index = 'src/index.html';
	options.browser = 'src/main.ts';
	options.tsConfig = 'tsconfig.app.json';
	options.styles = ['src/styles.scss'];
	options.assets = ['src/favicon.ico', 'src/assets'];
	options.server = 'src/main.server.ts';
	options.prerender = false;
	options.ssr = { entry: 'server.ts' };
	delete config.architect.test;
	delete config.architect['extract-i18n'];
	await writeFile(
		resolve(directory, 'angular.json'),
		JSON.stringify({ version: 1, projects: { playground: config } }, null, 2),
	);
	await writeFile(
		resolve(directory, 'src/app/app.config.ts'),
		`import { provideZoneChangeDetection } from '@angular/core';\nimport type { ApplicationConfig } from '@angular/core';\nimport { provideClientHydration } from '@angular/platform-browser';\nexport const appConfig: ApplicationConfig = {providers:[provideZoneChangeDetection(),provideClientHydration()]};\n`,
	);
	await writeFile(
		resolve(directory, 'server.ts'),
		`import 'zone.js/node';
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { dirname, resolve, extname, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { renderApplication } from '@angular/platform-server';
import bootstrap from './src/main.server';
const folder=resolve(dirname(fileURLToPath(import.meta.url)),'../browser');
const port=Number(process.env['PORT']??4000);
const types:Record<string,string>={'.js':'text/javascript','.css':'text/css','.json':'application/json','.ico':'image/x-icon'};
createServer((req,res)=>{ void (async()=>{
 const url=new URL(req.url??'/', 'http://localhost:'+port);
 if(extname(url.pathname)) {const path=resolve(folder,'.'+decodeURIComponent(url.pathname));if(!path.startsWith(folder+sep)){res.writeHead(403).end();return;}res.setHeader('Content-Type',types[extname(path)]??'application/octet-stream');res.end(await readFile(path));return;}
 const document=await readFile(resolve(dirname(fileURLToPath(import.meta.url)),'index.server.html'),'utf8');
 const html=await renderApplication(bootstrap,{document,url:url.href${major >= 19 ? ",allowedHosts:['localhost']" : ''}});res.setHeader('Content-Type','text/html');res.end(html);
})().catch((error:unknown)=>{console.error(error);res.writeHead(500).end('Render failed');});}).listen(port,()=>console.log('Consumer server http://localhost:'+port));
`,
	);
	if (major >= 18)
		await writeFile(
			resolve(directory, 'src/main.server.ts'),
			"import { bootstrapApplication } from '@angular/platform-browser';\nimport type { BootstrapContext } from '@angular/platform-browser';\nimport { AppComponent } from './app/app.component';\nimport { config } from './app/app.config.server';\nexport default (context: BootstrapContext) => bootstrapApplication(AppComponent,config,context);\n",
		);
	console.log(`Angular ${major}: ${angular}; CLI ${cli}; TS ${ts[major]}`);
}
