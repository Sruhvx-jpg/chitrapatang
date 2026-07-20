import { pgTable, bigserial, uuid, text, timestamp } from "drizzle-orm/pg-core";
import { workspaceChannelsTable } from "./workspaceChannel";
import { usersTable } from "../user/user";

export const messagesTable = pgTable("messages", {
  id: bigserial("id", { mode: "number" }).primaryKey(),
  channelId: uuid("channel_id")
    .notNull()
    .references(() => workspaceChannelsTable.channelId, { onDelete: "cascade" }),
  senderId: uuid("sender_id")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type SelectMessage = typeof messagesTable.$inferSelect;
export type InsertMessage = typeof messagesTable.$inferInsert;
