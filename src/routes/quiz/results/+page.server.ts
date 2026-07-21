import { db } from '$lib/server/db';
import { questions, results, resultsToQuestions } from '$lib/server/db/schema';
import { and, eq } from 'drizzle-orm/sql/expressions/conditions';
import type { Actions } from './$types';
import { auth } from '$lib/server/auth';

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
    reasoning: string;
};

type AnswerSubmission = {
    ga: string;
    topic: string;
    questionNumber: number;
    answered: string;
};
async function createResult(userId: string, submissions: AnswerSubmission[]) {
    return await db.transaction(async (tx) => {
        // 1. Insert parent result row (id automatically generated)
        const [newResult] = await tx
            .insert(results)
            .values({
                userId: userId,
            })
            .returning({ id: results.id });

        if (submissions.length === 0) return newResult;

        // 2. Prepare junction entries with what they answered
        const junctionRows = submissions.map((sub) => ({
            resultId: newResult.id,
            ga: sub.ga,
            topic: sub.topic,
            questionNumber: sub.questionNumber,
            answered: sub.answered,
        }));

        // 3. Batch insert answers
        await tx.insert(resultsToQuestions).values(junctionRows);

        return {
            id: newResult.id,
            userId,
            answers: submissions,
        };
    });
}
async function calculateScore(result: QuizResult[]): Promise<number> {
    let total = 0;
    result.forEach((r) => {
        if (r.givenAnswer === r.answer) {
            total++;
        }
    });
    return total;
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const actions = {

    submitQuiz: async ({ request }) => {

        const data = await request.formData();
        const session = await auth.api.getSession({
            headers: request.headers,
        });
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
                question: questions.questionText,
                reasoning: questions.reasoning
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
                reasoning: row.reasoning
            })));
        }
        if (session?.user?.id) {
            await createResult(session.user.id, result.map((r) => ({
                ga: r.ga,
                topic: r.topic,
                questionNumber: r.questionNumber,
                answered: r.givenAnswer
            })));
        }
        const score = await calculateScore(result);

        return {
            result, score
        };

    }
} satisfies Actions;
