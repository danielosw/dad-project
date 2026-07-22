<script lang="ts">
    import { authClient } from "$lib/auth-client";
    import { invalidate } from "$app/navigation";
    const signInWithGitHub = async () => {
        await authClient.signIn.social({
            provider: "github",

            callbackURL: "/account",

            errorCallbackURL: "/error",

            newUserCallbackURL: "/account",

            disableRedirect: false,
        });
        invalidate("/account");
        invalidate("/quiz");
    };
    const signInWithGoogle = async () => {
        await authClient.signIn.social({
            provider: "google",

            callbackURL: "/account",

            errorCallbackURL: "/error",

            newUserCallbackURL: "/account",

            disableRedirect: false,
        });
        invalidate("/account");
        invalidate("/quiz");
    };
</script>

<svelte:head>
    <title>Login Page</title>
</svelte:head>
<main class="main-content">
    <section class="main-section">
        <h1 class="main-header">Login</h1>
        <p class="">This is the login page.</p>
        <button class="medium-button button-link" onclick={signInWithGitHub}
            >Sign in with GitHub</button
        >
        <button class="medium-button button-link" onclick={signInWithGoogle}
            >Sign in with Google</button
        >
    </section>
</main>
