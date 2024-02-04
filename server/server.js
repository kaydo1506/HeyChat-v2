// server.js
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws)=> {
  console.log('A new client connected!');

  ws.on('message', (message) => {
    console.log('received: %s', message);

    // Broadcast to all clients
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });

  });

  ws.on('close', () => {
    console.log('Client has disconnected');
  });
});

console.log('WebSocket server started on port 8080');
