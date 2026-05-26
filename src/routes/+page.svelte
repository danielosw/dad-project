<script lang="ts">
	import Dropdown from '$lib/components/DropDown.svelte';
    import ThemeSwitcher from '$lib/components/ThemeSwitcher.svelte';
</script>
<main class="grid-center min-h-screen px-6">
	<section class="grid-stack gap-4 text-center">
		<h1 class="text-3xl font-semibold">Welcome to the testing site.</h1>
		<p class="text-base">
			Visit <a class="font-medium underline" href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read
			the documentation
		</p>
		<div class="grid-auto-fit grid-center-x grid-center-y gap-3">
			<a class="small-button border" href="https://svelte.dev/docs/kit">Docs</a>
			<a class="small-button border" href="https://svelte.dev/tutorial/kit">Tutorial</a>
			<a class="small-button border" href="https://svelte.dev/examples">Examples</a>
		</div>
        <Dropdown >
            <li><ThemeSwitcher/></li>

        </Dropdown>
	</section>
</main>
