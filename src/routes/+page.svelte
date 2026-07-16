<script lang="ts">
    import { goto } from "$app/navigation";
    import { resolve } from "$app/paths";
</script>

<main class="grid-center min-h-screen px-6">
    <section class="grid-stack gap-4 text-center">
        <h1 class="text-3xl font-semibold">Welcome to the testing site.</h1>

        <div class="grid-auto-fit grid-center-x grid-center-y gap-3">
            <button
                type="button"
                class="small-button border button-link"
                onclick={() => goto(resolve("/login"))}
            >
                Login
            </button>
            <button
                type="button"
                class="small-button border button-link"
                onclick={() => goto(resolve("/account"))}
            >
                Account
            </button>
            <button
                type="button"
                class="small-button border button-link"
                onclick={() => goto(resolve("/quiz"))}
            >
                Quiz
            </button>
        </div>
    </section>
</main>
