import { createServer } from "http";
import { readFile } from "fs";
import { join, extname } from "path";

const MIME_TYPES = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "application/javascript",
  ".txt": "text/plain",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",  
  ".pdf": "application/pdf",
};

createServer((req, res) => {
  const filePath = req.url === "/" ? "index.html" : join("public", req.url);
  const mimeType = MIME_TYPES[extname(filePath)] || "application/octet-stream";

  readFile(filePath, (err, data) => {
    if (err) {
      readFile("404.html", (err404, data404) => {
        res.writeHead(404, { "Content-Type": "text/html" });
        res.end(data404 || "404 Not Found");
      });
    } else {
      res.writeHead(200, { "Content-Type": mimeType });
      res.end(data);
    }
  });
}).listen(3000, () => console.log("Server runs on http://localhost:3000"));