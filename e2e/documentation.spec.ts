import { test, expect } from '@playwright/test';
import { resolve } from 'node:path';
import type { Page } from '@playwright/test';
import { readFile } from 'node:fs/promises';

async function accessibility(page: Page): Promise<unknown[]> {
	await page.addScriptTag({ path: resolve('node_modules/axe-core/axe.min.js') });
	return page.evaluate(async () => {
		const win = window as unknown as { axe: { run: () => Promise<{ violations: unknown[] }> } };
		return (await win.axe.run()).violations;
	});
}

test('every documented guide has a prerendered page and code is copyable', async ({
	page,
	request,
	context,
}) => {
	const routes = (await readFile('apps/documentation/prerender-routes.txt', 'utf8'))
		.trim()
		.split(/\r?\n/);
	for (const route of routes.filter((route) => route.startsWith('/guides/'))) {
		const response = await request.get(route);
		expect(response.ok(), route).toBe(true);
		expect(await response.text(), route).toContain('guide-prose');
	}
	await context.grantPermissions(['clipboard-read', 'clipboard-write']);
	await page.goto('/guides/quick-start');
	await page.getByRole('button', { name: 'Copy code examples' }).click();
	await expect(page.locator('.copy-status')).toHaveText('Code examples copied.');
	expect(await page.evaluate(() => navigator.clipboard.readText())).toContain(
		'EditraEditorComponent',
	);
	await page.goto('/guides/api');
	const anchor = page.locator('.on-this-page a[href*="#"]').first();
	await expect(anchor).toBeVisible();
	await anchor.click();
	await expect(page).toHaveURL(/#/);
	const fragment = new URL(page.url()).hash.slice(1);
	await expect(page.locator(`[id="${fragment}"]`)).toBeVisible();
});

test('docs render on the server, navigate, search, and persist theme', async ({
	page,
	request,
}) => {
	const errors: string[] = [];
	page.on('pageerror', (error) => errors.push(error.message));
	const response = await request.get('/guides/angular-forms');
	expect(response.ok()).toBe(true);
	expect(await response.text()).toContain('ControlValueAccessor');
	await page.goto('/');
	await expect(
		page.getByRole('heading', { name: 'Your content. Your editor. Your way.' }),
	).toBeVisible();
	await page.getByRole('link', { name: 'Start building' }).click();
	await expect(page).toHaveURL(/guides\/quick-start/);
	await expect(page.locator('.guide-prose h1')).toHaveText('Quick start');
	await expect(page.locator('.guide-prose pre')).toContainText('EditraEditorComponent');
	await page.getByRole('searchbox').fill('javascript/data/file');
	await expect(page.locator('.search-results')).toContainText('Security');
	await page
		.locator('.search-results')
		.getByRole('link', { name: 'Security', exact: false })
		.click();
	await expect(page).toHaveURL(/guides\/security/);
	await page.getByRole('button', { name: 'Toggle dark theme' }).click();
	await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
	await page.reload();
	await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
	await page.goto('/guides/not-a-real-page');
	await expect(page.getByRole('heading', { name: "That page isn't here." })).toBeVisible();
	expect(errors).toEqual([]);
});

test('live example edits real form values and handles disabled, read-only, and reset', async ({
	page,
}) => {
	await page.goto('/examples');
	const surface = page.locator('.ProseMirror');
	await expect(surface).toBeVisible();
	await surface.click();
	await page.keyboard.press('Control+End');
	await page.keyboard.type(' Documentation test.');
	await expect(page.locator('.output-panel pre')).toContainText('Documentation test.');
	await page.getByRole('button', { name: 'TEXT', exact: true }).click();
	await expect(page.locator('.output-panel pre')).not.toContainText('<p>');
	await page.getByRole('button', { name: 'Read-only off', exact: true }).click();
	await expect(surface).toHaveAttribute('contenteditable', 'false');
	await page.getByRole('button', { name: 'Read-only on', exact: true }).click();
	await page.getByRole('button', { name: 'Disable editor', exact: true }).click();
	await expect(surface).toHaveAttribute('contenteditable', 'false');
	await page.getByRole('button', { name: 'Enable editor', exact: true }).click();
	await expect(surface).toHaveAttribute('contenteditable', 'true');
	await page.getByRole('button', { name: 'Reset content', exact: true }).click();
	await expect(surface).toHaveText('A fresh start.');
});

test('mobile navigation and document pages remain accessible', async ({ page }) => {
	await page.goto('/');
	expect(await accessibility(page)).toEqual([]);
	await page.screenshot({ path: 'artifacts/documentation-desktop.png', fullPage: true });
	await page.setViewportSize({ width: 390, height: 844 });
	await page.getByRole('button', { name: 'Menu', exact: true }).click();
	await page.locator('nav').getByRole('link', { name: 'Public API', exact: true }).click();
	await expect(page.locator('.guide-prose h1')).toHaveText('Public API');
	await expect(page.getByRole('button', { name: 'Menu', exact: true })).toHaveAttribute(
		'aria-expanded',
		'false',
	);
	expect(
		await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
	).toBe(true);
	expect(await accessibility(page)).toEqual([]);
	await page.screenshot({ path: 'artifacts/documentation-mobile.png', fullPage: true });
});
