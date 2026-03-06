let agents = [];

function addAgent(ws) {
    agents.push(ws);
}

function removeAgent(ws) {
    agents = agents.filter(a => a !== ws);
}

function broadcast(message) {
    agents.forEach(agent => {
        if (agent.readyState === 1) {
            agent.send(JSON.stringify(message));
        }
    });
}

module.exports = { addAgent, removeAgent, broadcast };
