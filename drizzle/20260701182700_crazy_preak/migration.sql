CREATE TABLE "questions" (
	"ga" text,
	"topic" text,
	"Question Number" integer,
	"Question Text" text NOT NULL,
	"Answer A" text NOT NULL,
	"Answer B" text NOT NULL,
	"Answer C" text NOT NULL,
	"Answer D" text NOT NULL,
	"Correct Answer" text NOT NULL,
	CONSTRAINT "questions_pk" PRIMARY KEY("ga","topic","Question Number")
);
