import { pgTable, uuid, text } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
    id: uuid("id").primaryKey().defaultRandom(),
    createdAt: text("created_at").notNull(),
    updatedAt: text("updated_at").notNull(),
    name: text("name").notNull(),
    apiKey: text("api_key").notNull().unique(),
});

export type User = typeof usersTable.$inferSelect;
export type NewUser = typeof usersTable.$inferInsert;

export const notesTable = pgTable("notes", {
    id: uuid("id").primaryKey().defaultRandom(),
    createdAt: text("created_at").notNull(),
    updatedAt: text("updated_at").notNull(),
    note: text("note").notNull(),
    userId: text("user_id")
        .notNull()
        .references(() => usersTable.id, { onDelete: "cascade" }),
});


export type Note = typeof notesTable.$inferSelect;
export type NewNote = typeof notesTable.$inferInsert;
