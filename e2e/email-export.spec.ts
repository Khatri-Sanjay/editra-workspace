import { test, expect } from '@playwright/test';

test('email export previews safe standalone HTML and copies both message alternatives', async ({
	page,
}) => {
	await page.goto('/');
	await page.getByText('Import HTML', { exact: true }).click();
	await page
		.getByLabel('HTML input')
		.fill(
			'<h2>Hello email</h2><p>Welcome <strong>reader</strong>.</p><iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ"></iframe><script>alert(1)</script>',
		);
	await page.getByRole('button', { name: 'Apply HTML', exact: true }).click();
	await page.getByText('Email export', { exact: true }).click();
	const panel = page.locator('app-email-export');
	await expect(panel).toContainText('Embedded videos were replaced with links.');
	const preview = panel.locator('iframe');
	await expect(preview).toHaveAttribute('sandbox', '');
	const frame = page.frameLocator('iframe[title="Email export browser preview"]');
	await expect(frame.getByRole('heading', { name: 'Hello email' })).toBeVisible();
	await expect(frame.getByRole('link', { name: 'Watch video' })).toBeVisible();
	await expect(frame.locator('script,iframe,video,button')).toHaveCount(0);
	await page.evaluate(() =>
		Object.defineProperty(navigator, 'clipboard', {
			configurable: true,
			value: {
				writeText: async (value: string) => {
					document.documentElement.dataset['emailCopy'] = value;
				},
			},
		}),
	);
	await panel.getByRole('button', { name: 'Copy email HTML' }).click();
	await expect(panel.getByRole('status')).toHaveText('Email html copied.');
	const html = await page.evaluate(() => document.documentElement.dataset['emailCopy']);
	expect(html).toContain('<!doctype html>');
	expect(html).not.toMatch(/<iframe|<script|<video/);
	await panel.getByRole('button', { name: 'Copy email text' }).click();
	expect(await page.evaluate(() => document.documentElement.dataset['emailCopy'])).toContain(
		'Welcome reader.',
	);
	await page.setViewportSize({ width: 390, height: 844 });
	await preview.scrollIntoViewIfNeeded();
	const box = await preview.boundingBox();
	expect(box?.width).toBeLessThanOrEqual(390);
	await page.screenshot({ path: 'artifacts/email-export-mobile.png' });
});
