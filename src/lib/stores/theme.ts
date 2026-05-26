import { browser } from '$app/environment';
import { writable } from 'svelte/store';

export type ThemePreference = 'light' | 'dark' | 'system';

const STORAGE_KEY = 'theme-preference';
const MEDIA_QUERY = '(prefers-color-scheme: dark)';

const isThemePreference = (value: string | null): value is ThemePreference =>
	value === 'light' || value === 'dark' || value === 'system';

const getInitialPreference = (): ThemePreference => {
	if (!browser) {
		return 'system';
	}

	const stored = localStorage.getItem(STORAGE_KEY);
	return isThemePreference(stored) ? stored : 'system';
};

const getSystemTheme = (): 'light' | 'dark' =>
	window.matchMedia(MEDIA_QUERY).matches ? 'dark' : 'light';

const applyTheme = (preference: ThemePreference) => {
	const resolved = preference === 'system' ? getSystemTheme() : preference;
	document.documentElement.dataset.theme = resolved;
};

export const themePreference = writable<ThemePreference>(getInitialPreference());

let currentPreference: ThemePreference = 'system';

if (browser) {
	const media = window.matchMedia(MEDIA_QUERY);
	const handleSystemChange = () => {
		if (currentPreference === 'system') {
			applyTheme('system');
		}
	};

	themePreference.subscribe((value) => {
		currentPreference = value;
		localStorage.setItem(STORAGE_KEY, value);
		applyTheme(value);
	});
	media.addEventListener('change', handleSystemChange);
}

export const setTheme = (preference: ThemePreference) => themePreference.set(preference);

export const toggleTheme = () => {
	themePreference.update((preference) => {
		if (preference === 'system') {
			return getSystemTheme();
		}

		return preference === 'dark' ? 'light' : 'dark';
	});
};

export const themeOptions: Array<{ value: ThemePreference; label: string }> = [
	{ value: 'system', label: 'System' },
	{ value: 'light', label: 'Light' },
	{ value: 'dark', label: 'Dark' }
];
