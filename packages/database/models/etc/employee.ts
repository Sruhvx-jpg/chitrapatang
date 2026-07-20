import { pgTable, uuid, varchar, timestamp, pgEnum } from "drizzle-orm/pg-core";
import { usersTable } from "../user/user";
import { workspacesTable } from "../workspace/workspace";

export const employeeStatusEnum = pgEnum("employee_status", [
  "pending",
  "active",
  "rejected",
  "revoked",
]);

export const employeesTable = pgTable("employees", {
  id: uuid("id").primaryKey().defaultRandom(),
  workspaceId: uuid("workspace_id")
    .notNull()
    .references(() => workspacesTable.workspaceId, { onDelete: "cascade" }),
  userId: uuid("user_id").references(() => usersTable.id, { onDelete: "cascade" }),
  role: varchar("role", { length: 100 }).notNull(),
  inviteCode: varchar("invite_code", { length: 255 }).unique(),
  status: employeeStatusEnum("status").default("pending").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()).notNull(),
});

export type SelectEmployee = typeof employeesTable.$inferSelect;
export type InsertEmployee = typeof employeesTable.$inferInsert;
