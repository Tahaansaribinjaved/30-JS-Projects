const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

let currentInput = '';
let previousInput = '';
let operator = null;

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.textContent;

    if (value === 'Clear') {
      clear();
    } else if (['+', '-', '*', '/'].includes(value)) {
      setOperator(value);
    } else if (value === '=') {
      calculate();
    } else {
      appendNumber(value);
    }
  });
});

function clear() {
  currentInput = '';
  previousInput = '';
  operator = null;
  updateDisplay();
}

function setOperator(op) {
  if (currentInput === '') return;
  if (previousInput !== '') {
    calculate();
  }
  operator = op;
  previousInput = currentInput;
  currentInput = '';
}

function calculate() {
  if (operator === null || currentInput === '' || previousInput === '') return;

  let result;
  const prev = parseFloat(previousInput);
  const current = parseFloat(currentInput);

  switch (operator) {
    case '+':
      result = prev + current;
      break;
    case '-':
      result = prev - current;
      break;
    case '*':
      result = prev * current;
      break;
    case '/':
      result = prev / current;
      break;
    default:
      return;
  }

  currentInput = result.toString();
  operator = null;
  previousInput = '';
  updateDisplay();
}

function appendNumber(number) {
  currentInput += number;
  updateDisplay();
}

function updateDisplay() {
  display.value = currentInput;
}
