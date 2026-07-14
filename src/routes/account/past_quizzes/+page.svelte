<script lang="ts">
    import type { PageData } from "../$types";
    const { data } = $props<{ data: PageData }>();
</script>

<main class="grid-center min-h-screen px-6">
    <section class="grid-stack gap-4 text-center">
        {#if data.pastQuizzes.length > 0}
            <h1 class="text-3xl font-semibold">Past Quizzes</h1>
            <ul class="grid-stack gap-2">
                {#each data.pastQuizzes as quiz (quiz.id)}
                    <li class="grid-stack outline-custom p-4">
                        <p class="text-lg font-medium">Quiz ID: {quiz.id}</p>
                        <p>
                            Date Taken: {new Date(
                                quiz.createdAt,
                            ).toLocaleString()}
                        </p>
                        <p>Score: {quiz.score}</p>
                    </li>
                {/each}
            </ul>
        {:else}
            <h1 class="text-3xl font-semibold">No Past Quizzes</h1>
            <p>You have not taken any quizzes yet.</p>
        {/if}
    </section>
</main>
