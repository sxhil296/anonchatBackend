
import { pgTable,uuid,varchar,timestamp } from "drizzle-orm/pg-core";
import { sql , relations } from 'drizzle-orm';

export const user=pgTable("user",{
    id:uuid().primaryKey().defaultRandom().notNull(),
    name:varchar("name",{length:50}).notNull(),
    message:varchar("message",{length:500}).array().default(sql`'{}'::text[]`),
    createdAt: timestamp('created_at').default(sql`NOW()`),
})
