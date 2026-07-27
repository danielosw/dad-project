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
                <h1 class="text-lg font-medium">Select GAs to cover</h1>
                {#if ga.length === 0}
                    <p>No GA available</p>
                {/if}
                {#each ga as item (item)}
                    <label class="answer-option">
                        <input type="checkbox" name="ga" value={item.ga} />
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
                <h2 class="text-md font-medium">timer duration (in minutes)</h2>
                <input
                    type="number"
                    name="timerDuration"
                    min="1"
                    max="180"
                    required
                />
                <h1 class="text-lg font-medium">Number of questions</h1>
                <p class=" font-small subheader">
                    If less than the existing number of questions available, the
                    quiz will be generated with the all available questions.
                </p>
                <input
                    type="number"
                    name="numQuestions"
                    min="1"
                    max="100"
                    required
                />
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
</style>
