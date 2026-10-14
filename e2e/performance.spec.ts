import { test, expect } from '@playwright/test';
import { writeFile } from 'node:fs/promises';

test('large document and large table browser measurements', async ({ page }) => {
	await page.goto('/');
	await expect(page.locator('.ProseMirror').first()).toBeVisible();
	await page.getByText('Import HTML', { exact: true }).click();
	const results: { name: string; milliseconds: number; nodes: number }[] = [];
	for (const scenario of [
		{
			name: '1000 paragraphs',
			html: '<p>A long document with <strong>formatted text</strong>.</p>'.repeat(1000),
			selector: ':scope > p',
			nodes: 1000,
		},
		{
			name: '100 rows by 20 columns',
			html:
				'<table>' +
				Array.from(
					{ length: 100 },
					(_, row) =>
						'<tr>' +
						Array.from(
							{ length: 20 },
							(_, col) => `<td><p>Cell ${row}, ${col}</p></td>`,
						).join('') +
						'</tr>',
				).join('') +
				'</table>',
			selector: 'td',
			nodes: 2000,
		},
	]) {
		await page.getByLabel('HTML input').fill(scenario.html);
		const start = await page.evaluate(() => performance.now());
		await page.getByRole('button', { name: 'Apply HTML', exact: true }).click();
		await expect(page.locator('.ProseMirror').first().locator(scenario.selector)).toHaveCount(
			scenario.nodes,
		);
		await page.evaluate(
			() =>
				new Promise<void>((resolve) =>
					requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
				),
		);
		results.push({
			name: scenario.name,
			milliseconds: (await page.evaluate(() => performance.now())) - start,
			nodes: scenario.nodes,
		});
	}
	await writeFile(
		'artifacts/browser-performance.json',
		JSON.stringify(
			{
				browser: 'Chromium',
				note: 'End-to-end import-to-render timing includes automation and paint scheduling; not a universal benchmark.',
				results,
			},
			null,
			2,
		),
	);
});
