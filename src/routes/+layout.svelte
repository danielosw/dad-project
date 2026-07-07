<script lang="ts">
	import "./layout.css";
	import favicon from "$lib/assets/favicon.svg";
	import NavMenu from "$lib/components/NavMenu.svelte";
	import type { LayoutData } from "./$types";
	const { children, data } = $props<{
		children: import("svelte").Snippet;
		data: LayoutData;
	}>();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<NavMenu user={data.user} />

{@render children()}

<style>
	@import "$lib/css/grid-utils.css";
</style>
