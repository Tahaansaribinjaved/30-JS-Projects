// app.js

// WebSocket connection to the server
const socket = new WebSocket('ws://localhost:8080');

// Element to display notifications
const notificationsContainer = document.getElementById('notifications');

// Listen for messages from the WebSocket server
socket.addEventListener('message', (event) => {
  // Parse the incoming message from the server
  const data = JSON.parse(event.data);
  console.log(data);
  

  // Call the function to display the notification
  showNotification(data.type, data.message);
});

// Function to display different types of notifications
function showNotification(type, message) {
  const notificationElement = document.createElement('div');
  notificationElement.classList.add('p-4', 'rounded', 'shadow', 'notification', 'text-gray-700', 'border-l-4', 'mb-4');

  // Customize notification styles based on the message type
  switch(type) {
    case 'success':
      notificationElement.classList.add('bg-green-100', 'border-green-500');
      notificationElement.textContent = `✅ Success: ${message}`;
      break;
    case 'error':
      notificationElement.classList.add('bg-red-100', 'border-red-500');
      notificationElement.textContent = `❌ Error: ${message}`;
      break;
    case 'info':
      notificationElement.classList.add('bg-blue-100', 'border-blue-500');
      notificationElement.textContent = `ℹ️ Info: ${message}`;
      break;
    case 'warning':
      notificationElement.classList.add('bg-yellow-100', 'border-yellow-500');
      notificationElement.textContent = `⚠️ Warning: ${message}`;
      break;
    case 'new-message':
      notificationElement.classList.add('bg-purple-100', 'border-purple-500');
      notificationElement.textContent = `📩 New Message: ${message}`;
      break;
    default:
      notificationElement.classList.add('bg-gray-100', 'border-gray-500');
      notificationElement.textContent = `🔔 Notification: ${message}`;
  }

  notificationsContainer.appendChild(notificationElement);

  // Auto-dismiss the notification after 5 seconds
  setTimeout(() => {
    notificationElement.classList.add('opacity-0', 'transition-opacity', 'duration-500');
    setTimeout(() => notificationElement.remove(), 500); // Remove element after fade out
  }, 5000);
}
