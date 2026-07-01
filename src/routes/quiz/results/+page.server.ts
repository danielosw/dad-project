import { db } from '$lib/server/db';
import { questions } from '$lib/server/db/schema';
import { and, eq } from 'drizzle-orm/sql/expressions/conditions';
import type { Actions } from './$types';

// define the data type
type QuizResult = {
    ga: string;
    questionNumber: number;
    topic: string;
    answer: string;
    givenAnswer: string;
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
            const temp = await db.select({
                ga: questions.ga,
                topic: questions.topic,
                questionNumber: questions.questionNumber,
                answer: questions.correctAnswer,
            }).from(questions).where(and(eq(questions.ga, i.ga), eq(questions.topic, i.topic), eq(questions.questionNumber, i.questionNumber)));
            result = result.concat(temp.map((row) => ({
                ga: row.ga,
                topic: row.topic,
                questionNumber: row.questionNumber,
                answer: row.answer,
                givenAnswer: i.answer
            })));
        }
        return {
            result
        };

    }
} satisfies Actions;
