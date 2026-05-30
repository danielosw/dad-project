import type { Handle } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';
import { building } from '$app/environment';
import { auth } from '$lib/server/auth';
import { svelteKitHandler } from 'better-auth/svelte-kit';
import { disallowedPathsForUnauthenticatedUsers } from '$lib/server/static/disallowed';
const handleBetterAuth: Handle = async ({ event, resolve }) => {
	const session = await auth.api.getSession({ headers: event.request.headers });

	if (session != null) {
		event.locals.session = session.session;
		event.locals.user = session.user;
	}
	// if we do not have a logged in user, disallow acces to account page and redirect to login page
	else if (disallowedPathsForUnauthenticatedUsers.includes(event.url.pathname)) {
		throw redirect(307, '/login');
	}
	return svelteKitHandler({ event, resolve, auth, building });
};

export const handle: Handle = handleBetterAuth;
