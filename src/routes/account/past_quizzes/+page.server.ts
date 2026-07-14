import type { PageServerLoad } from '../$types';
import { db } from '$lib/server/db';

export const load: PageServerLoad = async ({ locals }) => {
    // 1. Return early if the user is not authenticated
    if (!locals.user?.id) {
        return {
            pastQuizzes: [],
            user: null,
        };
    }

    // 2. Fetch quizzes matching the authenticated user's id
    const pastQuizzes = await db.query.results.findMany({
        where: {
            userId: locals.user.id,
        },
        with: {
            // Pull in the rows from your 'resultsToQuestions' junction table
            answers: {
                with: {
                    // Pull in the actual question details linked via the composite key
                    questionDetails: true,
                }
            }
        }
    });

    return {
        pastQuizzes,
        user: locals.user,
    };
};