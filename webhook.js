const { broadcast } = require("./agents");

function webhookHandler(req, res) {

    const data = req.body;

    const message = {
        phone: data.phone || "unknown",
        text: data.message || "no message",
        time: new Date()
    };

    console.log("Incoming Message:", message);

    // Send message to all agents
    broadcast(message);

    res.sendStatus(200);
}

module.exports = webhookHandler;
