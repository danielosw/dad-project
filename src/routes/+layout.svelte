<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	
	let { children } = $props();
</script>
<style>
	@import './layout.css';
	@import "$lib/css/grid-utils.css";

</style>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>


{@render children()}

