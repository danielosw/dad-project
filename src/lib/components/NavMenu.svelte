<script lang="ts">
    import { goto } from "$app/navigation";
    import { resolve } from "$app/paths";
    import Dropdown from "$lib/components/DropDown.svelte";
    import ThemeSwitcher from "$lib/components/ThemeSwitcher.svelte";

    type NavUser = {
        email?: string | null;
    } | null;

    let { user = null }: { user?: NavUser } = $props();
</script>

<Dropdown>
    <li><ThemeSwitcher /></li>
    <li>
        <button
            type="button"
            class="small-button button-link"
            onclick={() => goto(resolve("/"))}
        >
            home
        </button>
    </li>
    {#if user}
        <li>
            <button
                type="button"
                class="small-button button-link"
                onclick={() => goto(resolve("/account"))}
            >
                account
            </button>
        </li>
        <li>
            <button
                type="button"
                class="small-button button-link"
                onclick={() => goto(resolve("/quiz"))}
            >
                quiz
            </button>
        </li>
    {:else}
        <li>
            <button
                type="button"
                class="small-button button-link"
                onclick={() => goto(resolve("/login"))}
            >
                login
            </button>
        </li>
    {/if}
</Dropdown>

<style>
    @import "$lib/css/app.css";
</style>
