import { test, expect } from '@playwright/test';

test('text-case changes preserve marks and selected text across repeated conversions', async ({
	page,
}) => {
	await page.goto('/');
	await page.getByText('Import HTML', { exact: true }).click();
	await page.getByLabel('HTML input').fill('<p><strong>hello</strong> WORLD</p>');
	await page.getByRole('button', { name: 'Apply HTML', exact: true }).click();
	const surface = page.locator('.ProseMirror').first();
	await surface.click();
	await page.keyboard.press('ControlOrMeta+a');
	const cases = page.getByLabel('Text case', { exact: true });
	await cases.selectOption('title');
	await expect(surface.locator('p')).toHaveText('Hello World');
	await expect(surface.locator('strong')).toHaveText('Hello');
	await cases.selectOption('upper');
	await expect(surface.locator('p')).toHaveText('HELLO WORLD');
	await cases.selectOption('lower');
	await expect(surface.locator('p')).toHaveText('hello world');
	await cases.selectOption('camel');
	await expect(surface.locator('p')).toHaveText('helloWorld');
	await expect(surface.locator('strong')).toHaveText('hello');
	await cases.selectOption('pascal');
	await expect(surface.locator('p')).toHaveText('HelloWorld');
	await cases.selectOption('snake');
	await expect(surface.locator('p')).toHaveText('hello_world');
	await cases.selectOption('kebab');
	await expect(surface.locator('p')).toHaveText('hello-world');
	await page.getByRole('button', { name: 'undo', exact: true }).click();
	await expect(surface.locator('p')).toHaveText('hello_world');
});

test('divider styles are editable and persist through HTML reloads', async ({ page }) => {
	await page.goto('/');
	const surface = page.locator('.ProseMirror').first();
	await surface.click();
	await page.keyboard.press('ControlOrMeta+a');
	await page.keyboard.insertText('Divider');
	await page.getByRole('button', { name: 'Line settings', exact: true }).click();
	await page.getByLabel('Line style', { exact: true }).selectOption('dashed');
	await page.getByLabel('Horizontal line weight', { exact: true }).selectOption('2');
	await page.getByRole('button', { name: 'Apply line', exact: true }).click();
	const line = surface.locator('hr');
	await expect(line).toHaveCSS('border-top-style', 'dashed');
	await line.click();
	await page.getByRole('button', { name: 'Line settings', exact: true }).click();
	await expect(page.getByLabel('Horizontal line weight', { exact: true })).toHaveValue('2');
	await page.getByLabel('Line style', { exact: true }).selectOption('double');
	await page.getByLabel('Horizontal line weight', { exact: true }).selectOption('6');
	await page.getByRole('button', { name: 'Apply line', exact: true }).click();
	await expect(line).toHaveCount(1);
	await expect(line).toHaveCSS('border-top-style', 'double');
	await expect(line).toHaveCSS('border-top-width', '6px');
	const html = await page.locator('.output pre').textContent();
	await page.getByText('Import HTML', { exact: true }).click();
	await page.getByLabel('HTML input').fill(html ?? '');
	await page.getByRole('button', { name: 'Apply HTML', exact: true }).click();
	await expect(line).toHaveCSS('border-top-style', 'double');
});

test('case conversion only changes selected table cells', async ({ page }) => {
	await page.goto('/');
	await page.getByText('Import HTML', { exact: true }).click();
	await page
		.getByLabel('HTML input')
		.fill(
			'<table><tr><td><p>hello world</p></td><td><p>Keep</p></td></tr><tr><td><p>second cell</p></td><td><p>Untouched</p></td></tr></table>',
		);
	await page.getByRole('button', { name: 'Apply HTML', exact: true }).click();
	const cells = page.locator('.ProseMirror td');
	await cells.nth(0).click();
	await cells.nth(2).click({ modifiers: ['Shift'] });
	await page.getByLabel('Text case', { exact: true }).selectOption('snake');
	await expect(cells.nth(0)).toHaveText('hello_world');
	await expect(cells.nth(2)).toHaveText('second_cell');
	await expect(cells.nth(1)).toHaveText('Keep');
	await expect(cells.nth(3)).toHaveText('Untouched');
});

test('one line control inserts immediately and reuses the saved style and weight', async ({
	page,
}) => {
	await page.goto('/');
	const surface = page.locator('.ProseMirror').first();
	await surface.click();
	await page.keyboard.press('ControlOrMeta+a');
	await page.keyboard.insertText('Lines');
	await expect(page.getByRole('button', { name: 'horizontal rule', exact: true })).toHaveCount(0);
	await page.getByRole('button', { name: 'Insert horizontal line', exact: true }).click();
	await expect(surface.locator('hr')).toHaveCount(1);
	await expect(
		page.getByRole('dialog', { name: 'Line settings', exact: true }),
	).not.toBeVisible();
	await surface.locator('hr').click();
	await page.getByRole('button', { name: 'Line settings', exact: true }).click();
	await page.getByLabel('Line style', { exact: true }).selectOption('dotted');
	await page.getByLabel('Horizontal line weight', { exact: true }).selectOption('4');
	await page.getByRole('button', { name: 'Apply line', exact: true }).click();
	await surface.locator('hr').click();
	await page.getByRole('button', { name: 'Insert horizontal line', exact: true }).click();
	await expect(surface.locator('hr')).toHaveCount(2);
	for (const line of await surface.locator('hr').all()) {
		await expect(line).toHaveCSS('border-top-style', 'dotted');
		await expect(line).toHaveCSS('border-top-width', '4px');
	}
	await expect(
		page.getByRole('dialog', { name: 'Line settings', exact: true }),
	).not.toBeVisible();
});
