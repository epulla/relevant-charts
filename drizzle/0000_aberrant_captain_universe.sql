CREATE TABLE IF NOT EXISTS "examples" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"author" text NOT NULL,
	"title" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"data_id" text NOT NULL,
	"cover_id" text NOT NULL
);
