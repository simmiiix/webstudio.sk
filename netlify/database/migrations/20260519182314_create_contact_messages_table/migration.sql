CREATE TABLE "contact_messages" (
	"id" serial PRIMARY KEY,
	"name" varchar(255) NOT NULL,
	"email" varchar(320) NOT NULL,
	"phone" varchar(20),
	"message" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
