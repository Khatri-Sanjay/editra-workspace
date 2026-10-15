import { test, expect } from '@playwright/test';
test('line control stays centered and dropdowns follow dark, light, and automatic themes', async ({
	page,
}) => {
	await page.goto('/');
	await page.getByLabel('Theme', { exact: true }).selectOption('dark');
	const editor = page.locator('editra-editor').first();
	await expect(editor).toHaveCSS('color-scheme', 'dark');
	const line = page.getByRole('button', { name: 'Insert horizontal line', exact: true });
	await line.hover();
	const button = await line.boundingBox(),
		icon = await line.locator('editra-icon').boundingBox();
	if (!button || !icon) throw new Error('Missing line icon');
	expect(Math.abs(button.x + button.width / 2 - icon.x - icon.width / 2)).toBeLessThan(1);
	await page.getByRole('button', { name: 'Line settings', exact: true }).click();
	const popup = page.getByRole('dialog', { name: 'Line settings', exact: true });
	await expect(popup).toHaveCSS('background-color', 'rgb(24, 35, 56)');
	await expect(popup).toHaveCSS('color', 'rgb(241, 245, 251)');
	await expect(
		page.getByLabel('Line style', { exact: true }).locator('option').first(),
	).toHaveCSS('background-color', 'rgb(24, 35, 56)');
	await expect(
		page.getByLabel('Line style', { exact: true }).locator('option').first(),
	).toHaveCSS('color', 'rgb(241, 245, 251)');
	await popup.screenshot({ path: 'artifacts/line-dropdown-dark.png' });
	await page.keyboard.press('Escape');
	await page.getByRole('button', { name: 'table', exact: true }).click();
	await page.getByRole('button', { name: 'Choose 2 rows and 2 columns', exact: true }).click();
	await page.locator('.ProseMirror td').first().click();
	await page.getByRole('button', { name: 'Table tools', exact: true }).click();
	const tablePopup = page.getByRole('dialog', { name: 'Table tools', exact: true });
	await expect(tablePopup.locator('.table-group-label').first()).toHaveCSS(
		'color',
		'rgb(188, 201, 220)',
	);
	await page.keyboard.press('Escape');
	await page.emulateMedia({ colorScheme: 'dark' });
	await page.getByLabel('Theme', { exact: true }).selectOption('auto');
	await expect(editor).toHaveCSS('color-scheme', 'dark');
	await page.getByLabel('Theme', { exact: true }).selectOption('light');
	await expect(editor).toHaveCSS('color-scheme', 'light');
	await expect(
		page.getByLabel('Font family', { exact: true }).locator('option').first(),
	).toHaveCSS('background-color', 'rgb(255, 255, 255)');
});
