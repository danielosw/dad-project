<script lang="ts">
    import NavMenu from "$lib/components/NavMenu.svelte";
    import type { PageProps } from "./$types";

    let { form }: PageProps = $props();
    import QuizViewer from "$lib/components/RenderQuiz.svelte";
    import { resolve } from "$app/paths";
</script>

<NavMenu />
<svelte:head>
    <title>Quiz Results</title>
</svelte:head>
<main class="main-content">
    <section class="grid-stack gap-6">
        <h1 class="main-header text-center">Quiz Results</h1>

        <QuizViewer quiz={form?.quiz} />
        <a
            class="small-button button-link text-center"
            href={resolve("/quiz/setup")}>Take Another Quiz</a
        >
        <a class="small-button button-link text-center" href={resolve("/")}
            >Back to Home</a
        >
    </section>
</main>
