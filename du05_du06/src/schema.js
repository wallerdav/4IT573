import { sqliteTable, int, text } from 'drizzle-orm/sqlite-core'

export const todosTable = sqliteTable('todos', {
  id: int().primaryKey({ autoIncrement: true }),
  title: text().notNull(),
  priority: text({ enum: ['low', 'normal', 'high'] }).notNull().default('normal'),
  done: int({ mode: 'boolean' }).notNull(),
})
