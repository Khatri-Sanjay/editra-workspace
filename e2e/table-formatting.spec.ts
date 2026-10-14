import { test, expect } from '@playwright/test';

test('table cell selections keep font, size and alignment changes in the selected cells', async ({
	page,
}) => {
	await page.goto('/');
	await page.getByText('Import HTML', { exact: true }).click();
	await page
		.getByLabel('HTML input')
		.fill(
			'<table><tr><td><p>A</p></td><td><p>B</p></td><td><p>C</p></td></tr><tr><td><p>D</p></td><td><p>E</p></td><td><p>F</p></td></tr></table>',
		);
	await page.getByRole('button', { name: 'Apply HTML', exact: true }).click();
	const cells = page.locator('.ProseMirror td');
	await cells.nth(0).click();
	await cells.nth(3).click({ modifiers: ['Shift'] });
	await expect(page.locator('.selectedCell')).toHaveCount(2);
	await page.getByLabel('Font family', { exact: true }).selectOption('Georgia');
	await expect(cells.nth(0).locator('span')).toHaveCSS('font-family', 'Georgia');
	await page.getByLabel('Font family', { exact: true }).selectOption('Verdana');
	for (const index of [0, 3])
		await expect(cells.nth(index).locator('span')).toHaveCSS('font-family', 'Verdana');
	for (const index of [1, 2, 4, 5]) await expect(cells.nth(index).locator('span')).toHaveCount(0);
	await page.getByLabel('Font size', { exact: true }).selectOption('24');
	await page.getByLabel('Font size', { exact: true }).selectOption('32');
	for (const index of [0, 3])
		await expect(cells.nth(index).locator('span').last()).toHaveCSS('font-size', '32px');
	await page.getByRole('button', { name: 'Align right', exact: true }).click();
	for (const index of [0, 3])
		await expect(cells.nth(index).locator('p')).toHaveCSS('text-align', 'right');
	for (const index of [1, 2, 4, 5])
		await expect(cells.nth(index).locator('p')).toHaveCSS('text-align', 'left');
	await expect(page.getByRole('button', { name: 'Align right', exact: true })).toHaveAttribute(
		'aria-pressed',
		'true',
	);
	await page.getByLabel('Line height', { exact: true }).selectOption('2');
	for (const index of [0, 3])
		await expect(cells.nth(index).locator('p')).toHaveCSS('line-height', '32px');
	await expect(page.getByLabel('Line height', { exact: true })).toHaveValue('2');
	await page.getByLabel('Font family', { exact: true }).selectOption('');
	for (const index of [0, 3])
		await expect(cells.nth(index).locator('span').first()).not.toHaveCSS(
			'font-family',
			'Verdana',
		);
	await page.getByRole('button', { name: 'indent', exact: true }).click();
	for (const index of [0, 3])
		await expect(cells.nth(index).locator('p')).toHaveCSS('margin-left', '24px');
	for (const index of [1, 2, 4, 5])
		await expect(cells.nth(index).locator('p')).toHaveCSS('margin-left', '0px');
	await page.getByRole('button', { name: 'clear', exact: true }).click();
	for (const index of [0, 3]) {
		await expect(cells.nth(index).locator('p')).toHaveCSS('text-align', 'left');
		await expect(cells.nth(index).locator('p')).toHaveCSS('margin-left', '0px');
		await expect(cells.nth(index).locator('span')).toHaveCount(0);
	}
});

