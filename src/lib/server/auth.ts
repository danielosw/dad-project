
import { getRequestEvent } from '$app/server';
import { PUBLIC_BETTER_AUTH_URL } from '$env/static/public';
import { BETTER_AUTH_SECRET, GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } from '$env/static/private';
import { betterAuth } from 'better-auth/minimal';
import { drizzleAdapter } from "@better-auth/drizzle-adapter/relations-v2";
import { sveltekitCookies } from 'better-auth/svelte-kit';
import { db } from '$lib/server/db';

export const auth = betterAuth({
    baseURL: PUBLIC_BETTER_AUTH_URL,
    secret: BETTER_AUTH_SECRET,
    database: drizzleAdapter(db, { provider: 'pg' }),
    emailAndPassword: { enabled: true },
    socialProviders: {
        github: {
            clientId: GITHUB_CLIENT_ID,
            clientSecret: GITHUB_CLIENT_SECRET
        }

    },
    plugins: [
        sveltekitCookies(getRequestEvent) // make sure this is the last plugin in the array
    ]
});
