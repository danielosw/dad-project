CREATE TABLE "results" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "results_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"user_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);

CREATE TABLE "results_to_questions" (
	"result_id" integer,
	"ga" text,
	"topic" text,
	"question_number" integer,
	CONSTRAINT "results_to_questions_pk" PRIMARY KEY("result_id","ga","topic","question_number")
);

ALTER TABLE "results" ADD CONSTRAINT "results_user_id_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE;
ALTER TABLE "results_to_questions" ADD CONSTRAINT "results_to_questions_result_id_results_id_fkey" FOREIGN KEY ("result_id") REFERENCES "results"("id") ON DELETE CASCADE;