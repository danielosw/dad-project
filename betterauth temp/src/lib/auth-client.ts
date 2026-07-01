import { createAuthClient } from 'better-auth/svelte';

const authClient = createAuthClient();

const signIn = async (callbackURL = '/demo/better-auth') => {
    await authClient.signIn.social({
        provider: 'github',
        callbackURL
    });
};

export { authClient, signIn };