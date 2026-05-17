import test from "ava";
import { app } from "../src/app.js";
import { wss } from "../src/ws.js";
import { server } from "../src/server.js";

test.serial("GET / returns 200", async (t) => {
    const res = await app.request("/");
    t.is(res.status, 200);
});

test.serial("POST /add-todo creates todo", async (t) => {
    const res = await app.request("/add-todo?user=1", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Cookie: "userId=1"
        },
        body: new URLSearchParams({
            title: "Test todo",
            priority: "high",
        }).toString(),
    });
    t.is(res.status, 302);
});

test.serial("POST /add-todo with authentication", async (t) => {
    const res = await app.request("/add-todo?user=1", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Cookie": "userId=1",
        },
        body: new URLSearchParams({
            title: "Test todo",
            priority: "high",
        }).toString(),
    });
    t.is(res.status, 302);
});


test.after.always(() => {
    wss.close();
    server.close();
});