import { describe, expect, it } from 'vitest';
import { disallowedPathsForUnauthenticatedUsers } from '$lib/server/static/disallowed';

describe('disallowedPathsForUnauthenticatedUsers', () => {
	it('includes the account route', () => {
		expect(disallowedPathsForUnauthenticatedUsers).toContain('/account');
	});

	it('contains no duplicate paths', () => {
		const uniqueEntries = new Set(disallowedPathsForUnauthenticatedUsers);

		expect(uniqueEntries.size).toBe(disallowedPathsForUnauthenticatedUsers.length);
	});
});
