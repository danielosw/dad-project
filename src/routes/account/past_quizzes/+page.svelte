<script lang="ts">
    import { resolve } from "$app/paths";
    import type { PageProps } from "./$types";

    let { data }: PageProps = $props();
    // take a result and return the score
    function getScore(result: (typeof data.pastQuizzes)[number]) {
        let total = 0;
        result.answers.forEach((i) => {
            if (i.answered == i.questionDetails?.correctAnswer) {
                total++;
            }
        });
        return total;
    }
</script>

<svelte:head>
    <title>Past quizzes</title>
</svelte:head>
<main class="main-content">
    <section class="main-section">
        {#if data.pastQuizzes.length > 0}
            <h1 class="main-header">Past Quizzes</h1>
            <div class="grid-stack gap-4">
                {#each data.pastQuizzes as quiz (quiz.id)}
                    <div class="grid-stack outline-custom">
                        <a
                            type="button"
                            href={resolve(
                                `/account/past_quizzes/details/${quiz.id}`,
                            )}
                        >
                            <p class="text-lg font-medium">
                                Quiz ID: {quiz.id}
                            </p>
                            <p>
                                Date Taken: {new Date(
                                    quiz.createdAt,
                                ).toLocaleString()}
                            </p>
                            <p>
                                Percentage: {(
                                    (getScore(quiz) * 100) /
                                    quiz.answers.length
                                ).toFixed(2)}%
                            </p>
                            <p>
                                Score:"{getScore(quiz)}/{quiz.answers.length}"
                            </p>
                        </a>
                    </div>
                {/each}
            </div>
        {:else}
            <h1 class="main-header">No Past Quizzes</h1>
            <p>You have not taken any quizzes yet.</p>
        {/if}
    </section>
</main>
