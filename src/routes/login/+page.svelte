<script lang="ts">
    import NavMenu from "$lib/components/NavMenu.svelte";
    import { createAuthClient } from "better-auth/client";
    import { authClient } from "$lib/auth-client";
    const signInWithGitHub = async () => {
        await authClient.signIn.social({
            /**
             * The social provider ID
             * @example "github", "google", "apple"
             */
            provider: "github",
            /**
             * A URL to redirect after the user authenticates with the provider
             * @default "/"
             */
            callbackURL: "/account",
            /**
             * A URL to redirect if an error occurs during the sign in process
             */
            errorCallbackURL: "/error",
            /**
             * A URL to redirect if the user is newly registered
             */
            newUserCallbackURL: "/",
            /**
             * disable the automatic redirect to the provider.
             * @default false
             */
            disableRedirect: false,
        });
    };
</script>

<NavMenu />
<main class="grid-center min-h-screen px-6">
    <section class="grid-stack gap-4 text-center">
        <h1 class="text-3xl font-semibold">Login</h1>
        <p class="text-base">This is the login page.</p>
        <button class="medium-button" onclick={signInWithGitHub}
            >Sign in with GitHub</button
        >
    </section>
</main>