test('table appearance controls reflect the active table border', async ({ page }) => {
	await page.goto('/');
	await page.getByText('Import HTML', { exact: true }).click();
	await page
		.getByLabel('HTML input')
		.fill(
			'<table style="border:1px dashed #b8c2d0"><tr><td><p>Dashed</p></td></tr></table><p>Between</p><table style="border:none"><tr><td><p>Borderless</p></td></tr></table>',
		);
	await page.getByRole('button', { name: 'Apply HTML', exact: true }).click();
	const cells = page.locator('.ProseMirror td');
	await cells.first().click();
	const border = page.getByLabel('Table border', { exact: true });
	await expect(page.getByRole('dialog', { name: 'Table tools', exact: true })).not.toBeVisible();
	if (!(await page.getByRole('dialog', { name: 'Table tools', exact: true }).isVisible()))
		await page.getByRole('button', { name: 'Table tools', exact: true }).click();
	await expect(border).toBeVisible();
	await expect(border).toHaveValue('dashed');
	await cells.last().click();
	if (!(await page.getByRole('dialog', { name: 'Table tools', exact: true }).isVisible()))
		await page.getByRole('button', { name: 'Table tools', exact: true }).click();
	await expect(border).toHaveValue('none');
	await border.selectOption('solid');
	await expect(page.locator('.ProseMirror table').last()).toHaveCSS('border-top-style', 'solid');
	await expect(page.getByRole('group', { name: 'Rows', exact: true })).toBeVisible();
	await expect(page.getByRole('group', { name: 'Columns', exact: true })).toBeVisible();
	await page
		.getByRole('dialog', { name: 'Table tools', exact: true })
		.screenshot({ path: 'artifacts/table-tools-popup.png' });
	await page.keyboard.press('Escape');
	await expect(page.getByRole('dialog', { name: 'Table tools', exact: true })).not.toBeVisible();
	await page.setViewportSize({ width: 390, height: 844 });
	await page.getByRole('button', { name: 'Table tools', exact: true }).click();
	const box = await page.getByRole('dialog', { name: 'Table tools', exact: true }).boundingBox();
	expect(box?.x).toBeGreaterThanOrEqual(0);
	expect((box?.x ?? 0) + (box?.width ?? 0)).toBeLessThanOrEqual(390);
});

test('table line weight persists and popup header stays visible while scrolling', async ({
	page,
}) => {
	await page.goto('/');
	await page.getByText('Import HTML', { exact: true }).click();
	await page
		.getByLabel('HTML input')
		.fill('<table><tr><td><p>A</p></td><td><p>B</p></td></tr></table>');
	await page.getByRole('button', { name: 'Apply HTML', exact: true }).click();
	await page.locator('.ProseMirror td').first().click();
	await page.getByRole('button', { name: 'Table tools', exact: true }).click();
	const popup = page.getByRole('dialog', { name: 'Table tools', exact: true });
	const heading = popup.locator('.table-popup-heading');
	const originalTop = (await heading.boundingBox())?.y ?? 0;
	await popup.evaluate((el) => (el.scrollTop = 220));
	expect(Math.abs(((await heading.boundingBox())?.y ?? 0) - originalTop)).toBeLessThan(3);
	await page.getByLabel('Table line weight', { exact: true }).selectOption('4');
	await expect(page.locator('.ProseMirror table')).toHaveCSS('border-top-width', '4px');
	for (const cell of await page.locator('.ProseMirror td').all())
		await expect(cell).toHaveCSS('border-top-width', '4px');
	for (const style of ['dotted', 'double']) {
		await page.getByLabel('Table border', { exact: true }).selectOption(style);
		await expect(page.locator('.ProseMirror table')).toHaveCSS('border-top-style', style);
	}
	const html = await page.locator('.output pre').textContent();
	await page.getByRole('button', { name: 'Close table settings', exact: true }).click();
	if (!(await page.getByLabel('HTML input').isVisible()))
		await page.getByText('Import HTML', { exact: true }).click();
	await page.getByLabel('HTML input').fill(html ?? '');
	await page.getByRole('button', { name: 'Apply HTML', exact: true }).click();
	await page.locator('.ProseMirror td').first().click();
	await page.getByRole('button', { name: 'Table tools', exact: true }).click();
	await expect(page.getByLabel('Table line weight', { exact: true })).toHaveValue('4');
	await expect(page.locator('.ProseMirror td').first()).toHaveCSS('border-top-width', '4px');
	await expect(popup).toHaveCSS('scrollbar-width', 'thin');
});
