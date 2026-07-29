import { db } from '$lib/server/db';
import { questions } from '$lib/server/db/schema';
import type { Actions } from './$types';
async function getQuizData() {
    // Fetch quiz data from your database 
    // check if the connection is working
    const result = await db.select({
        ga: questions.ga,
        topic: questions.topic,
        questionNumber: questions.questionNumber,
        questionText: questions.questionText,
        answerA: questions.answerA,
        answerB: questions.answerB,
        answerC: questions.answerC,
        answerD: questions.answerD
    }).from(questions);
    // only return what is needed for the quiz page, not the correct answer
    const quizData = result.map((row) => ({
        ga: row.ga,
        topic: row.topic,
        questionNumber: row.questionNumber,
        questionText: row.questionText,
        A: row.answerA,
        B: row.answerB,
        C: row.answerC,
        D: row.answerD

    }));
    return quizData;
}

export const actions = {

    startQuiz: async ({ request }) => {

        const data: FormData = await request.formData();
        let quizData = await getQuizData()
        const gaData: Record<string, number> = {};

        for (const [key, value] of data.entries()) {
            const match = key.match(/^ga\[(.*)\]$/);
            if (match) {
                gaData[match[1]] = Number(value);
            }
        }
        let tempNumQuestions = 0;
        for (const ga in gaData) {
            tempNumQuestions += gaData[ga];
        }
        const numQuestions = tempNumQuestions || 10;

        // get the number of questions from each GA selected by the user
        // casting the string to a number
        const selectedGAs = Object.keys(gaData);
        quizData = quizData.filter((q) => selectedGAs.includes(q.ga));
        quizData = quizData.sort(() => Math.random() - 0.5);

        // keep only the specified number of questions from each GA
        console.log('GA data:', gaData);
        quizData = quizData.filter((q) => {
            if (gaData[q.ga] > 0) {
                gaData[q.ga]--;
                return true;
            }
            return false;
        });
        // shuffle the quizData array to randomize the order of the questions
        // keep only the specified number of questions
        quizData = quizData.slice(0, Math.min(Math.min(numQuestions, 140), quizData.length));

        return {
            quizData: quizData,
            timerEnabled: data.get('timerEnabled'),
            timerDuration: parseInt(data.get('timerDuration') as string) || 0,
        };

    }
} satisfies Actions;
