import WebSocket, { WebSocketServer } from "ws";
import { uuid } from "uuidv4";
import http from "http";

const PORT = process.env.PORT || 3000;

const connections = {};

const server = http.createServer();
const wss = new WebSocketServer({ server });
server.listen(PORT, () => {
  console.log(`WebSocket server is running on http://localhost:${PORT}`);
});

wss.on("connection", (ws, req) => {
  const headers = req.headers;
  const userId = headers["sec-websocket-protocol"];
  // TODO verify token in headers["sec-websocket-protocol"]
  console.log(`Received a new connection ${userId}`);

  connections[userId] = ws;

  ws.on("error", console.error);

  ws.on("message", function message(buffer, isBinary) {
    const { receiverId, message } = JSON.parse(buffer.toString());
    console.log(receiverId);

    // Sending message to desired recipient only
    if (connections[receiverId]) {
      // Adding more to the message
      const newBuffer = Buffer.from(
        JSON.stringify({ senderId: userId, receiverId, message }),
        "utf8"
      );
      console.log(newBuffer);
      connections[receiverId].send(newBuffer, { binary: isBinary });
    }

    // wss.clients.forEach(function each(client) {
    //   if (client.readyState === WebSocket.OPEN) {
    //     client.send(data, { binary: isBinary });
    //   }
    // });
  });

  ws.on("close", function close() {
    console.log("Disconnected client");
  });
});
