<script lang="ts">
    import NavMenu from "$lib/components/NavMenu.svelte";
    /**const signInWithGitHub = async () => {
        await authClient.signIn.social({
  
            provider: "github",
 
            callbackURL: "/",
  
            errorCallbackURL: "/error",
 
            newUserCallbackURL: "/",

            disableRedirect: false,
        });
    };*/
</script>

<NavMenu />
<main class="grid-center min-h-screen px-6">
    <section class="grid-stack gap-4 text-center">
        <h1 class="text-3xl font-semibold">Login</h1>
        <p class="text-base">This is the login page.</p>
        <!-- <button class="medium-button" onclick={signInWithGitHub}
            >Sign in with GitHub</button
        > -->
    </section>
</main>
