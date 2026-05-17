import { Hono } from "hono";
import ejs from "ejs";

import { db } from "./db.js";
import { todosTable } from "./schema.js";
import { eq, and } from "drizzle-orm";

import { authMiddleware } from "./auth.js";
import { broadcast } from "./ws.js";

export const app = new Hono();

app.use("*", authMiddleware);

app.get("/login", (c) => {
    c.header("Set-Cookie", "userId=1; Path=/");
    return c.text("Logged in as user 1");
});

app.get("/", async (c) => {
    const userId = c.get("userId");
    if (!userId) return c.html("<h1>Not logged in</h1>");

    const todos = await db
        .select()
        .from(todosTable)
        .where(eq(todosTable.userId, userId))
        .all();

    const html = await ejs.renderFile("views/index.html", { todos, userId });
    return c.html(html);
});

app.post("/add-todo", async (c) => {
    const userId = c.get("userId");
    if (!userId) return c.text("Unauthorized", 401);

    const body = await c.req.formData();

    await db.insert(todosTable).values({
        title: body.get("title"),
        priority: body.get("priority") || "normal",
        done: false,
        userId,
    });

    const todos = await db
        .select()
        .from(todosTable)
        .where(eq(todosTable.userId, userId))
        .all();

    broadcast({ type: "todos", data: todos });

    return c.redirect("/");
});

app.get("/toggle-todo/:id", async (c) => {
    const userId = c.get("userId");
    const id = Number(c.req.param("id"));

    const todo = await db
        .select()
        .from(todosTable)
        .where(and(eq(todosTable.id, id), eq(todosTable.userId, userId)))
        .get();

    if (!todo) return c.text("Not found", 404);

    await db
        .update(todosTable)
        .set({ done: !todo.done })
        .where(eq(todosTable.id, id));

    broadcast({ type: "todos" });

    return c.redirect("/");
});


app.post("/update-priority", async (c) => {
    const userId = c.get("userId");

    const body = await c.req.parseBody();
    const id = Number(body.id);
    const priority = body.priority;

    await db
        .update(todosTable)
        .set({ priority })
        .where(eq(todosTable.id, id));

    return c.redirect("/");
});


app.get("/todo/:id", async (c) => {
    const userId = c.get("userId");
    const id = Number(c.req.param("id"));

    const todo = await db
        .select()
        .from(todosTable)
        .where(
            and(
                eq(todosTable.id, id),
                eq(todosTable.userId, userId)
            )
        )
        .get();

    if (!todo) {
        return c.text("Todo not found", 404);
    }

    const html = await ejs.renderFile("views/todo-detail.html", {
        todo,
        userId
    });

    return c.html(html);
});