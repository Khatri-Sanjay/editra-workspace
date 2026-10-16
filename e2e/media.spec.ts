import { test, expect } from '@playwright/test';

test('video insertion, replacement, canonical URLs and keyboard resizing', async ({ page }) => {
	await page.route('https://www.youtube-nocookie.com/**', (route) =>
		route.fulfill({
			contentType: 'text/html',
			body: '<!doctype html><title>Mock provider frame</title><p>Video preview</p>',
		}),
	);
	await page.route('https://player.vimeo.com/**', (route) =>
		route.fulfill({
			contentType: 'text/html',
			body: '<!doctype html><title>Mock Vimeo</title><p>Video preview</p>',
		}),
	);
	await page.goto('/');
	await expect(page.locator('.ProseMirror').first()).toBeVisible();
	await page.locator('.ProseMirror').first().click();
	await page.keyboard.press('ControlOrMeta+a');
	await page.keyboard.insertText('Video resizing');
	await page.getByRole('button', { name: 'video', exact: true }).click();
	const dialog = page.getByRole('dialog');
	await dialog.getByLabel('URL', { exact: true }).fill('https://youtu.be/dQw4w9WgXcQ');
	await dialog.getByRole('button', { name: 'Apply', exact: true }).click();
	await expect(page.locator('.ProseMirror iframe')).toHaveAttribute(
		'src',
		'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
	);
	await page
		.locator('.editra-media-view')
		.filter({ has: page.locator('video,iframe') })
		.click();
	await page.getByRole('button', { name: 'video', exact: true }).click();
	await expect(dialog.getByLabel('URL', { exact: true })).toHaveValue(
		'https://youtu.be/dQw4w9WgXcQ',
	);
	await dialog.getByLabel('URL', { exact: true }).fill('https://vimeo.com/12345');
	await dialog.getByRole('button', { name: 'Apply', exact: true }).click();
	await expect(page.locator('.ProseMirror iframe')).toHaveCount(1);
	await expect(page.locator('.ProseMirror iframe')).toHaveAttribute(
		'src',
		'https://player.vimeo.com/video/12345',
	);
	const handle = page.getByRole('button', { name: 'Resize video; use arrow keys' });
	await handle.focus();
	await handle.press('ArrowRight');
	await expect(page.locator('.ProseMirror iframe')).toHaveAttribute('width', '650');
	await expect(page.locator('.output pre')).toContainText('https://vimeo.com/12345');
});
