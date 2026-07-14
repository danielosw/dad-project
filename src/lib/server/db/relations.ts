import { defineRelations } from "drizzle-orm";
import * as schema from "./schema";

export const relations = defineRelations(schema, (r) => ({
	account: {
		user: r.one.user({
			from: r.account.userId,
			to: r.user.id
		}),
	},
	user: {
		accounts: r.many.account(),
		sessions: r.many.session(),
		results: r.many.results(),
	},
	session: {
		user: r.one.user({
			from: r.session.userId,
			to: r.user.id
		}),
	},


	results: {
		user: r.one.user({
			from: r.results.userId,
			to: r.user.id
		}),
		// Map one result to many rows in your junction table
		answers: r.many.resultsToQuestions(),
	},

	resultsToQuestions: {
		// Relationship back to the parent result
		result: r.one.results({
			from: r.resultsToQuestions.resultId,
			to: r.results.id
		}),
		// Relationship to the question using the multi-column composite key
		questionDetails: r.one.questions({
			from: [
				r.resultsToQuestions.ga,
				r.resultsToQuestions.topic,
				r.resultsToQuestions.questionNumber
			],
			to: [
				r.questions.ga,
				r.questions.topic,
				r.questions.questionNumber
			]
		}),
	},

	// 6. Questions relations (Option B)
	questions: {
		// Allows you to find which quizzes a question appeared in if needed
		resultsLinkages: r.many.resultsToQuestions(),
	},

}))