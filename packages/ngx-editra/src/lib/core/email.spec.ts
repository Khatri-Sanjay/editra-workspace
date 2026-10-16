import { exportEmail } from './email';
import type { EditraExtension } from './types';

describe('email export', () => {
	it('exports standalone inline-styled HTML and readable text with links', () => {
		const result = exportEmail(
			'<h1>Heading</h1><p>Hello <strong>world</strong> and <a href="https://example.com">read more</a>.</p><ol start="3"><li><p>Step</p></li></ol>',
			{ title: 'Draft', preheader: 'Preview' },
		);
		expect(result.html).toContain('<!doctype html>');
		expect(result.html).toContain('<!--[if mso]>');
		expect(result.html).toContain('max-width:600px');
		expect(result.html).toContain('<strong>world</strong>');
		expect(result.html).toContain('<ol start="3"');
		expect(result.text).toContain('Hello world and read more (https://example.com/).');
		expect(result.text).toContain('3. Step');
	});
	it('escapes content, metadata and code and never emits active content', () => {
		const result = exportEmail(
			'<script>alert(1)</script><p><a href="javascript:alert(1)">Unsafe</a></p><pre><code>&lt;img src=x onerror=alert(1)&gt;\n  next()</code></pre>',
			{ title: '</title><script>bad</script>', preheader: '<img src=x>' },
		);
		expect(result.html).not.toMatch(/<script|<iframe|<video|<button|javascript:/iu);
		expect(result.html).toContain('&lt;img');
		expect(result.html).toContain('&#160;&#160;next()');
		expect(result.html).not.toMatch(/var\(--|display:flex|display:grid/iu);
		const parsed = new DOMParser().parseFromString(result.html, 'text/html');
		expect(parsed.querySelector('[onerror],script,iframe,video,button')).toBeNull();
	});
	it('stacks columns and preserves merged table structure and cell colours', () => {
		const result = exportEmail(
			'<div data-editra-columns="true"><div data-editra-column="true"><p>First</p></div><div data-editra-column="true"><p>Second</p></div></div><table><tr><th colspan="2" style="background-color:#ffeeaa"><p>Title</p></th></tr><tr><td><p>A</p></td><td><p>B</p></td></tr></table>',
		);
		expect(result.html).toContain('colspan="2"');
		expect(result.html).toContain('bgcolor="#ffeeaa"');
		expect(result.html.indexOf('First')).toBeLessThan(result.html.indexOf('Second'));
		expect(result.warnings.map((warning) => warning.code)).toContain('columns-stacked');
		expect(result.text).toContain('A\tB');
	});
	it('bounds images and converts embedded video to a safe link', () => {
		const result = exportEmail(
			'<img src="https://example.com/large.png" alt="A forest" width="2000" height="1000"><iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ"></iframe>',
		);
		expect(result.html).toContain('width="560" height="280"');
		expect(result.html).toContain('max-width:560px');
		expect(result.html).not.toContain('<iframe');
		expect(result.html).toContain('>Watch video</a>');
		expect(result.html).toContain('href="https://www.youtube.com/embed/dQw4w9WgXcQ"');
		expect(result.text).toContain('https://www.youtube.com/embed/dQw4w9WgXcQ');
		expect(result.text).toContain('A forest\nhttps://example.com/large.png');
		expect(result.warnings.map((warning) => warning.code)).toContain('video-link');
		expect(result.warnings.filter((warning) => warning.code === 'remote-images').length).toBe(
			1,
		);
	});
	it('sizes images against the complete table grid when earlier rows span cells', () => {
		const result = exportEmail(
			'<table><tr><td rowspan="2"><p>Side</p></td><td><p>A</p></td><td><p>B</p></td></tr><tr><td><img src="https://example.com/image.png" width="300" height="150"></td><td><p>C</p></td></tr></table>',
		);
		expect(result.html).toContain('rowspan="2"');
		expect(result.html).toContain('width="170" height="85"');
	});
	it('does not run custom serializers and reports unsupported extension nodes', () => {
		let serialized = false;
		const extension: EditraExtension = {
			id: 'custom',
			nodes: {
				custom: {
					group: 'block',
					content: 'inline*',
					toDOM: () => {
						serialized = true;
						return ['script', 0];
					},
				},
			},
			parseElement: (element, schema) =>
				element.tag === 'aside'
					? (schema.nodes['custom']?.create(null, element.content) ?? null)
					: null,
		};
		const result = exportEmail('<aside>Preserved</aside>', {}, { extensions: [extension] });
		expect(serialized).toBe(false);
		expect(result.html).toContain('Preserved');
		expect(result.warnings.map((warning) => warning.code)).toContain('node-custom');
	});
	it('enforces input limits and validates container options', () => {
		expect(() =>
			exportEmail('<p>long content</p>', {}, { security: { maxInputLength: 5 } }),
		).toThrow();
		for (const width of [0, 359, 801, NaN, Infinity, 600.5])
			expect(() => exportEmail('', { width })).toThrow();
		expect(() => exportEmail('', { language: 'en" onclick="bad' })).toThrow();
		expect(exportEmail('', { width: 400, language: 'en-US' }).html).toContain(
			'max-width:400px',
		);
	});
	it('preserves validated colour, size and monospace font and reports oversized messages', () => {
		const result = exportEmail(
			'<p><span style="color:#123456;background-color:#ffff00;font-size:24px;font-family:monospace">Styled</span></p>',
		);
		expect(result.html).toContain('color:#123456');
		expect(result.html).toContain('background-color:#ffff00');
		expect(result.html).toContain('font-size:24px');
		expect(result.html).toContain('font-family:Courier New,monospace');
		expect(
			exportEmail('<p>' + 'x'.repeat(101000) + '</p>').warnings.map(
				(warning) => warning.code,
			),
		).toContain('large-html');
	});
});
