<script lang="ts">
	import "$lib/css/theme-switcher.css";
	import { setTheme, themeOptions, themePreference } from "$lib/stores/theme";

	let { className = "" }: { className?: string } = $props();
</script>

<div class={`theme-switcher ${className}`} role="group" aria-label="Theme">
	{#each themeOptions as option (option.value)}
		{@const isActive = $themePreference === option.value}
		<button
			type="button"
			class="theme-switcher-button"
			data-active={isActive}
			aria-pressed={isActive}
			aria-label={`Switch to ${option.label} theme`}
			onclick={() => setTheme(option.value)}
		>
			{option.label}
		</button>
	{/each}
</div>
