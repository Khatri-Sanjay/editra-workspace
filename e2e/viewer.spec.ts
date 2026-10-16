import { test, expect } from '@playwright/test';

test('saved HTML matches editor content presentation on desktop and mobile', async ({ page }) => {
	await page.route('https://example.com/picture.svg', (route) =>
		route.fulfill({
			contentType: 'image/svg+xml',
			body: '<svg xmlns="http://www.w3.org/2000/svg" width="320" height="180"><rect width="320" height="180" fill="#1763d1"/></svg>',
		}),
	);
	await page.route('https://example.com/movie.mp4', (route) => route.abort());
	await page.addInitScript(() => {
		Object.defineProperty(navigator, 'clipboard', {
			configurable: true,
			value: {
				writeText: async (text: string) => {
					document.documentElement.dataset['previewCopiedCode'] = text;
				},
			},
		});
	});
	await page.goto('/');
	await expect(page.getByRole('button', { name: 'code', exact: true })).toHaveCount(0);
	await expect(
		page
			.getByRole('region', { name: 'Rendered document', exact: true })
			.getByRole('button', { name: 'Copy code', exact: true }),
	).toHaveCount(4);
	await page.getByText('Import HTML', { exact: true }).click();
	await page
		.getByLabel('HTML input')
		.fill(
			'<h2 style="text-align:center">Rendered content</h2><p><strong>Bold</strong> <em>Italic</em> <code>inline()</code> <span style="color:#ff0000;font-size:24px">Colour</span></p><blockquote><p>A quotation</p></blockquote><pre data-language="typescript"><code>const x = 1;\n  run(x);</code></pre><figure style="text-align:right"><img src="https://example.com/picture.svg" width="320" height="180" style="border-radius:12px"><figcaption>Image caption</figcaption></figure><table style="width:75%;border:2px dashed"><tr><th style="background-color:#ffeeaa"><p>Heading</p></th><th><p>Other</p></th></tr><tr><td><p>Cell</p></td><td><p>Value</p></td></tr></table><ol start="3"><li><p>Third item</p></li></ol><video src="https://example.com/movie.mp4" controls></video><hr data-line-style="dashed"><p>End</p>',
		);
	await page.getByRole('button', { name: 'Apply HTML', exact: true }).click();
	const viewer = page
		.getByRole('region', { name: 'Rendered document', exact: true })
		.locator('.editra-content');
	await expect(viewer.locator('pre code')).toHaveText('const x = 1;\n  run(x);');
	const copyButton = viewer.getByRole('button', { name: 'Copy code', exact: true });
	await expect(copyButton.locator('svg')).toBeVisible();
	await copyButton.focus();
	await page.keyboard.press('Enter');
	await expect(page.locator('html')).toHaveAttribute(
		'data-preview-copied-code',
		'const x = 1;\n  run(x);',
	);
	await expect(viewer.getByRole('status')).toHaveText('Copied!');
	await expect(viewer.locator('pre')).toHaveAttribute('data-language', 'typescript');
	await expect(viewer.locator('video')).toHaveAttribute('controls', '');
	await expect(viewer.locator('img')).toHaveCSS('border-radius', '12px');
	await expect(viewer.locator('h2')).toHaveCSS('text-align', 'center');
	await expect(viewer.locator('th').first()).toHaveCSS('background-color', 'rgb(255, 238, 170)');
	await expect(viewer.locator('ol')).toHaveAttribute('start', '3');
	for (const width of [1280, 375]) {
		await page.setViewportSize({ width, height: 900 });
		for (const [selector, properties] of [
			['blockquote', ['padding', 'border-left-width', 'background-color']],
			['pre', ['padding', 'white-space', 'tab-size']],
			['p > code', ['font-family', 'background-color', 'padding']],
			['td', ['padding', 'border-top-style']],
		] as const) {
			for (const property of properties) {
				const expected = await page
					.locator('.ProseMirror')
					.first()
					.locator(selector)
					.first()
					.evaluate((el, prop) => getComputedStyle(el).getPropertyValue(prop), property);
				await expect(viewer.locator(selector).first()).toHaveCSS(property, expected);
			}
		}
		const fits = await viewer
			.locator('img')
			.evaluate(
				(img) =>
					img.getBoundingClientRect().width <=
					(img.closest('.editra-content')?.getBoundingClientRect().width ?? 0),
			);
		expect(fits).toBe(true);
	}
	const nativeRendering = await page
		.getByRole('region', { name: 'Document source code' })
		.evaluate((output) => {
			const container = document.createElement('div');
			container.innerHTML = output.textContent ?? '';
			document.body.append(container);
			const pre = container.querySelector('pre');
			const result = {
				whiteSpace: pre ? getComputedStyle(pre).whiteSpace : '',
				padding: pre ? getComputedStyle(pre).padding : '',
				code: pre?.textContent,
				quotePadding: container.querySelector('blockquote')?.style.padding,
				cellPadding: container.querySelector('td')?.style.padding,
			};
			container.remove();
			return result;
		});
	expect(nativeRendering).toEqual({
		whiteSpace: 'pre',
		padding: '16px',
		code: 'const x = 1;\n  run(x);',
		quotePadding: '10px 16px',
		cellPadding: '8px',
	});
	await viewer.scrollIntoViewIfNeeded();
	await page.screenshot({ path: 'artifacts/rendered-content-mobile.png', fullPage: true });
});
