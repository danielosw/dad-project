import type { Actions, PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { error, redirect } from '@sveltejs/kit';
import { auth } from '$lib/server/auth';
import { results, resultsToQuestions } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
export const load: PageServerLoad = async ({ locals, params }) => {
    // get the quizId from the URL parameters
    const quizId = params.quizId;
    let quizIdNumber: number;
    try {
        quizIdNumber = parseInt(quizId, 10);
    } catch {
        // error out
        error(404, 'Not Found');
    }
    const quizResult = await db.query.results.findFirst({
        where: {
            id: quizIdNumber,
            userId: locals.user?.id ?? -1, // Ensure the quiz belongs to the authenticated user
        },
        with: {
            answers: {
                with: {
                    questionDetails: true,
                }
            }
        }
    });
    if (!quizResult) {
        throw error(404, 'Quiz not found or does not belong to the user');
    }
    return {
        user: locals.user ?? null,
        quiz: quizResult,
    };
};
export const actions = {

    delete: async ({ request }) => {

        const data = await request.formData();
        const session = await auth.api.getSession({
            headers: request.headers,
        });
        const quizId = data.get('quizId')?.toString();
        if (!quizId) {
            throw error(400, 'Quiz ID is required');
        }
        const quizIdNumber = parseInt(quizId, 10);
        if (isNaN(quizIdNumber)) {
            throw error(400, 'Invalid Quiz ID');
        }
        // convert userid to a string to match the type in the database
        const idString = session?.user?.id?.toString() ?? '';
        // Ensure the quiz belongs to the authenticated user
        const quizResult = await db.query.results.findFirst({
            where: {
                id: quizIdNumber,
                userId: idString,
            },
        });
        if (!quizResult) {
            throw error(404, 'Quiz not found or does not belong to the user');
        }
        // Delete the quiz result and its associated answers in a transaction
        await db.transaction(async (tx) => {
            await tx.delete(resultsToQuestions).where(eq(resultsToQuestions.resultId, quizIdNumber));
            await tx.delete(results).where(eq(results.id, quizIdNumber));
        });
        // redirect to the past quizzes page after deletion
        redirect(303, '/account/past_quizzes');

    }
} satisfies Actions;
