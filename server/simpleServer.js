import WebSocket, { WebSocketServer } from "ws";
import { uuid } from "uuidv4";
import http from "http";

const PORT = process.env.PORT || 8000;

const server = http.createServer();
const wss = new WebSocketServer({ server });
server.listen(PORT, () => {
  console.log(`WebSocket server is running on http://localhost:${PORT}`);
});

wss.on("connection", (ws, req) => {
  const headers = req.headers;
  // TODO verify token in headers["sec-websocket-protocol"]
  console.log(`Received a new connection.`);

  ws.on("error", console.error);

  ws.on("message", function message(data, isBinary) {
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data, { binary: isBinary });
      }
    });
  });

  ws.on("close", function close() {
    console.log("Disconnected client");
  });
});
