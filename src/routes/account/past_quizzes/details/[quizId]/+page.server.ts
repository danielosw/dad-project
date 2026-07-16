import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { error } from '@sveltejs/kit';
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
