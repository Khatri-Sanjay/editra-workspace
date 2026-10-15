import { test, expect } from '@playwright/test';

test('code blocks copy current code without including their controls', async ({ page }) => {
	const sanitizationWarnings: string[] = [];
	page.on('console', (message) => {
		if (message.text().includes('sanitizing HTML stripped'))
			sanitizationWarnings.push(message.text());
	});
	await page.goto('/');
	await page.evaluate(() => {
		Object.defineProperty(navigator, 'clipboard', {
			configurable: true,
			value: {
				writeText: async (text: string) => {
					document.documentElement.dataset['copiedCode'] = text;
				},
			},
		});
	});
	await page.getByText('Import HTML', { exact: true }).click();
	await page
		.getByLabel('HTML input')
		.fill('<pre><code>const x = 1;\n  x++;</code></pre><p>After</p>');
	await page.getByRole('button', { name: 'Apply HTML', exact: true }).click();
	const block = page.locator('.ProseMirror .editra-code-block').first();
	await expect(block.locator('pre')).toHaveText('const x = 1;\n  x++;');
	await block.getByRole('button', { name: 'Copy code' }).click();
	await expect(block.getByRole('status')).toHaveText('Copied!');
	await expect(block.getByRole('button', { name: 'Copy code' }).locator('svg')).toBeVisible();
	await block.getByLabel('Code language').selectOption('java');
	await expect(block.getByLabel('Code language')).toHaveValue('java');
	await expect(page.locator('html')).toHaveAttribute('data-copied-code', 'const x = 1;\n  x++;');
	await block.locator('code').click();
	await page.keyboard.press('End');
	await page.keyboard.insertText(' // edited');
	await block.getByRole('button', { name: 'Copy code' }).click();
	await expect(page.locator('html')).toHaveAttribute('data-copied-code', /edited/);
	expect(sanitizationWarnings).toEqual([]);
});

test('imports language labels and renders HTML code as text', async ({ page }) => {
	await page.goto('/');
	await page.getByText('Import HTML', { exact: true }).click();
	await page
		.getByLabel('HTML input')
		.fill('<pre><code class="language-html">&lt;h1&gt;Hello&lt;/h1&gt;</code></pre>');
	await page.getByRole('button', { name: 'Apply HTML', exact: true }).click();
	const block = page.locator('.ProseMirror .editra-code-block').first();
	await expect(block.getByLabel('Code language')).toHaveValue('html');
	await expect(block.locator('code')).toHaveText('<h1>Hello</h1>');
	await expect(block.locator('h1')).toHaveCount(0);
	await block.getByLabel('Code language').selectOption('typescript');
	await page.getByRole('button', { name: 'undo', exact: true }).click();
	await expect(block.getByLabel('Code language')).toHaveValue('html');
});
