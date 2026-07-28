<script lang="ts">
    import type { Quiz, Answer } from "$lib/types";
    interface Props {
        quiz?: Quiz | null;
    }

    let { quiz }: Props = $props();

    function getAnswerText(result: Answer, ABCD?: string) {
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
        if (!quiz?.answers) return 0;
        return quiz.answers.filter(
            (i) => i.answered === i.questionDetails?.correctAnswer,
        ).length;
    });

    let categoryScores = $derived.by(() => {
        const scores: Record<string, { correct: number; total: number }> = {};
        if (!quiz?.answers) return scores;

        quiz.answers.forEach((i) => {
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

{#if quiz?.answers}
    <p class=" text-center">
        You scored {totalScore} out of {quiz.answers.length}
        {#each Object.entries(categoryScores) as [ga, score] (ga)}
            <br />
            Group Area: {ga} - {score.correct}/{score.total}
        {/each}
    </p>
    {#each quiz.answers as result (result.ga + "-" + result.questionNumber + "-" + result.topic)}
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
                Correct answer: {result.questionDetails?.correctAnswer} -
                {getAnswerText(result, result.questionDetails?.correctAnswer)}
            </p>
            <p class="">
                Explanation: {result.questionDetails?.reasoning}
            </p>
        </div>
    {/each}
{:else}
    <p class="text-center">No results available.</p>
{/if}
