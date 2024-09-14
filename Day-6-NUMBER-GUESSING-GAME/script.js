// script.js
let randomNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;

document.getElementById('submitGuess').addEventListener('click', function() {
    const userInput = document.getElementById('userInput').value;
    attempts++;

    if (userInput == randomNumber) {
        document.getElementById('message').innerHTML = `🎉 Congratulations! You guessed the number in ${attempts} tries!`;
        document.getElementById('restartGame').classList.remove('hidden');
        document.getElementById('submitGuess').classList.add('hidden');
    } else if (userInput > randomNumber) {
        document.getElementById('message').innerHTML = "📉 Too high! Try again.";
    } else if (userInput < randomNumber) {
        document.getElementById('message').innerHTML = "📈 Too low! Try again.";
    }
});

document.getElementById('restartGame').addEventListener('click', function() {
    randomNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 0;
    document.getElementById('userInput').value = '';
    document.getElementById('message').innerHTML = '';
    document.getElementById('restartGame').classList.add('hidden');
    document.getElementById('submitGuess').classList.remove('hidden');
});
