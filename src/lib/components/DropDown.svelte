<script lang="ts">
	import "$lib/css/dropdown.css";


	interface Props {
		children?: import("svelte").Snippet;
	}
	let { children }: Props = $props();
</script>

<div class="barwrap">
	<div class="dropdown">
		<input type="checkbox" id="nav-toggle" class="nav-toggle" />
		<label for="nav-toggle" class="nav-toggle-label m-1">
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
		</label>
		<nav class="nav-menu">
			<ul class="wrapper1">
				{@render children?.()}
			</ul>
		</nav>
	</div>
</div>
