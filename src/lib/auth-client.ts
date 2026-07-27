import { createAuthClient, type SvelteAuthClient } from 'better-auth/svelte';
import { env } from '$env/dynamic/public';
import type { BetterAuthClientOptions } from 'better-auth/types';

const authClient: SvelteAuthClient<BetterAuthClientOptions> = createAuthClient({
    baseURL: env.PUBLIC_BETTER_AUTH_URL
});



export { authClient };