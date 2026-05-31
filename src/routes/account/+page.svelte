<script lang="ts">
    import NavMenu from "$lib/components/NavMenu.svelte";
    import { authClient } from "$lib/auth-client";
    const session = authClient.useSession();
    const logout = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    window.location.href = "/";
                },
            },
        });
    };
</script>

<main class="grid-center min-h-screen px-6">
    <section class="grid-stack gap-4 text-center">
        <p class="text-base">
            {$session.data?.user.email
                ? `You are logged in as ${$session.data.user.email}`
                : "You are not logged in."}
        </p>
        <div class="grid-auto-fit grid-center-x grid-center-y gap-3">
            <!-- --- hide logout button if not logged in --- -->
            {#if $session.data?.user}
                <button class="small-button border" onclick={logout}>Logout</button>
            {/if}
        </div>

        <NavMenu />
    </section>
</main>
