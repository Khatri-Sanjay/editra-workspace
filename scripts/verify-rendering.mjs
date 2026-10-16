import 'zone.js/node';
import '@angular/compiler';
import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { Component, CSP_NONCE } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideServerRendering, renderApplication } from '@angular/platform-server';
import {
	EditraContentDirective,
	EditraHtmlPipe,
	NgxEditraViewerComponent,
	exportEmail,
} from '../dist/ngx-editra/fesm2022/ngx-editra.mjs';

assert.equal(typeof window, 'undefined');
const email = exportEmail(
	'<h1>Email example</h1><p>Hello <strong>reader</strong>. <a href="https://example.com">Read more</a>.</p><table><tr><th><p>Task</p></th><th><p>Status</p></th></tr><tr><td><p>Review</p></td><td><p>Ready</p></td></tr></table>',
);
assert.ok(email.html.startsWith('<!doctype html>'));
assert.ok(email.text.includes('Read more (https://example.com/)'));
assert.ok(!/<script|<iframe|<video|var\(--/.test(email.html));
await mkdir('artifacts', { recursive: true });
await writeFile('artifacts/email-example.html', email.html);
await writeFile('artifacts/email-example.txt', email.text);

// Exercise the actual packaged entry point without browser globals. Each request
// creates and destroys its own injector and shared-style registration.
class RenderingHost {
	html =
		'<h2>Saved content</h2><pre data-language="typescript"><code>one &lt; two</code></pre><iframe src="https://youtu.be/dQw4w9WgXcQ"></iframe><script>alert(1)</script>';
	config = { theme: 'dark' };
}
Component({
	selector: 'rendering-test',
	standalone: true,
	imports: [EditraContentDirective, EditraHtmlPipe, NgxEditraViewerComponent],
	template: `
		<article [editraContent]="html" [editraContentConfig]="config"></article>
		<section [innerHTML]="html | editraHtml: config"></section>
		<ngx-editra-viewer [html]="html" [config]="config" />
	`,
})(RenderingHost);

for (const nonce of ['request-one', 'request-two']) {
	const html = await renderApplication(
		() =>
			bootstrapApplication(RenderingHost, {
				providers: [provideServerRendering(), { provide: CSP_NONCE, useValue: nonce }],
			}),
		{
			document:
				'<!doctype html><html><head></head><body><rendering-test></rendering-test></body></html>',
			url: 'https://example.com/article',
		},
	);
	await mkdir('artifacts', { recursive: true });
	await writeFile(`artifacts/rendering-${nonce}.html`, html);
	assert.equal((html.match(/<h2\b[^>]*>Saved content<\/h2>/g) ?? []).length, 3);
	assert.equal((html.match(/class="editra-content editra-html editra-dark"/g) ?? []).length, 3);
	assert.equal((html.match(/youtube-nocookie.com\/embed\//g) ?? []).length, 3);
	assert.ok(html.includes('one &lt; two'));
	assert.ok(!html.includes('alert(1)'));
	assert.ok(!html.includes('editra-copy-code'), 'Browser controls should not run during SSR');
	assert.ok(html.includes('flow-root'), 'Content CSS must be included in server HTML');
	assert.ok(
		html.includes(`nonce="${nonce}"`),
		'Style registration must respect the request CSP nonce',
	);
	assert.ok(!html.includes(`nonce="${nonce === 'request-one' ? 'request-two' : 'request-one'}"`));
}
console.log('Packaged directive, pipe and viewer SSR, styles, CSP and request isolation passed.');
