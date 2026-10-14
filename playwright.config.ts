import { defineConfig } from '@playwright/test';

export default defineConfig({
	testDir: './e2e',
	testIgnore: 'documentation.spec.ts',
	outputDir: process.env['EDITRA_TEST_OUTPUT'] ?? 'test-results/playground',
	timeout: 30_000,
	workers: 1,
	reporter: [
		['list'],
		['json', { outputFile: process.env['EDITRA_E2E_REPORT'] ?? 'artifacts/e2e-results.json' }],
	],
	use: {
		baseURL: process.env['EDITRA_BASE_URL'] ?? 'http://localhost:4000',
		browserName: 'chromium',
		launchOptions: {
			...(process.env['EDITRA_BROWSER']
				? { executablePath: process.env['EDITRA_BROWSER'] }
				: {}),
		},
		trace: 'retain-on-failure',
	},
	webServer: {
		command: process.env['EDITRA_SERVER_COMMAND'] ?? 'node dist/playground/server/server.mjs',
		url: process.env['EDITRA_BASE_URL'] ?? 'http://localhost:4000',
		reuseExistingServer: false,
		timeout: 60_000,
	},
});
