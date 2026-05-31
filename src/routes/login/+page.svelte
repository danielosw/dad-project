<script lang="ts">
    import NavMenu from "$lib/components/NavMenu.svelte";
    import { signIn } from "$lib/auth-client";
    const signInWithGitHub = async () => {
        await signIn("/");
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
