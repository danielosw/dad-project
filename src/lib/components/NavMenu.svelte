<script lang="ts">
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
    <li><a class="small-button" href={resolve("/")}>home</a></li>
    {#if user}
        <li><a class="small-button" href={resolve("/account")}>account</a></li>
        <li><a class="small-button" href={resolve("/quiz")}>quiz</a></li>
    {:else}
        <li><a class="small-button" href={resolve("/login")}>login</a></li>
    {/if}
</Dropdown>

<style>
    @import "$lib/css/app.css";
</style>
