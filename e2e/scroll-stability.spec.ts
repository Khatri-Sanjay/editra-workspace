import { test, expect } from '@playwright/test';
test.use({
	launchOptions: {
		...(process.env['EDITRA_BROWSER'] ? { executablePath: process.env['EDITRA_BROWSER'] } : {}),
		ignoreDefaultArgs: ['--hide-scrollbars'],
		args: ['--disable-features=OverlayScrollbar,OverlayScrollbars'],
	},
});
test('opening toolbar popups keeps the page layout and restores its scrollbar styles', async ({
	page,
}) => {
	await page.goto('/');
	await page.addStyleTag({ content: 'html { overflow-y:scroll; } body { padding-right:3px; }' });
	const before = await page
		.getByRole('region', { name: 'Reactive Forms example', exact: true })
		.boundingBox();
	const styles = await page.evaluate(() => ({
		gutter: document.documentElement.style.scrollbarGutter,
		padding: document.body.style.paddingRight,
		overflow: document.documentElement.style.overflow,
	}));
	await page.getByRole('button', { name: 'Line settings', exact: true }).click();
	const during = await page
		.getByRole('region', { name: 'Reactive Forms example', exact: true })
		.boundingBox();
	expect(Math.abs((before?.x ?? 0) - (during?.x ?? 0))).toBeLessThan(1);
	expect(Math.abs((before?.width ?? 0) - (during?.width ?? 0))).toBeLessThan(1);
	await page.keyboard.press('Escape');
	await expect
		.poll(() =>
			page.evaluate(() => ({
				gutter: document.documentElement.style.scrollbarGutter,
				padding: document.body.style.paddingRight,
				overflow: document.documentElement.style.overflow,
			})),
		)
		.toEqual(styles);
	await page.getByRole('button', { name: 'Choose text colour', exact: true }).click();
	const palette = await page
		.getByRole('region', { name: 'Reactive Forms example', exact: true })
		.boundingBox();
	expect(Math.abs((before?.x ?? 0) - (palette?.x ?? 0))).toBeLessThan(1);
	expect(Math.abs((before?.width ?? 0) - (palette?.width ?? 0))).toBeLessThan(1);
	await page.keyboard.press('Escape');
	const after = await page
		.getByRole('region', { name: 'Reactive Forms example', exact: true })
		.boundingBox();
	expect(Math.abs((before?.width ?? 0) - (after?.width ?? 0))).toBeLessThan(1);
});
