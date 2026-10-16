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
		'NgxEditraComponent',
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
	await expect(page.locator('.guide-prose pre')).toContainText('NgxEditraComponent');
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
	await expect(page.locator('ngx-editra-viewer')).toContainText('A fresh start.');
	await page.getByRole('button', { name: 'MARKDOWN', exact: true }).click();
	await expect(page.locator('.output-panel pre')).toContainText('A fresh start.');
	await expect(page.locator('.output-panel pre')).not.toContainText('<p>');
});

test('task guides explain setup, every feature family, and individual code copying', async ({
	page,
	context,
}) => {
	await context.grantPermissions(['clipboard-read', 'clipboard-write']);
	await page.goto('/guides/features');
	await expect(
		page.getByRole('heading', { name: 'Feature overview', exact: true }),
	).toBeVisible();
	await expect(page.locator('.guide-prose')).toContainText('What is not included');
	await page
		.locator('.guide-prose')
		.getByRole('link', { name: 'Columns and lines', exact: true })
		.first()
		.click();
	await expect(page).toHaveURL(/guides\/layout/);
	await expect(page.locator('.guide-prose')).toContainText('Resize columns');
	await page.goto('/guides/installation');
	await expect(page.locator('.guide-prose')).toContainText('npm install ngx-editra@next');
	await expect(page.locator('.guide-prose')).toContainText('Until publication');
	const firstCode = page.locator('.guide-code-region').first();
	await firstCode.getByRole('button', { name: /Copy code example/ }).click();
	await expect(firstCode.getByRole('status')).toHaveText('Code copied to clipboard.');
	expect(await page.evaluate(() => navigator.clipboard.readText())).toContain(
		'npm install ngx-editra',
	);
	await page.goto('/guides/content');
	await expect(page.locator('.guide-prose')).toContainText('valueChanges');
	await page.getByRole('searchbox').fill('syntax highlighting');
	await expect(page.locator('.search-results')).toContainText('Code blocks');
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

test('copy feedback keeps code blocks, buttons and the page position stable', async ({ page }) => {
	await page.addInitScript(() => {
		Object.defineProperty(navigator, 'clipboard', {
			configurable: true,
			value: { writeText: () => new Promise<void>((resolve) => setTimeout(resolve, 350)) },
		});
	});
	await page.goto('/guides/installation');
	const example = page.locator('.guide-code-region').first();
	const button = example.getByRole('button');
	const geometry = () =>
		example.evaluate((element) => {
			const block = element.getBoundingClientRect();
			const control = element.querySelector('button')!.getBoundingClientRect();
			return {
				height: block.height,
				top: block.top,
				buttonWidth: control.width,
				buttonHeight: control.height,
				buttonLeft: control.left,
				scroll: window.scrollY,
			};
		});
	for (const width of [1280, 390]) {
		await page.setViewportSize({ width, height: 900 });
		await button.scrollIntoViewIfNeeded();
		const before = await geometry();
		await button.click();
		await expect(button).toHaveText('Copying…');
		await expect(button).toBeFocused();
		expect(await geometry()).toEqual(before);
		await expect(button).toHaveText('Copied!');
		expect(await geometry()).toEqual(before);
		await expect(button).toHaveText('Copy code', { timeout: 4000 });
		expect(await geometry()).toEqual(before);
	}
	await page.evaluate(() => {
		Object.defineProperty(navigator.clipboard, 'writeText', {
			value: () => Promise.reject(new Error('Permission denied')),
		});
	});
	const before = await geometry();
	await button.click();
	await expect(example.getByRole('status')).toContainText('Select the code');
	await expect(example.locator('.code-example-language')).toHaveText('Copy manually');
	expect(await geometry()).toEqual(before);
});

test('the entire editor canvas accepts typing with one outer focus border', async ({ page }) => {
	await page.goto('/examples');
	await page.getByRole('button', { name: 'Reset content', exact: true }).click();
	const editor = page.locator('ngx-editra');
	const canvas = editor.locator('.editra-surface');
	const document = canvas.locator('.ProseMirror');
	for (const width of [1280, 390]) {
		await page.setViewportSize({ width, height: 900 });
		const bounds = await canvas.boundingBox();
		if (!bounds) throw new Error('Missing editor canvas');
		await canvas.click({ position: { x: 24, y: bounds.height - 8 } });
		await expect(document).toBeFocused();
		await page.keyboard.type(` Canvas ${width}.`);
		await expect(page.locator('.output-panel pre')).toContainText(`Canvas ${width}.`);
		const size = await canvas.evaluate((surface) => {
			const content = surface.querySelector('.ProseMirror')!;
			return {
				canvas: surface.clientHeight,
				document: content.getBoundingClientRect().height,
			};
		});
		expect(Math.abs(size.canvas - size.document)).toBeLessThanOrEqual(1);
		await expect(document).toHaveCSS('outline-style', 'none');
		await expect(editor).not.toHaveCSS('box-shadow', 'none');
	}
	await editor.screenshot({ path: 'artifacts/editor-full-canvas-mobile.png' });
	await page.getByRole('button', { name: 'Fullscreen', exact: true }).click();
	const fullscreen = await canvas.boundingBox();
	if (!fullscreen) throw new Error('Missing fullscreen canvas');
	await canvas.click({ position: { x: 24, y: fullscreen.height - 8 } });
	await expect(document).toBeFocused();
	await page.keyboard.type(' Fullscreen canvas.');
	await expect(document).toContainText('Fullscreen canvas.');
	await page.getByRole('button', { name: 'Fullscreen', exact: true }).click();
});

test('code copying preserves source, shows local feedback, and handles clipboard denial', async ({
	page,
	context,
}) => {
	await context.grantPermissions(['clipboard-read', 'clipboard-write']);
	await page.goto('/');
	const homeExample = page.locator('app-code-example');
	await homeExample.getByRole('button', { name: 'Copy code example: getting started' }).click();
	// Windows clipboard storage normalizes line endings to CRLF.
	expect((await page.evaluate(() => navigator.clipboard.readText())).replace(/\r\n/g, '\n')).toBe(
		await homeExample.locator('code').textContent(),
	);
	await expect(homeExample.getByRole('button')).toHaveText('Copied!');
	await expect(homeExample.getByRole('button')).toHaveText('Copy code', { timeout: 4000 });
	await page.goto('/guides/installation');
	const example = page.locator('.guide-code-region').first();
	await expect(example.locator('.code-example-language')).toHaveText('sh');
	await example.getByRole('button').focus();
	await page.keyboard.press('Enter');
	expect((await page.evaluate(() => navigator.clipboard.readText())).replace(/\r\n/g, '\n')).toBe(
		'npm install ngx-editra\n',
	);
	await expect(example.getByRole('status')).toHaveText('Code copied to clipboard.');
	await page.evaluate(() => {
		Object.defineProperty(navigator.clipboard, 'writeText', {
			configurable: true,
			value: () => Promise.reject(new Error('Permission denied')),
		});
	});
	await example.getByRole('button').click();
	await expect(example.getByRole('status')).toContainText('Select the code');
	await expect(example.getByRole('button')).toBeEnabled();
	await expect(example.locator('code')).toHaveText('npm install ngx-editra\n');
	await page.goto('/guides/quick-start');
	await expect(page.locator('.code-example-status')).toBeEmpty();
	await page.setViewportSize({ width: 390, height: 844 });
	const code = page.locator('.guide-code-region pre').first();
	await code.scrollIntoViewIfNeeded();
	await code.evaluate((element) => {
		element.scrollLeft = element.scrollWidth;
	});
	await expect(page.locator('.guide-code-region button').first()).toBeInViewport();
	expect(await accessibility(page)).toEqual([]);
	await page.screenshot({ path: 'artifacts/documentation-copy-mobile.png', fullPage: true });
});
