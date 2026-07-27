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
        let createdResult: {
            id: number;
            userId: string;
            answers: AnswerSubmission[];
        } | { id: number; } | null = null;
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
            createdResult = await createResult(session.user.id, result.map((r) => ({
                ga: r.ga,
                topic: r.topic,
                questionNumber: r.questionNumber,
                answered: r.givenAnswer
            })));
        }
        const score = await calculateScore(result);
        // get the new quiz object with the answers and the score

        type Answer = {
            resultId: number;
            ga: string;
            questionNumber: number | string;
            topic: string;
            answered: string;
            questionDetails: {
                questionText: string;
                answerA: string;
                answerB: string;
                answerC: string;
                answerD: string;
                correctAnswer: string;
                reasoning: string;
            } | null;
        };
        type Quiz = {
            id: string | number;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            answers: Answer[];
        };
        // we need to create a quiz object that has the answers and the score
        const quizResult: Quiz = {
            id: createdResult?.id ?? 0,
            createdAt: new Date(),
            updatedAt: new Date(),
            userId: session?.user?.id ?? '',
            answers: result.map((r) => ({
                resultId: createdResult?.id ?? 0,
                ga: r.ga,
                questionNumber: r.questionNumber,
                topic: r.topic,
                answered: r.givenAnswer,
                questionDetails: {
                    questionText: r.question,
                    answerA: "A" === r.answer ? r.correctAnswerText : "A" === r.givenAnswer ? r.userAnswerText : "",
                    answerB: "B" === r.answer ? r.correctAnswerText : "B" === r.givenAnswer ? r.userAnswerText : "",
                    answerC: "C" === r.answer ? r.correctAnswerText : "C" === r.givenAnswer ? r.userAnswerText : "",
                    answerD: "D" === r.answer ? r.correctAnswerText : "D" === r.givenAnswer ? r.userAnswerText : "",
                    correctAnswer: r.correctAnswerText,
                    reasoning: r.reasoning
                }
            }))
        };
        return {
            result, score, quiz: quizResult
        };

    }
} satisfies Actions;
