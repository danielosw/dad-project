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

<main class="grid-center min-h-screen px-6">
    <section class="grid-stack gap-4 text-center">
        {#if data.pastQuizzes.length > 0}
            <h1 class="text-3xl font-semibold">Past Quizzes</h1>
            <ul class="grid-stack gap-2">
                {#each data.pastQuizzes as quiz (quiz.id)}
                    <li class="grid-stack outline-custom p-4">
                        <a
                            type="button"
                            href={resolve(
                                `/account/past_quizzes/details/${quiz.id}`,
                            )}
                        >
                            class="grid-stack gap-2 button-link"

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
                    </li>
                {/each}
            </ul>
        {:else}
            <h1 class="text-3xl font-semibold">No Past Quizzes</h1>
            <p>You have not taken any quizzes yet.</p>
        {/if}
    </section>
</main>
