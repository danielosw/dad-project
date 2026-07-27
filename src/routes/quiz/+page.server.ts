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
        const numQuestions = parseInt(data.get('numQuestions') as string) || 10;

        // get the selected GAs from the form data
        const selectedGAs = data.getAll('ga') as string[];
        // filter the quizData to only include questions with the selected GAs
        quizData = quizData.filter((q) => selectedGAs.includes(q.ga));
        // shuffle the quizData array to randomize the order of the questions
        quizData = quizData.sort(() => Math.random() - 0.5);
        // keep only the specified number of questions
        quizData = quizData.slice(0, Math.min(numQuestions, quizData.length));

        return {
            quizData: quizData,
            timerEnabled: data.get('timerEnabled'),
            timerDuration: parseInt(data.get('timerDuration') as string) || 0,
        };

    }
} satisfies Actions;
