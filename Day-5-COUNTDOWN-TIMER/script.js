const timerDisplay = document.getElementById('timer');
const startBtn = document.getElementById('start-btn');
const resetBtn = document.getElementById('reset-btn');

let countdown;
let countdownTime = 60 * 60; // Countdown time in seconds (e.g., 1 hour)

function updateTimer() {
  const hours = Math.floor(countdownTime / 3600);
  const minutes = Math.floor((countdownTime % 3600) / 60);
  const seconds = countdownTime % 60;

  timerDisplay.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  if (countdownTime > 0) {
    countdownTime--;
  } else {
    clearInterval(countdown);
  }
}

startBtn.addEventListener('click', () => {
  clearInterval(countdown); // Clear any previous intervals
  countdown = setInterval(updateTimer, 1000); // Update timer every second
});

resetBtn.addEventListener('click', () => {
  clearInterval(countdown); // Clear interval
  countdownTime = 60 * 60; // Reset to 1 hour
  updateTimer();
});


