<script lang="ts">
    import { resolve } from "$app/paths";
</script>

<svelte:head>
    <title>Main Page</title>
</svelte:head>
<main class="main-content">
    <section class="main-section">
        <h1 class="main-header">Welcome to the testing site.</h1>

        <div class="stacker">
            <a class="small-button border" href={resolve("/login")}>Login</a>
            <a class="small-button border" href={resolve("/account")}>Account</a
            >
            <a class="small-button border" href={resolve("/quiz/setup")}>Quiz</a
            >
        </div>
    </section>
</main>
