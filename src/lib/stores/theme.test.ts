import { get } from 'svelte/store';
import { beforeEach, describe, expect, it } from 'vitest';
import { setTheme, themeOptions, themePreference } from '$lib/stores/theme';

describe('theme store', () => {
	beforeEach(() => {
		setTheme('system');
	});

	it('starts in the system preference on the server', () => {
		expect(get(themePreference)).toBe('system');
	});

	it('updates the preference when setTheme is called', () => {
		setTheme('dark');

		expect(get(themePreference)).toBe('dark');
	});

	it('exposes the available theme options', () => {
		expect(themeOptions).toEqual([
			{ value: 'system', label: 'System' },
			{ value: 'light', label: 'Light' },
			{ value: 'dark', label: 'Dark' }
		]);
	});
});
