CREATE TYPE "public"."stage" AS ENUM('assigned', 'working', 'finished');--> statement-breakpoint
CREATE TABLE "employees" (
	"user_id" uuid PRIMARY KEY NOT NULL,
	"role" varchar(100) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "refresh_tokens" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"refresh_token" varchar(255) NOT NULL,
	"access_token" varchar(255) NOT NULL,
	"expires_at" timestamp NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "projects" (
	"project_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"repo" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "ticket_assignments" (
	"ticket_id" uuid NOT NULL,
	"employee_id" uuid NOT NULL,
	"stage" "stage" DEFAULT 'assigned' NOT NULL,
	"start_date" timestamp DEFAULT now() NOT NULL,
	"deadline" timestamp,
	CONSTRAINT "ticket_assignments_ticket_id_employee_id_pk" PRIMARY KEY("ticket_id","employee_id")
);
--> statement-breakpoint
CREATE TABLE "ticket_docs" (
	"ticket_id" uuid PRIMARY KEY NOT NULL,
	"title" varchar(100) NOT NULL,
	"content_md" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tickets" (
	"ticket_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"project_id" uuid NOT NULL,
	"title" varchar(100) NOT NULL,
	"description" varchar(400) NOT NULL,
	"repo" varchar(255),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "full_name" SET DATA TYPE varchar(88);--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "email_verified" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "updated_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "updated_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "password" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "employees" ADD CONSTRAINT "employees_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "refresh_tokens" ADD CONSTRAINT "refresh_tokens_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ticket_assignments" ADD CONSTRAINT "ticket_assignments_ticket_id_tickets_ticket_id_fk" FOREIGN KEY ("ticket_id") REFERENCES "public"."tickets"("ticket_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ticket_assignments" ADD CONSTRAINT "ticket_assignments_employee_id_employees_user_id_fk" FOREIGN KEY ("employee_id") REFERENCES "public"."employees"("user_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ticket_docs" ADD CONSTRAINT "ticket_docs_ticket_id_tickets_ticket_id_fk" FOREIGN KEY ("ticket_id") REFERENCES "public"."tickets"("ticket_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_project_id_projects_project_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("project_id") ON DELETE cascade ON UPDATE no action;