<script lang="ts">
    import { resolve } from "$app/paths";
</script>

<svelte:head>
    <title>Main Page</title>
</svelte:head>
<main class="grid-center min-h-screen px-6">
    <section class="grid-stack gap-4 text-center">
        <h1 class="text-3xl font-semibold">Welcome to the testing site.</h1>

        <div class="grid-auto-fit grid-center-x grid-center-y gap-3">
            <a class="small-button border" href={resolve("/login")}>Login</a>
            <a class="small-button border" href={resolve("/account")}>Account</a
            >
            <a class="small-button border" href={resolve("/quiz")}>Quiz</a>
        </div>
    </section>
</main>
