<script lang="ts">
    import type { PageProps } from "./$types";

    let { data }: PageProps = $props();
    function getAnswerText(
        result: (typeof data.quiz.answers)[number],
        ABCD?: string,
    ) {
        switch (ABCD) {
            case "A":
                return result.questionDetails?.answerA;
            case "B":
                return result.questionDetails?.answerB;
            case "C":
                return result.questionDetails?.answerC;
            case "D":
                return result.questionDetails?.answerD;
        }
    }
    function getScore(result: typeof data.quiz) {
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
    {#if data.quiz?.answers}
        <p class=" text-center">
            You scored {getScore(data.quiz)} out of {data.quiz.answers.length}
        </p>
        {#each data.quiz.answers as result (result.ga + "-" + result.questionNumber + "-" + result.topic)}
            <div class="grid-stack outline-custom">
                <p class="text-lg font-medium">
                    Question {result.questionNumber} of Topic: {result.topic}
                    of Group Area: {result.ga}
                </p>
                <p class="">
                    Question: {result.questionDetails?.questionText}
                </p>
                <p class="">
                    Your answer: {result.answered} - {getAnswerText(
                        result,
                        result.answered,
                    )}
                </p>
                <p class="">
                    Correct answer: {result.questionDetails?.correctAnswer} - {getAnswerText(
                        result,
                        result.questionDetails?.correctAnswer,
                    )}
                </p>
                <p class="">
                    Explanation: {result.questionDetails?.reasoning}
                </p>
            </div>
        {/each}
    {:else}
        <p class=" text-center">No results available.</p>
    {/if}
</main>
