import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { questions } from '$lib/server/db/schema';
async function getQuizData() {
    // Fetch all topics and ga's from your database 
    // make sure to only get one of each topic and ga, not all the questions
    const resultga = await db.select({
        ga: questions.ga,
    }).from(questions).groupBy(questions.ga);
    const resulttopic = await db.select({
        topic: questions.topic,
    }).from(questions).groupBy(questions.topic);
    return { ga: resultga, topic: resulttopic };
}

export const load: PageServerLoad = async () => {
    return {
        quizData: await getQuizData()
    };
};

