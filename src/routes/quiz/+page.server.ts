import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { questions } from '$lib/server/db/schema';
async function getQuizData() {
    // Fetch quiz data from your database 
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
    let quizData = result.map((row) => ({
        ga: row.ga,
        topic: row.topic,
        questionNumber: row.questionNumber,
        questionText: row.questionText,
        A: row.answerA,
        B: row.answerB,
        C: row.answerC,
        D: row.answerD

    }));
    // shuffle the quizData array to randomize the order of the questions
    quizData = quizData.sort(() => Math.random() - 0.5);
    // keep only 3 for testing
    quizData = quizData.slice(0, 3);
    return quizData;
}

export const load: PageServerLoad = async () => {
    return {
        quizData: await getQuizData()
    };
};
