import { staticPreview } from './static-preview';

describe('staticPreview', () => {
	it('imports divider appearance from CSS when data attributes are absent', () => {
		for (const style of [
			'border-top:4px dashed #123456',
			'border-top:dashed 4px #123456',
			'border-top-width:4px;border-top-style:dashed',
		]) {
			const html = staticPreview(`<hr style="${style}">`);
			expect(html).toContain('data-line-style="dashed"');
			expect(html).toContain('data-line-weight="4"');
		}
	});

	it('applies nesting limits inside code blocks and media captions', () => {
		const nested = '<span>'.repeat(105) + 'text' + '</span>'.repeat(105);
		for (const html of [
			`<pre><code>${nested}</code></pre>`,
			`<figure><img src="https://example.com/image.png"><figcaption>${nested}</figcaption></figure>`,
		])
			expect(() => staticPreview(html)).toThrowError(
				'Content nesting exceeds the supported limit',
			);
	});
	it('preserves canonical formatting, language and escaped code', () => {
		const html = staticPreview(
			'<h2 style="text-align:center">Title</h2><p><span style="color:#ff0000;font-size:24px">Hello</span> <code>x</code></p><pre data-language="java"><code>if (x &lt; 2) {\n  run();\n}</code></pre><blockquote><p>Quote</p></blockquote>',
		);
		expect(html).toContain('text-align:center');
		expect(html).toContain('color:#ff0000');
		expect(html).toContain('font-size:24px');
		expect(html).toContain('>x</code>');
		expect(html).toContain('data-language="java"');
		expect(html).toContain('if (x &lt; 2) {\n  run();\n}');
		expect(html).toContain('<blockquote style=');
	});
	it('preserves image layout, captions, tables, lists and columns', () => {
		const html = staticPreview(
			'<div data-editra-columns="true"><div data-editra-column="true" data-column-weight="35"><figure style="text-align:right" data-full-width="true"><img src="https://example.com/image.png" alt="Example" width="320" height="180" style="border-radius:12px"><figcaption>Caption</figcaption></figure></div><div data-editra-column="true" data-column-weight="65"><ol start="3"><li><p>Item</p></li></ol><table style="width:75%;border:2px dashed"><tr><th colspan="2" style="background-color:#ff0000"><p>Cell</p></th></tr></table></div></div>',
		);
		expect(html).toContain('data-column-weight="35"');
		expect(html).toContain('data-column-weight="65"');
		expect(html).toContain('data-full-width="true"');
		expect(html).toContain('border-radius:12px');
		expect(html).toContain('Caption</figcaption>');
		expect(html).toContain('<ol start="3">');
		expect(html).toContain('width:75%');
		expect(html).toContain('2px dashed');
		expect(html).toContain('colspan="2"');
		expect(html).toContain('background-color:#ff0000');
	});
	it('renders approved embeds and direct video with validated URLs', () => {
		const html = staticPreview(
			'<iframe src="https://www.youtube.com/watch?v=dQw4w9WgXcQ"></iframe><video src="https://example.com/movie.mp4" controls></video>',
		);
		expect(html).toContain('https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ');
		expect(html).toContain('sandbox="allow-scripts allow-same-origin allow-presentation"');
		expect(html).toContain('<video src="https://example.com/movie.mp4" controls=""');
	});
	it('drops active content, unsafe URLs, arbitrary styles and unapproved embeds', () => {
		const html = staticPreview(
			'<script>alert(1)</script><iframe src="https://example.com"></iframe><img src="javascript:alert(1)"><p onclick="alert(1)" style="position:fixed;background-image:url(https://example.com/track)"><a href="javascript:alert(1)">Safe</a></p>',
		);
		expect(html).toContain('Safe');
		for (const unsafe of [
			'script',
			'iframe',
			'onclick',
			'javascript:',
			'position:',
			'background-image',
		])
			expect(html).not.toContain(unsafe);
	});
});
