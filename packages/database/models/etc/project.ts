import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { workspacesTable } from "../workspace/workspace";

export const projectsTable = pgTable("projects", {
  projectId: uuid("project_id").primaryKey().defaultRandom(),
  workspaceId: uuid("workspace_id")
    .notNull()
    .references(() => workspacesTable.workspaceId, { onDelete: "cascade" }),
  repo: varchar("repo", { length: 255 }).notNull(),
});

export type SelectProject = typeof projectsTable.$inferSelect;
export type InsertProject = typeof projectsTable.$inferInsert;
