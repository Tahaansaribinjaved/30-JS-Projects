let workTime = 25 * 60; // 25 minutes in seconds
let breakTime = 5 * 60; // 5 minutes in seconds
let isWorkSession = true;
let timeRemaining = workTime;
let timerInterval;

const timerElement = document.getElementById('timer');
const statusElement = document.getElementById('status');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');

function updateTimer() {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    timerElement.textContent = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function startTimer() {
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timeRemaining--;
        updateTimer();

        if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            isWorkSession = !isWorkSession;
            timeRemaining = isWorkSession ? workTime : breakTime;
            statusElement.textContent = isWorkSession ? 'Work Session' : 'Break Session';
            updateTimer();
        }
    }, 1000);
}

function pauseTimer() {
    clearInterval(timerInterval);
}

function resetTimer() {
    clearInterval(timerInterval);
    isWorkSession = true;
    timeRemaining = workTime;
    statusElement.textContent = 'Work Session';
    updateTimer();
}

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);

updateTimer(); // initialize timer display
