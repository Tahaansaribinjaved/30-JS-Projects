const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 8080 });

server.on('connection', socket => {
  console.log('A user connected');

  socket.on('message', message => {
    // Ensure we are sending the message as a string
    const messageString = message.toString();

    // Broadcast the message to all connected clients
    server.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(messageString);  // Ensure message is a string
      }
    });
  });

  socket.on('close', () => {
    console.log('A user disconnected');
  });
});

console.log('WebSocket server is running on ws://localhost:8080');
