
import { getRequestEvent } from '$app/server';
import { env } from '$env/dynamic/private';
import { PUBLIC_BETTER_AUTH_URL } from '$env/static/public';
import { betterAuth } from 'better-auth/minimal';
import { drizzleAdapter } from "@better-auth/drizzle-adapter/relations-v2";
import { sveltekitCookies } from 'better-auth/svelte-kit';
import { db } from '$lib/server/db';

export const auth = betterAuth({
    baseURL: PUBLIC_BETTER_AUTH_URL,
    secret: env.BETTER_AUTH_SECRET,
    database: drizzleAdapter(db, { provider: 'pg' }),
    emailAndPassword: { enabled: true },
    socialProviders: {
        github: {
            clientId: env.GITHUB_CLIENT_ID,
            clientSecret: env.GITHUB_CLIENT_SECRET
        }

    },
    plugins: [
        sveltekitCookies(getRequestEvent) // make sure this is the last plugin in the array
    ]
});
