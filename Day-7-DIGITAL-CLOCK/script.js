function updateClock() {
    const clock = document.getElementById('clock');
    const dateElement = document.getElementById('date');
    
    const now = new Date();
    
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    clock.textContent = `${hours}:${minutes}:${seconds}`;
    
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = now.toLocaleDateString('en-US', options);
    dateElement.textContent = formattedDate;
  }
  
  setInterval(updateClock, 1000);
  updateClock(); // Initial call to display the clock immediately
  