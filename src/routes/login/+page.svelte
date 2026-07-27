<script lang="ts">
    import { authClient } from "$lib/auth-client";
    import { invalidate } from "$app/navigation";
    const loginResult = async () => {
        // make back go to home page after login, and invalidate the account and quiz pages so they will be reloaded with the new user data

        history.replaceState(null, "", "/");
        invalidate("/account");
        invalidate("/");
        invalidate("/quiz");
    };

    const signInWithGitHub = async () => {
        await authClient.signIn.social({
            provider: "github",

            callbackURL: "/account",

            errorCallbackURL: "/error",

            newUserCallbackURL: "/account",

            disableRedirect: false,
        });
        await loginResult();
    };
    const signInWithGoogle = async () => {
        await authClient.signIn.social({
            provider: "google",

            callbackURL: "/account",

            errorCallbackURL: "/error",

            newUserCallbackURL: "/account",

            disableRedirect: false,
        });
        await loginResult();
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
