import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const examplesTable = pgTable("examples", {
  id: uuid("id").defaultRandom().primaryKey(),
  author: text("author").notNull(),
  title: text("title").notNull(),
  coverUrl: text("cover_url").default(""),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type InsertExample = typeof examplesTable.$inferInsert;
export type SelectExample = typeof examplesTable.$inferSelect;
