CREATE TABLE "user" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"message" varchar(500)[] DEFAULT '{}',
	"created_at" timestamp DEFAULT NOW()
);
