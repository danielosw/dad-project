<script lang="ts">
    import NavMenu from "$lib/components/NavMenu.svelte";
    import type { PageProps } from "./$types";

    let { data }: PageProps = $props();
</script>

<NavMenu />
<main class="grid-center min-h-screen px-6">
    <section class="grid-stack gap-4">
        <h1 class="text-3xl font-semibold text-center">Quiz page</h1>
        <p class=" text-center">This is the quiz page.</p>
        <form
            method="POST"
            action="/quiz/results?/submitQuiz"
            class="grid-stack gap-6"
        >
            <!-- id is GA+index+topic number-->

            {#each data.quizData as post (post.ga + "-" + post.questionNumber + "-" + post.topic)}
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
                                    required
                                />
                                <!-- Put the awnser text next to it-->
                                <span>{post[option as keyof typeof post]}</span>
                            </label>
                        {/each}
                    </div>
                </div>
            {/each}
            <!-- button to submit the quiz -->
            <button type="submit" class="small-button">Submit Quiz</button>
        </form>
    </section>
</main>
