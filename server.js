const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const http = require("http");
const WebSocket = require("ws");

const webhookHandler = require("./webhook");
const { addAgent, removeAgent } = require("./agents");

const app = express();

app.use(cors());
app.use(bodyParser.json());

const server = http.createServer(app);

const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {

    console.log("Agent Connected");

    addAgent(ws);

    ws.on("close", () => {
        console.log("Agent Disconnected");
        removeAgent(ws);
    });
});

app.post("/webhook", webhookHandler);

app.get("/", (req, res) => {
    res.send("Server Running");
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log("Server running on port", PORT);
});
