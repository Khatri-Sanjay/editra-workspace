import { test, expect } from '@playwright/test';
test('find and replace reports matches, navigates and replaces without skipping', async ({
	page,
}) => {
	await page.goto('/');
	const surface = page.locator('.ProseMirror').first();
	await surface.click();
	await page.keyboard.press('ControlOrMeta+a');
	await page.keyboard.insertText('cat cat cat');
	await page.getByRole('button', { name: 'find', exact: true }).click();
	const dialog = page.getByRole('dialog', { name: 'Edit find', exact: true });
	await expect(dialog.getByRole('button', { name: 'Next match', exact: true })).toBeDisabled();
	await dialog.getByLabel('Find', { exact: true }).fill('cat');
	await expect(dialog.getByRole('status')).toHaveText('3 matches found.');
	await dialog.screenshot({ path: 'artifacts/find-replace-popup.png' });
	await dialog.getByLabel('Find', { exact: true }).press('Enter');
	await expect(dialog.getByRole('status')).toHaveText('1 of 3 matches');
	await dialog.getByLabel('Replace with', { exact: true }).fill('dog');
	await dialog.getByRole('button', { name: 'Replace current', exact: true }).click();
	await expect(surface).toHaveText('dog cat cat');
	await expect(dialog.getByRole('status')).toHaveText('1 of 2 matches');
	await dialog.getByRole('button', { name: 'Replace all', exact: true }).click();
	await expect(surface).toHaveText('dog dog dog');
	await expect(dialog.getByRole('status')).toHaveText('No matches found.');
	await expect(dialog.getByRole('button', { name: 'Replace all', exact: true })).toBeDisabled();
	await expect(dialog.getByRole('button', { name: 'Replace all', exact: true })).toHaveClass(
		/button-primary/,
	);
	await dialog.getByRole('button', { name: 'Close', exact: true }).click();
	await expect(dialog).not.toBeVisible();
	await expect(page.locator('html')).not.toHaveCSS('overflow', 'hidden');
});
