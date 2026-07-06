import { db } from '$lib/server/db';
import { questions } from '$lib/server/db/schema';
import { and, eq } from 'drizzle-orm/sql/expressions/conditions';
import type { Actions } from './$types';
import { sql } from 'drizzle-orm/sql';

// define the data type
type QuizResult = {
    ga: string;
    questionNumber: number;
    topic: string;
    answer: string;
    givenAnswer: string;
    correctAnswerText: string;
    userAnswerText: string;
    question: string;
};

export const actions = {

    submitQuiz: async ({ request }) => {

        const data = await request.formData();

        const results = Array.from(data.entries()).reduce((acc, [key, value]) => {
            const [ga, questionNumber, topic] = key.split('-');
            acc.push({ ga, questionNumber: parseInt(questionNumber), topic, answer: value.toString() });
            return acc;
        }, [] as { ga: string; questionNumber: number; topic: string; answer: string }[]);
        let result: QuizResult[] = [];
        for (const i of results) {
            // get the text for what they guess and what the correct answer is 
            // correct awnser gives A,B,C,D so we need to get the text for that answer from the questions table
            const temp = await db.select({
                ga: questions.ga,
                topic: questions.topic,
                questionNumber: questions.questionNumber,
                answer: questions.correctAnswer,
                answerA: questions.answerA,
                answerB: questions.answerB,
                answerC: questions.answerC,
                answerD: questions.answerD,
                question: questions.questionText
            }).from(questions).where(and(eq(questions.ga, i.ga), eq(questions.topic, i.topic), eq(questions.questionNumber, i.questionNumber)));

            result = result.concat(temp.map((row) => ({
                ga: row.ga,
                topic: row.topic,
                questionNumber: row.questionNumber,
                answer: row.answer,
                question: row.question,
                // get the text for the correct answer
                correctAnswerText: "A" === row.answer ? row.answerA : "B" === row.answer ? row.answerB : "C" === row.answer ? row.answerC : row.answerD,
                givenAnswer: i.answer,
                userAnswerText: "A" === i.answer ? row.answerA : "B" === i.answer ? row.answerB : "C" === i.answer ? row.answerC : row.answerD,
            })));
        }
        return {
            result
        };

    }
} satisfies Actions;
