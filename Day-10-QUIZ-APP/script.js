let currentQuestionIndex = 0;
let score = 0;
let quizData = [];
const passingScore = 7;  


const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');
const restartBtn = document.getElementById('restart-btn');
const startContainer = document.getElementById('start-container');
const quizContainer = document.getElementById('quiz-container');
const questionEl = document.getElementById('question');
const answersEl = document.getElementById('answers');
const resultContainer = document.getElementById('result-container');
const resultMessage = document.getElementById('result-message');

// Start the quiz
startBtn.onclick = () => {
  startContainer.classList.add('hidden');
  quizContainer.classList.remove('hidden');
  fetchQuestions();
};

// Fetch quiz questions
async function fetchQuestions() {
  const response = await fetch('https://opentdb.com/api.php?amount=10&type=multiple');
  const data = await response.json();
  quizData = data.results;
  console.log(quizData);
  
  displayQuestion();
}

// Display current question
function displayQuestion() {
  // Hide the Next button until an answer is selected
  nextBtn.classList.add('hidden');
  console.log(currentQuestionIndex);
  

  // If we've run out of questions, show the result
  if (currentQuestionIndex >= quizData.length) {
    showResult();
    console.log("result");
    
    return;
  }

  const questionData = quizData[currentQuestionIndex];
  questionEl.textContent = decodeHTML(questionData.question);

  // Shuffle and display answers
  const answers = [...questionData.incorrect_answers, questionData.correct_answer];
  answers.sort(() => Math.random() - 0.5);

  answersEl.innerHTML = '';  // Clear previous answers
  answers.forEach(answer => {
    const li = document.createElement('li');
    li.className = 'bg-blue-500 text-white py-2 px-4 rounded-lg cursor-pointer hover:bg-blue-600';
    li.textContent = decodeHTML(answer);
    li.onclick = () => checkAnswer(answer);  // Check the clicked answer
    answersEl.appendChild(li);
  });
}

// Check if the selected answer is correct
function checkAnswer(answer) {
  const correctAnswer = quizData[currentQuestionIndex].correct_answer;

  if (answer === correctAnswer) {
    score++;
  } 

  // Move to the next question
  currentQuestionIndex++;
  nextBtn.classList.remove('hidden');  // Show the Next button after an answer is selected
}

// Show the final result based on the score
function showResult() {
  // Hide the quiz and display the result
  quizContainer.classList.add('hidden');
  resultContainer.classList.remove('hidden');
  console.log(resultContainer);
  

  if (score >= passingScore) {
    resultMessage.textContent = `Congratulations! You passed with a score of ${score} / ${quizData.length}. 🎉`;
    resultMessage.classList.remove('text-red-600');
    resultMessage.classList.add('text-green-600');
  } else {
    resultMessage.textContent = `You failed with a score of ${score} / ${quizData.length}. Try again!`;
    resultMessage.classList.remove('text-green-600');
    resultMessage.classList.add('text-red-600');
    restartBtn.classList.remove('hidden');
  }
}

// Restart the quiz
restartBtn.onclick = () => {
  currentQuestionIndex = 0;
  score = 0;
  resultContainer.classList.add('hidden');
  quizContainer.classList.remove('hidden');
  fetchQuestions();  // Fetch new questions for the restarted quiz
};

// Helper function to decode HTML entities (for special characters in questions)
function decodeHTML(html) {
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
}

// Handle the Next button functionality
nextBtn.onclick = () => {
  displayQuestion();  // Load the next question
};
