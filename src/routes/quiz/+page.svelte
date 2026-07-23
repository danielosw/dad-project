<script lang="ts">
    import { onDestroy, onMount } from "svelte";
    import NavMenu from "$lib/components/NavMenu.svelte";
    import type { PageProps } from "./$types";
    let isRunning = $state(false);
    let timerInterval: ReturnType<typeof setInterval> | null = null;
    let { form }: PageProps = $props();
    let seconds = $state(
        (() => (form?.timerEnabled ? form.timerDuration * 60 : 0))(),
    );
    onDestroy(() => {
        stopTimer();
    });
    function handleTimerEnd() {
        stopTimer();
        // submit the form automatically
        const formElement = document.querySelector(
            'form[action="/quiz/results?/submitQuiz"]',
        ) as HTMLFormElement | null;
        if (formElement) {
            formElement.submit();
        }
    }
    $effect(() => {
        if (seconds <= 0 && isRunning) {
            handleTimerEnd();
        }
    });
    function startTimer() {
        if (isRunning) return;
        isRunning = true;

        timerInterval = setInterval(() => {
            seconds -= 1;
        }, 1000);
    }
    function stopTimer() {
        if (timerInterval) {
            clearInterval(timerInterval);
            timerInterval = null;
        }
        isRunning = false;
    }
    function formatTime(totalSeconds: number): string {
        const mins = Math.floor(totalSeconds / 60);
        const secs = totalSeconds % 60;
        return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    }
    // when the quiz is fully loaded, start the timer if it is enabled
    if ((() => form?.timerEnabled)()) {
        onMount(() => {
            startTimer();
        });
    }
</script>

<NavMenu />
<svelte:head>
    <title>Quiz Page</title>
</svelte:head>
<main class="main-content">
    <section class="grid-stack gap-4">
        <h1>{formatTime(seconds)}</h1>
        <h1 class="main-header text-center">Quiz page</h1>
        <p class=" text-center">This is the quiz page.</p>
        <form
            method="POST"
            action="/quiz/results?/submitQuiz"
            class="grid-stack gap-6"
        >
            <!-- id is GA+index+topic number-->

            {#each form?.quizData as post (post.ga + "-" + post.questionNumber + "-" + post.topic)}
                <!-- Display the question and answer options for each post -->
                <!-- also make sure they are outlined  and don't touch eachother-->
                <div class="outline-custom">
                    <p class="text-lg font-medium">{post.questionText}</p>
                    <div class="grid-stack gap-3">
                        {#each ["A", "B", "C", "D"] as option (option)}
                            <label class="answer-option">
                                <input
                                    type="radio"
                                    name={`${post.ga}-${post.questionNumber}-${post.topic}`}
                                    value={option}
                                />
                                <!-- Put the awnser text next to it-->
                                <span>{post[option as keyof typeof post]}</span>
                            </label>
                        {/each}
                    </div>
                </div>
            {/each}
            <!-- button to submit the quiz -->
            <button type="submit" class="small-button button-link"
                >Submit Quiz</button
            >
        </form>
    </section>
</main>

<style>
</style>
