import { pgTable, uuid, varchar, timestamp } from "drizzle-orm/pg-core";
import { workspacesTable } from "./workspace";

export const workspaceChannelsTable = pgTable("workspace_channels", {
  channelId: uuid("channel_id").primaryKey().defaultRandom(),
  workspaceId: uuid("workspace_id")
    .notNull()
    .references(() => workspacesTable.workspaceId, { onDelete: "cascade" }),
  channelName: varchar("channel_name", { length: 100 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()).notNull(),
});

export type SelectWorkspaceChannel = typeof workspaceChannelsTable.$inferSelect;
export type InsertWorkspaceChannel = typeof workspaceChannelsTable.$inferInsert;
