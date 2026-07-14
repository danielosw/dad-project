import type { PageServerLoad } from '../$types';
import { db } from '$lib/server/db';
import { results } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm/sql/expressions/conditions';

export const load: PageServerLoad = async ({ locals }) => {
    // Fetch past quizzes for the logged-in user from the database
    // If the user isn't logged in, don't query the database
    if (!locals.user?.id) {
        return {
            pastQuizzes: [],
            user: null,
        };
    }
    const pastQuizzes = await db.select()
        .from(results)
        .where(eq(results.userId, locals.user.id));

    return {
        pastQuizzes,
        user: locals.user,
    };
};
