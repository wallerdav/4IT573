import { WebSocketServer } from "ws";

export const wss = new WebSocketServer({ noServer: true });

const clients = new Set();

wss.on("connection", (ws) => {
    clients.add(ws);
    ws.on("close", () => clients.delete(ws));
});

export function broadcast(data) {
    const msg = JSON.stringify(data);
    for (const c of clients) c.send(msg);
}