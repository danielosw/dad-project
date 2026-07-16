<script lang="ts">
    import { authClient } from "$lib/auth-client";
    import type { PageData } from "./$types";
    import { resolve } from "$app/paths";
    import { goto } from "$app/navigation";

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

<main class="grid-center min-h-screen px-6">
    <section class="grid-stack gap-4 text-center">
        <p class="">
            {data.user?.email
                ? `You are logged in as ${data.user.email}`
                : "You are not logged in."}
        </p>
        <div class="grid-auto-fit grid-center-x grid-center-y gap-3">
            <!-- --- hide logout button if not logged in --- -->
            {#if data.user}
                <button
                    type="button"
                    class="small-button border button-link"
                    onclick={() => goto(resolve("/account/past_quizzes"))}
                >
                    Past Quizzes
                </button>
                <button
                    class="small-button border button-link"
                    type="button"
                    onclick={logout}
                >
                    Logout
                </button>
            {/if}
        </div>
    </section>
</main>
