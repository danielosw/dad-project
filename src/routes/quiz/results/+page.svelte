<script lang="ts">
    import NavMenu from "$lib/components/NavMenu.svelte";
    import type { PageProps } from "./$types";

    let { form }: PageProps = $props();
    let score = () => {
        return form?.score ?? 0;
    };
</script>

<NavMenu />
<svelte:head>
    <title>Quiz Results</title>
</svelte:head>
<main class="grid-center min-h-screen px-6">
    <section class="grid-stack gap-6">
        <h1 class="text-3xl font-semibold text-center">Quiz Results</h1>
        <p class=" text-center">This is the quiz results page.</p>
        {#if form?.result}
            <p class=" text-center">
                You scored {score} out of {form.result.length}
            </p>
            {#each form.result as result (result.ga + "-" + result.questionNumber + "-" + result.topic)}
                <div class="grid-stack outline-custom">
                    <p class="text-lg font-medium">
                        Question {result.questionNumber} of Topic: {result.topic}
                        of Group Area: {result.ga}
                    </p>
                    <p class="">
                        Question: {result.question}
                    </p>
                    <p class="">
                        Your answer: {result.givenAnswer} - {result.userAnswerText}
                    </p>
                    <p class="">
                        Correct answer: {result.answer} - {result.correctAnswerText}
                    </p>
                    <p class="">
                        Explanation: {result.reasoning}
                    </p>
                </div>
            {/each}
        {:else}
            <p class=" text-center">No results available.</p>
        {/if}
    </section>
</main>
