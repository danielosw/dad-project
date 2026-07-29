<script lang="ts">
    import type { PageProps } from "./$types";

    let { data }: PageProps = $props();
    const quizData = (() => data.quizData)();
    const ga = quizData.ga;
</script>

<svelte:head>
    <title>Main Page</title>
</svelte:head>
<main class="main-content">
    <section class="main-section">
        <h1 class="main-header">Quiz Setup</h1>
        <form
            class="grid-stack drawbox gap-4"
            method="POST"
            action="/quiz?/startQuiz"
        >
            <div class="grid-stack drawbox">
                <h1 class="text-lg font-medium">
                    How many questions from each GA
                </h1>
                <h2 class="text-md font-medium">Total max of 140 questions</h2>

                {#if ga.length === 0}
                    <p>No GA available</p>
                {/if}
                {#each ga as item (item)}
                    <label class="answer-option">
                        <!-- send {ganame: {number}} to server -->
                        <input
                            type="number"
                            name="ga[{item.ga}]"
                            min="0"
                            value="0"
                            required
                        />
                        <span>{item.ga}</span>
                    </label>
                {/each}
            </div>
            <div class="grid-stack drawbox">
                <h1 class="text-lg font-medium">Timer Setup</h1>
                <h2 class="text-md font-medium">timer enabled?</h2>
                <label class="answer-option">
                    <input
                        type="radio"
                        name="timerEnabled"
                        value="true"
                        required
                    />
                    <span>Yes</span>
                </label>
                <label class="answer-option">
                    <input
                        type="radio"
                        name="timerEnabled"
                        value="false"
                        required
                    />
                    <span>No</span>
                </label>
                <h2 class="text-md font-medium">Timer duration (in minutes)</h2>
                <label class="answer-option">
                    <input
                        type="number"
                        name="timerDuration"
                        min="1"
                        max="240"
                        required
                        value="180"
                    />

                    <p class=" font-small subheader">
                        If more than the existing number of questions available,
                        the quiz will be generated with the all available
                        questions.
                    </p>
                </label>
            </div>

            <button type="submit" class="small-button button-link"
                >Start quiz</button
            >
        </form>
    </section>
</main>

<style>
    /* keep the number of questions subheader small by setting a max-width */
    .subheader {
        max-width: 600px;
    }
    /* max width of 50% of the screen for input fields */
    input[type="number"] {
        /* set the max width to 20% of the screen */
        max-width: 20%;
        /* center the input field */
        margin: 0 auto;
    }
</style>
