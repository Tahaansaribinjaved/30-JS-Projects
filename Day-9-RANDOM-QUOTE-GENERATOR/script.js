const quoteDisplay = document.getElementById('quote');
const generateQuoteBtn = document.getElementById('generateQuoteBtn');
const loader = document.getElementById('loader');

// Function to show loader
function showLoader() {
  loader.classList.remove('hidden');
  quoteDisplay.classList.add('hidden');
}

// Function to hide loader
function hideLoader() {
  loader.classList.add('hidden');
  quoteDisplay.classList.remove('hidden');
}

// Function to fetch a random happiness quote from the API
async function fetchQuote() {
  const apiKey = '/v0OLwLvF+u9ds+LecGOtA==MdXSMynCthN7Wpjj';
  const apiUrl = 'https://api.api-ninjas.com/v1/quotes?category=happiness';

  showLoader();
  
  try {
    const response = await fetch(apiUrl, {
      headers: {
        'X-Api-Key': apiKey
      }
    });
    const data = await response.json();
    hideLoader();

    if (data && data.length > 0) {
      quoteDisplay.innerHTML = `&ldquo;${data[0].quote}&rdquo;<br>— <span class="font-bold">${data[0].author}</span>`;
    } else {
      quoteDisplay.textContent = "No quote found. Try again!";
    }
  } catch (error) {
    hideLoader();
    quoteDisplay.textContent = "Oops, something went wrong! Try again later.";
  }
}

generateQuoteBtn.addEventListener('click', fetchQuote);
