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
    let totalScore = $derived.by(() => {
        if (!data.quiz?.answers) return 0;
        return data.quiz.answers.filter(
            (i) => i.answered === i.questionDetails?.correctAnswer,
        ).length;
    });

    let categoryScores = $derived.by(() => {
        const scores: Record<string, { correct: number; total: number }> = {};
        if (!data.quiz?.answers) return scores;

        data.quiz.answers.forEach((i) => {
            if (!i.ga) return;
            if (!scores[i.ga]) {
                scores[i.ga] = { correct: 0, total: 0 };
            }
            if (i.answered === i.questionDetails?.correctAnswer) {
                scores[i.ga].correct++;
            }
            scores[i.ga].total++;
        });
        return scores;
    });
</script>

<svelte:head>
    <title>Details of quiz {data.quiz?.id}</title>
</svelte:head>
<main class="grid-center min-h-screen px-6">
    {#if data.quiz?.answers}
        <p class=" text-center">
            You scored {totalScore} out of {data.quiz.answers.length}
            {#each Object.entries(categoryScores) as [ga, score] (ga)}
                <br />
                Group Area: {ga} - {score.correct}/{score.total}
            {/each}
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
