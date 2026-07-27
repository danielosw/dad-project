
import { getRequestEvent } from '$app/server';
import { env as envpublic } from '$env/dynamic/public';
import { env } from '$env/dynamic/private';
import { betterAuth } from 'better-auth/minimal';
import { drizzleAdapter } from "@better-auth/drizzle-adapter/relations-v2";
import { sveltekitCookies } from 'better-auth/svelte-kit';
import { db } from '$lib/server/db';
import * as schema from '$lib/server/db/schema';
export const auth = betterAuth({
    baseURL: env.PUBLIC_BETTER_AUTH_URL,
    secret: env.BETTER_AUTH_SECRET,
    database: drizzleAdapter(db, { provider: 'pg', schema: schema },),
    emailAndPassword: { enabled: true },
    socialProviders: {
        github: {
            clientId: env.GITHUB_CLIENT_ID,
            clientSecret: env.GITHUB_CLIENT_SECRET,
            redirectUri: `${envpublic.PUBLIC_BETTER_AUTH_URL}/api/auth/callback/github`
        },
        google: {
            clientId: env.GOOGLE_CLIENT_ID,
            clientSecret: env.GOOGLE_CLIENT_SECRET
        }


    },
    plugins: [
        sveltekitCookies(getRequestEvent) // make sure this is the last plugin in the array
    ]
});
