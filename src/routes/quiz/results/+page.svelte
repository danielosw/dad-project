<script lang="ts">
    import NavMenu from "$lib/components/NavMenu.svelte";
    import type { PageProps } from "./$types";

    let { data, form }: PageProps = $props();
    let score = 0;
    if (form?.result) {
        form.result.forEach((i) => {
            if (i.givenAnswer == i.answer) {
                score++;
            }
        });
    }
</script>

<NavMenu />
<main class="grid-center min-h-screen px-6">
    <section class="grid-stack gap-4">
        <h1 class="text-3xl font-semibold text-center">Quiz Results</h1>
        <p class="text-base text-center">This is the quiz results page.</p>
        {#if form?.result}
            <p class="text-base text-center">
                You scored {score} out of {form.result.length}
            </p>
            {#each form.result as result (result.ga + "-" + result.questionNumber + "-" + result.topic)}
                <div class="grid-stack gap-2">
                    <p class="text-lg font-medium">
                        Question {result.questionNumber} of Topic: {result.topic}
                        of Group Area: {result.ga}
                    </p>
                    <p class="text-base">
                        Your answer: {result.givenAnswer}
                    </p>
                    <p class="text-base">
                        Correct answer: {result.answer}
                    </p>
                </div>
            {/each}
        {:else}
            <p class="text-base text-center">No results available.</p>
        {/if}
    </section>
</main>
