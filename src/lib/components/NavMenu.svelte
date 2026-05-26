<script lang="ts">
    import { resolve } from "$app/paths";
    import Dropdown from "$lib/components/DropDown.svelte";
    import ThemeSwitcher from "$lib/components/ThemeSwitcher.svelte";
</script>

<Dropdown>
    <li><ThemeSwitcher /></li>
    <li><a class="small-button" href={resolve("/")}>home</a></li>
</Dropdown>

<style>
    @import "$lib/css/app.css";
</style>
