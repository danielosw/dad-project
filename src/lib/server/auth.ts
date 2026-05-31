
import { getRequestEvent } from '$app/server';
import { env } from '$env/dynamic/private';
import { betterAuth } from 'better-auth/minimal';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { sveltekitCookies } from 'better-auth/svelte-kit';
import { db } from '$lib/server/db';

const requireEnv = (name: string, value: string | undefined): string => {
	if (!value) {
		throw new Error(`Missing required environment variable: ${name}`);
	}

	return value;
};

const githubClientId = env.GITHUB_CLIENT_ID;
const githubClientSecret = env.GITHUB_CLIENT_SECRET;
const socialProviders =
	githubClientId && githubClientSecret
		? {
				github: {
					clientId: githubClientId,
					clientSecret: githubClientSecret
				}
			}
		: {};

export const auth = betterAuth({
	baseURL: requireEnv('BETTER_AUTH_URL', env.BETTER_AUTH_URL),
	secret: requireEnv('BETTER_AUTH_SECRET', env.BETTER_AUTH_SECRET),
	database: drizzleAdapter(db, { provider: 'pg' }),
	emailAndPassword: { enabled: true },
	socialProviders,
	plugins: [
		sveltekitCookies(getRequestEvent) // make sure this is the last plugin in the array
	]
});
