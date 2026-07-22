import { defineConfig } from 'vitest/config';
import { playwright } from '@vitest/browser-playwright';
import { enhancedImages } from '@sveltejs/enhanced-img';
import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig({
	build: {
		minify: true,
		sourcemap: false,
		license: true,
		rolldownOptions
			: {
			output
				: {
				postBanner
					:
					'/* See licenses of bundled dependencies at https://seashell-app-y7zvq.ondigitalocean.app/.vite/licenses.md */',
			},
		},

	},
	plugins: [enhancedImages(), sveltekit()],


	test: {
		expect: { requireAssertions: true },
		projects: [
			{
				extends: './vite.config.ts',
				test: {
					name: 'client',
					browser: {
						enabled: true,
						provider: playwright(),
						instances: [{ browser: 'chromium', headless: true }]
					},
					include: ['src/**/*.svelte.{test,spec}.{js,ts}'],
					exclude: ['src/lib/server/**']
				}
			},

			{
				extends: './vite.config.ts',
				test: {
					name: 'server',
					environment: 'node',
					include: ['src/**/*.{test,spec}.{js,ts}'],
					exclude: ['src/**/*.svelte.{test,spec}.{js,ts}']
				}
			}
		]
	}
});
