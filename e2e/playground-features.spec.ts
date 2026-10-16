import { test, expect } from '@playwright/test';

test('sample documents, reset, source formats and copying work together', async ({ page }) => {
	await page.goto('/');
	const editor = page.locator('.ProseMirror').first();
	await page.getByLabel('Sample document', { exact: true }).selectOption('article');
	await expect(editor).toContainText('A fresh perspective');
	await editor.click();
	await page.keyboard.press('ControlOrMeta+a');
	await page.keyboard.insertText('Changed sample');
	await page.getByRole('button', { name: 'Reset form', exact: true }).click();
	await expect(editor).toContainText('A fresh perspective');
	await page.getByRole('button', { name: 'JSON', exact: true }).click();
	const source = page.getByRole('region', { name: 'Document source code' });
	await expect(source).toContainText('"type": "doc"');
	await page.evaluate(() => {
		Object.defineProperty(navigator, 'clipboard', {
			configurable: true,
			value: {
				writeText: async (text: string) => {
					document.documentElement.dataset['copiedOutput'] = text;
				},
			},
		});
	});
	await page.getByRole('button', { name: 'Copy output', exact: true }).click();
	await expect(page.getByRole('status')).toHaveText('Document output copied.');
	expect(await page.evaluate(() => document.documentElement.dataset['copiedOutput'])).toBe(
		await source.textContent(),
	);
	await page.getByRole('button', { name: 'Text', exact: true }).click();
	await expect(page.getByRole('status')).toBeEmpty();
	await page.evaluate(() => {
		Object.defineProperty(navigator.clipboard, 'writeText', {
			value: () => Promise.reject(new Error('Denied')),
		});
	});
	await page.getByRole('button', { name: 'Copy output', exact: true }).click();
	await expect(page.getByRole('status')).toContainText('Copy unavailable');
	await page.getByLabel('Sample document', { exact: true }).selectOption('blank');
	await expect(editor).toHaveText('');
	await page.setViewportSize({ width: 390, height: 844 });
	await page.screenshot({ path: 'artifacts/playground-features-mobile.png' });
	await page.evaluate(() => scrollTo(0, 0));
	expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
		true,
	);
	await page.screenshot({ path: 'artifacts/playground-settings-mobile.png' });
});
