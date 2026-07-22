<script lang="ts">
	import type { Snippet } from "svelte";
	import "$lib/css/dropdown.css";

	interface Props {
		children?: Snippet;
	}

	let { children }: Props = $props();
	let isOpen = $state(false);

	function toggleMenu() {
		isOpen = !isOpen;
	}

	function handleWindowKeyDown(event: KeyboardEvent) {
		if (event.key === "Escape" && isOpen) {
			isOpen = false;
		}
	}
</script>

<svelte:window onkeydown={handleWindowKeyDown} />

<div class="barwrap">
	<div class="dropdown" class:open={isOpen}>
		<button
			type="button"
			class="nav-toggle-button margin-1"
			onclick={toggleMenu}
			aria-expanded={isOpen}
			aria-controls="nav-menu"
			aria-label={isOpen ? "Close Menu" : "Open Menu"}
		>
			{#if !isOpen}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					class="buttonbar hamburger"
				>
					<title>Toggle Menu</title>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M4 6h16M4 12h16M4 18h16"
					/>
				</svg>
			{:else}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					class="buttonbar close-icon"
				>
					<title>Close Menu</title>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M6 18L18 6M6 6l12 12"
					/>
				</svg>
			{/if}
		</button>

		<nav id="nav-menu" class="nav-menu" inert={!isOpen || undefined}>
			<ul>
				{#if children}
					{@render children()}
				{/if}
			</ul>
		</nav>
	</div>
</div>
