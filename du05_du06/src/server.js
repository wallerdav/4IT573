import { serve } from "@hono/node-server";
import { app } from "./app.js";
import { wss } from "./ws.js";

export const server = serve(app, (info) => {
    console.log(`Server started on http://localhost:${info.port}`);
});

server.on("upgrade", (req, socket, head) => {
    wss.handleUpgrade(req, socket, head, (ws) => {
        wss.emit("connection", ws, req);
    });
});