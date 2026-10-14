import { cp, copyFile } from 'node:fs/promises';
for (const name of ['README.md', 'LICENSE', 'PROGRESS.md', 'CONTRIBUTING.md', 'CHANGELOG.md'])
	await copyFile(name, `packages/angular-editor/${name}`);
await cp('docs', 'packages/angular-editor/docs', { recursive: true });
