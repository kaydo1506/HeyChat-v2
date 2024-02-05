const WebSocket = require('ws');
const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, 'build')));

const myServer = app.listen(8080); // regular http server using node express which serves your webpage

const wsServer = new WebSocket.Server({
  noServer: true,
});
// a websocket server

wsServer.on('connection', function (ws) {
  // Set up an event listener for new WebSocket connections.
  console.log('connection established');
  // For each connection, sets up an event listener for messages.
  ws.on('message', function (msg) {
    console.log('received: %s', msg);
    // Broadcast
    // Iterates over all clients currently connected to the WebSocket server.
    wsServer.clients.forEach(function each(client) {
      //  Checks if the client's connection is still open. This is necessary because a client might have disconnected.
      if (client.readyState === WebSocket.OPEN) {
        client.send(msg);
      }
    });
  });

  ws.on('close', () => {
    console.log('Client has disconnected');
  });
});

  //  Listens for upgrade events on the HTTP server. The upgrade event is used to switch from HTTP to WebSocket
myServer.on('upgrade', async function upgrade(request, socket, head) {
  //  Uses a random number to decide whether to accept or reject the upgrade request. This is just for demonstration and not a pattern to follow in production.
  if (Math.random() > 0.5) {
    return socket.end('HTTP/1.1 401 Unauthorized\r\n', 'ascii'); //proper connection close in case of rejection
  }

  //emit connection when request accepted
  wsServer.handleUpgrade(request, socket, head, function done(ws) {
    wsServer.emit('connection', ws, request);
    console.log('user has connected!');
  });
});

console.log('WebSocket server started on port 8080');
