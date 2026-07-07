<script lang="ts">
    import { resolve } from "$app/paths";
</script>

<main class="grid-center min-h-screen px-6">
    <section class="grid-stack gap-4 text-center">
        <h1 class="text-3xl font-semibold">Welcome to the testing site.</h1>
        <p class="">
            Visit <a
                class="font-medium underline"
                href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a
            > to read the documentation
        </p>
        <div class="grid-auto-fit grid-center-x grid-center-y gap-3">
            <a class="small-button border" href={resolve("/login")}>Login</a>
            <a class="small-button border" href={resolve("/account")}>Account</a
            >
            <a class="small-button border" href={resolve("/quiz")}>Quiz</a>
        </div>
    </section>
</main>
