<script lang="ts">
    import { authClient } from "$lib/auth-client";
    import type { PageData } from "./$types";
    import { resolve } from "$app/paths";

    const { data } = $props<{ data: PageData }>();

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

<svelte:head>
    <title>Account Page</title>
</svelte:head>
<main class="main-content">
    <section class="main-section">
        <p class="">
            {data.user?.email
                ? `You are logged in as ${data.user.email}`
                : "You are not logged in."}
        </p>
        <div class="stacker">
            <!-- --- hide logout button if not logged in --- -->
            {#if data.user}
                <a
                    class="small-button border"
                    href={resolve("/account/past_quizzes")}>Past Quizzes</a
                >
                <button class="small-button border button-link" onclick={logout}
                    >Logout</button
                >
            {/if}
        </div>
    </section>
</main>
