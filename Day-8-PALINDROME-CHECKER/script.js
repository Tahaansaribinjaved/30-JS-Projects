document.getElementById('checkButton').addEventListener('click', function() {
    const inputString = document.getElementById('inputString').value;
    const resultElement = document.getElementById('result');
  
    if (inputString === '') {
      resultElement.textContent = 'Please enter a word or number!';
      resultElement.className = 'text-red-500';
      return;
    }
  
    const cleanedString = inputString.toLowerCase().replace(/[^a-z0-9]/g, '');
    const reversedString = cleanedString.split('').reverse().join('');
  
    if (cleanedString === reversedString) {
      resultElement.textContent = `"${inputString}" is a Palindrome!`;
      resultElement.className = 'text-green-500';
    } else {
      resultElement.textContent = `"${inputString}" is not a Palindrome.`;
      resultElement.className = 'text-red-500';
    }
  });
  