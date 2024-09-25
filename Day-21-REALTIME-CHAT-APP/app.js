const chatWindow = document.getElementById('chatWindow');
const chatForm = document.getElementById('chatForm');
const messageInput = document.getElementById('messageInput');

// Establish WebSocket connection (replace with your WebSocket server URL)
const socket = new WebSocket('wss://your-websocket-server-url');

socket.addEventListener('message', function (event) {
  const message = event.data;
  displayMessage(message, 'received');
});

chatForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const message = messageInput.value.trim();
  if (message) {
    socket.send(message);
    displayMessage(message, 'sent');
    messageInput.value = '';
  }
});

function displayMessage(message, type) {
  const messageDiv = document.createElement('div');
  messageDiv.classList.add('my-2', 'p-2', 'rounded-lg', 'w-fit', 'max-w-xs');
  messageDiv.textContent = message;

  if (type === 'sent') {
    messageDiv.classList.add('bg-blue-500', 'text-white', 'ml-auto');
  } else {
    messageDiv.classList.add('bg-gray-200', 'text-black');
  }

  chatWindow.appendChild(messageDiv);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}
