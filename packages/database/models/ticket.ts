import {
  pgTable,
  uuid,
  varchar,
  timestamp,
  pgEnum,
  primaryKey,
  text,
} from "drizzle-orm/pg-core";
import { projectsTable } from "./project";
import { employeesTable } from "./user";

export const stageEnum = pgEnum("stage", ["assigned", "working", "finished"]);

export const ticketsTable = pgTable("tickets", {
  ticketId: uuid("ticket_id").primaryKey().defaultRandom(),
  projectId: uuid("project_id")
    .notNull()
    .references(() => projectsTable.projectId, { onDelete: "cascade" }),
  title: varchar("title", { length: 100 }).notNull(),
  description: varchar("description", { length: 400 }).notNull(),
  repo: varchar("repo", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()).notNull(),
});

export const ticketAssignmentsTable = pgTable(
  "ticket_assignments",
  {
    ticketId: uuid("ticket_id")
      .notNull()
      .references(() => ticketsTable.ticketId, { onDelete: "cascade" }),
    employeeId: uuid("employee_id")
      .notNull()
      .references(() => employeesTable.userId, { onDelete: "cascade" }),
    stage: stageEnum("stage").default("assigned").notNull(),
    startDate: timestamp("start_date").defaultNow().notNull(),
    deadline: timestamp("deadline"),
  },
  (table) => [
    primaryKey({ columns: [table.ticketId, table.employeeId] }),
  ]
);

export const ticketDocsTable = pgTable("ticket_docs", {
  ticketId: uuid("ticket_id")
    .primaryKey()
    .references(() => ticketsTable.ticketId, { onDelete: "cascade" }),
  title: varchar("title", { length: 100 }).notNull(),
  contentMd: text("content_md").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()).notNull(),
});

export type SelectTicket = typeof ticketsTable.$inferSelect;
export type InsertTicket = typeof ticketsTable.$inferInsert;

export type SelectTicketAssignment = typeof ticketAssignmentsTable.$inferSelect;
export type InsertTicketAssignment = typeof ticketAssignmentsTable.$inferInsert;

export type SelectTicketDoc = typeof ticketDocsTable.$inferSelect;
export type InsertTicketDoc = typeof ticketDocsTable.$inferInsert;
