import { staticPreview } from './static-preview';

describe('staticPreview', () => {
	it('keeps readable formatting while removing editor-only markup', () => {
		expect(
			staticPreview(
				'<p style="text-align:center" data-indent="2"><strong>Hello</strong></p><pre><code>&lt;script&gt;</code></pre>',
			),
		).toBe('<p><strong>Hello</strong></p><pre><code>&lt;script&gt;</code></pre>');
	});
	it('omits embedded players and active content without losing surrounding text', () => {
		expect(
			staticPreview(
				'<div><iframe src="https://example.com"></iframe><script>alert(1)</script><p onclick="alert(1)">Safe</p></div>',
			),
		).toBe('<div><p>Safe</p></div>');
	});
});
