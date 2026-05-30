<script lang="ts">
    import NavMenu from "$lib/components/NavMenu.svelte";
    import { authClient } from "$lib/auth-client";
    import { redirect } from "@sveltejs/kit";
    const session = authClient.useSession();
    const data = $session.data;
    const logout = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    window.location.href = "/";
                },
            },
        });
    };
    if (data == null) {
        redirect(307, "/login");
    }
</script>

<main class="grid-center min-h-screen px-6">
    <section class="grid-stack gap-4 text-center">
        <p class="text-base">
            {data?.user.email
                ? `You are logged in as ${data.user.email}`
                : "You are not logged in."}
        </p>
        <div class="grid-auto-fit grid-center-x grid-center-y gap-3">
            <!-- --- hide logout button if not logged in --- -->
            <button class="small-button border" onclick={logout}>Logout</button>
        </div>

        <NavMenu />
    </section>
</main>
