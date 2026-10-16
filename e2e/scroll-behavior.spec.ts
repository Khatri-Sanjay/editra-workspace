import { test, expect } from '@playwright/test';

test('table popup and fullscreen contain scrolling and restore the page afterwards', async ({
	page,
}) => {
	await page.goto('/');
	const original = await page.evaluate(() => document.documentElement.style.overflow);
	await page.getByText('Import HTML', { exact: true }).click();
	await page
		.getByLabel('HTML input')
		.fill(
			'<table><tr><td><p>Cell</p></td></tr></table>' +
				'<p>Long editor content</p>'.repeat(100),
		);
	await page.getByRole('button', { name: 'Apply HTML', exact: true }).click();
	await page.getByRole('button', { name: 'Fullscreen', exact: true }).click();
	await expect(page.locator('html')).toHaveCSS('overflow', 'hidden');
	const surface = page.locator('.editra-surface').first();
	const toolbar = page.locator('editra-toolbar').first();
	const toolbarTop = (await toolbar.boundingBox())?.y;
	const backgroundY = await page.evaluate(() => scrollY);
	await surface.hover({ position: { x: 40, y: 200 } });
	await page.mouse.wheel(0, 600);
	await expect.poll(() => surface.evaluate((el) => el.scrollTop)).toBeGreaterThan(0);
	expect(await page.evaluate(() => scrollY)).toBe(backgroundY);
	expect((await toolbar.boundingBox())?.y).toBe(toolbarTop);
	await surface.evaluate((el) => (el.scrollTop = 0));
	await page.locator('.ProseMirror td').first().click();
	await page.getByRole('button', { name: 'Table tools', exact: true }).click();
	const popup = page.getByRole('dialog', { name: 'Table tools', exact: true });
	await expect(popup).toBeVisible();
	const editorTop = await surface.evaluate((el) => el.scrollTop);
	await surface.hover({ position: { x: 20, y: 200 } });
	await page.mouse.wheel(0, 500);
	await page.waitForTimeout(150);
	expect(await surface.evaluate((el) => el.scrollTop)).toBe(editorTop);
	await expect(popup).toBeVisible();
	await popup.hover();
	await page.mouse.wheel(0, 200);
	await expect(popup).toBeVisible();
	await page.keyboard.press('Escape');
	await expect(popup).not.toBeVisible();
	await expect(page.locator('html')).toHaveCSS('overflow', 'hidden');
	await page.getByRole('button', { name: 'Fullscreen', exact: true }).click();
	expect(await page.evaluate(() => document.documentElement.style.overflow)).toBe(original);
});

test('line popup blocks background scrolling and restores it on Escape', async ({ page }) => {
	await page.goto('/');
	const original = await page.evaluate(() => document.documentElement.style.overflow);
	await page.getByRole('button', { name: 'Line settings', exact: true }).click();
	const popup = page.getByRole('dialog', { name: 'Line settings', exact: true });
	await expect(popup).toBeVisible();
	await expect(page.locator('html')).toHaveCSS('overflow', 'hidden');
	const y = await page.evaluate(() => scrollY);
	await page.mouse.move(20, 20);
	await page.mouse.wheel(0, 600);
	await page.waitForTimeout(100);
	expect(await page.evaluate(() => scrollY)).toBe(y);
	await expect(popup).toBeVisible();
	await page.keyboard.press('Escape');
	await expect(popup).not.toBeVisible();
	await expect
		.poll(() => page.evaluate(() => document.documentElement.style.overflow))
		.toBe(original);
});

test('toolbar can be pinned and unpinned and editor scrollbars are thin', async ({ page }) => {
	await page.goto('/');
	await page.getByText('Import HTML', { exact: true }).click();
	await page.getByLabel('HTML input').fill('<p>Scrollable content</p>'.repeat(100));
	await page.getByRole('button', { name: 'Apply HTML', exact: true }).click();
	const pin = page.getByRole('button', { name: 'Sticky toolbar', exact: true });
	const toolbar = page.locator('editra-toolbar').first();
	await expect(pin).toHaveAttribute('aria-pressed', 'false');
	await pin.click();
	await expect(pin).toHaveAttribute('aria-pressed', 'true');
	await expect(toolbar).toHaveCSS('position', 'sticky');
	const editorTop = await page
		.locator('ngx-editra')
		.first()
		.evaluate((el) => el.getBoundingClientRect().top + scrollY);
	await page.evaluate((top) => scrollTo(0, top + 250), editorTop);
	await expect.poll(async () => (await toolbar.boundingBox())?.y ?? -1).toBeGreaterThanOrEqual(0);
	await expect.poll(async () => (await toolbar.boundingBox())?.y ?? -1).toBeLessThan(2);
	await pin.click();
	await expect(pin).toHaveAttribute('aria-pressed', 'false');
	await expect(toolbar).not.toHaveCSS('position', 'sticky');
	const thick = await page
		.locator('ngx-editra')
		.first()
		.evaluate((editor) =>
			Array.from(editor.querySelectorAll('*'))
				.filter((el) => {
					const css = getComputedStyle(el);
					return (
						['auto', 'scroll'].includes(css.overflowX) ||
						['auto', 'scroll'].includes(css.overflowY)
					);
				})
				.filter((el) => getComputedStyle(el).scrollbarWidth !== 'thin')
				.map((el) => el.className),
		);
	expect(thick).toEqual([]);
});
