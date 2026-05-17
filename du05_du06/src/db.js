import { drizzle } from "drizzle-orm/libsql";
import { todosTable } from "./schema.js";
import { eq, and } from "drizzle-orm";

export const db = drizzle({
    connection: "file:db.sqlite",
});