import { pgTable, serial, text, integer, primaryKey } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const questions = pgTable("questions", {
	ga: text().notNull(),
	topic: text().notNull(),
	questionNumber: integer("Question Number").notNull(),
	questionText: text("Question Text").notNull(),
	answerA: text("Answer A").notNull(),
	answerB: text("Answer B").notNull(),
	answerC: text("Answer C").notNull(),
	answerD: text("Answer D").notNull(),
	correctAnswer: text("Correct Answer").notNull(),
}, (table) => [
	primaryKey({ columns: [table.ga, table.topic, table.questionNumber], name: "questions_pk" }),
]);

export const task = pgTable("task", {
	id: serial().primaryKey(),
	title: text().notNull(),
	priority: integer().default(1).notNull(),
});
