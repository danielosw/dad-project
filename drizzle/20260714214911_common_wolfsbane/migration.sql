CREATE TABLE "results" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "results_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"user_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);

CREATE TABLE "results_to_questions" (
	"result_id" integer,
	"ga" text,
	"topic" text,
	"question_number" integer,
	"answered" text NOT NULL,
	CONSTRAINT "results_to_questions_pkey" PRIMARY KEY("result_id","ga","topic","question_number")
);

CREATE INDEX "results_userId_idx" ON "results" ("user_id");
ALTER TABLE "results" ADD CONSTRAINT "results_user_id_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE;
ALTER TABLE "results_to_questions" ADD CONSTRAINT "results_to_questions_result_id_results_id_fkey" FOREIGN KEY ("result_id") REFERENCES "results"("id") ON DELETE CASCADE;
ALTER TABLE "results_to_questions" ADD CONSTRAINT "fk_results_to_questions_question" FOREIGN KEY ("ga","topic","question_number") REFERENCES "questions"("ga","topic","Question Number") ON DELETE CASCADE;