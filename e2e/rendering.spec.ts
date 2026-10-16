import { test, expect } from '@playwright/test';

test('directive, pipe and viewer preserve server content and activate without hydration errors', async ({
	page,
	request,
}) => {
	await page.route('https://images.unsplash.com/**', (route) =>
		route.fulfill({
			contentType: 'image/svg+xml',
			body: '<svg xmlns="http://www.w3.org/2000/svg" width="640" height="360"></svg>',
		}),
	);
	await page.route('https://interactive-examples.mdn.mozilla.net/**', (route) =>
		route.fulfill({
			contentType: 'video/mp4',
			path: 'e2e/fixtures/flower.mp4',
		}),
	);
	const response = await request.get('/');
	expect(response.ok()).toBeTruthy();
	const serverHtml = await response.text();
	expect(serverHtml).toContain('editra-html');
	expect(serverHtml).toContain('Pipe rendering');
	expect(serverHtml).toContain('Viewer rendering');
	const errors: string[] = [];
	page.on('pageerror', (error) => errors.push(error.message));
	page.on('console', (message) => {
		if (message.type() === 'error') errors.push(message.text());
	});
	await page.addInitScript(() => {
		Object.defineProperty(navigator, 'clipboard', {
			configurable: true,
			value: {
				writeText: async (text: string) => {
					document.documentElement.dataset['copiedContent'] = text;
				},
			},
		});
	});
	await page.goto('/');
	await page.getByText('Import HTML', { exact: true }).click();
	await page
		.getByLabel('HTML input')
		.fill(
			'<h2>Saved content</h2><pre data-language="typescript"><code>one &lt; two</code></pre><script>alert(1)</script>',
		);
	await page.getByRole('button', { name: 'Apply HTML', exact: true }).click();
	await page.getByText('More rendering options', { exact: true }).click();
	for (const label of ['Rendered document', 'Pipe rendering', 'Viewer rendering']) {
		const region = page.getByRole('region', { name: label, exact: true });
		await expect(region.locator('.editra-content')).toHaveCount(1);
		await expect(region.locator('.editra-content')).toHaveCSS('display', 'flow-root');
		await expect(region).toContainText('Saved content');
		await expect(region.locator('script')).toHaveCount(0);
		await expect(region.locator('[contenteditable]')).toHaveCount(0);
		if (label === 'Pipe rendering') {
			await expect(
				region.getByRole('button', { name: 'Copy code', exact: true }),
			).toHaveCount(0);
		} else {
			const code = await region.locator('pre code').first().textContent();
			await region.getByRole('button', { name: 'Copy code', exact: true }).first().click();
			await expect(page.locator('html')).toHaveAttribute('data-copied-content', code ?? '');
			await expect(region.getByRole('status').first()).toHaveText('Copied!');
		}
	}
	expect(errors).toEqual([]);
});
