import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";

export const projectsTable = pgTable("projects", {
  projectId: uuid("project_id").primaryKey().defaultRandom(),
  repo: varchar("repo", { length: 255 }).notNull(),
});

export type SelectProject = typeof projectsTable.$inferSelect;
export type InsertProject = typeof projectsTable.$inferInsert;
