// server.js
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

// Function to simulate sending random notifications
function sendRandomNotification(ws) {
  const messages = [
    { type: 'success', message: 'Profile updated successfully!' },
    { type: 'error', message: 'Failed to fetch data from the server.' },
    { type: 'info', message: 'New features are available.' },
    { type: 'warning', message: 'Your subscription is expiring soon.' },
    { type: 'new-message', message: 'You received a new message!' }
  ];

  // Pick a random message from the array
  const randomMessage = messages[Math.floor(Math.random() * messages.length)];

  // Send the random message to the client
  ws.send(JSON.stringify(randomMessage));
}

wss.on('connection', (ws) => {
  console.log('Client connected');

  // Send a random notification every 5 seconds
  setInterval(() => {
    sendRandomNotification(ws);
  }, 5000);
});
