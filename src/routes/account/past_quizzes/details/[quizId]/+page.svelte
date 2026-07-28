<script lang="ts">
    import type { PageProps } from "./$types";
    import QuizViewer from "$lib/components/RenderQuiz.svelte";

    let { data }: PageProps = $props();
</script>

<svelte:head>
    <title>Details of quiz {data.quiz?.id}</title>
</svelte:head>
<main class="main-content">
    <div class="grid-stack gap-4">
        <QuizViewer quiz={data.quiz} />
        <form
            method="POST"
            action={`/account/past_quizzes/details/${data.quiz?.id}?/delete`}
        >
            <input type="hidden" name="quizId" value={data.quiz?.id} />
            <button type="submit" class="medium-button button-link">
                Delete Quiz
            </button>
        </form>
    </div>
</main>
