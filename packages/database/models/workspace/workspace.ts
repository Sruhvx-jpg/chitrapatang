import { pgTable, uuid, integer, timestamp } from "drizzle-orm/pg-core";
import { usersTable } from "../user/user";

export const workspacesTable = pgTable("workspaces", {
  workspaceId: uuid("workspace_id").primaryKey().defaultRandom(),
  ownerId: uuid("owner_id")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  channelThreshold: integer("channel_threshold").default(4).notNull(),
  channelsCount: integer("channels_count").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()).notNull(),
});

export type SelectWorkspace = typeof workspacesTable.$inferSelect;
export type InsertWorkspace = typeof workspacesTable.$inferInsert;
