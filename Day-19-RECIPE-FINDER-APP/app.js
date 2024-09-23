const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');
const recipesDiv = document.getElementById('recipes');
const loadingSpinner = document.getElementById('loadingSpinner');
const errorMessage = document.getElementById('errorMessage');

searchBtn.addEventListener('click', () => {
  const query = searchInput.value.trim();
  if (query) {
    searchRecipes(query);
  }
});

async function searchRecipes(query) {
  const apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;
  loadingSpinner.classList.remove('hidden');
  errorMessage.classList.add('hidden');
  recipesDiv.innerHTML = ''; // Clear previous results

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    loadingSpinner.classList.add('hidden');
    displayRecipes(data.meals);
  } catch (error) {
    loadingSpinner.classList.add('hidden');
    errorMessage.textContent = "An error occurred while fetching data. Please try again later!";
    errorMessage.classList.remove('hidden');
  }
}


function displayRecipes(meals) {
    if (meals) {
      meals.forEach(meal => {
        const recipeCard = document.createElement('div');
        recipeCard.classList.add('bg-white', 'rounded', 'shadow', 'p-4', 'hover:shadow-lg', 'transition');
        
        const ingredients = getIngredientsList(meal);
        const truncatedInstructions = meal.strInstructions.substring(0, 100);
        const fullInstructions = meal.strInstructions;
  
        recipeCard.innerHTML = `
          <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="w-full h-48 object-cover rounded">
          <h2 class="text-xl font-semibold mt-4">${meal.strMeal}</h2>
          <p class="mt-2 text-gray-600"><strong>Category:</strong> ${meal.strCategory}</p>
          <p class="mt-2 text-gray-600"><strong>Cuisine:</strong> ${meal.strArea}</p>
          <p class="mt-2 text-gray-600"><strong>Ingredients:</strong></p>
          <ul class="list-none mt-2">
            ${ingredients.map(ingredient => `<li class="flex items-center"><span class="mr-2">➤</span>${ingredient}</li>`).join('')}
          </ul>
          <p class="mt-4 text-gray-600"><strong>Instructions:</strong></p>
          <p id="truncatedInstructions-${meal.idMeal}" class="text-gray-600">${truncatedInstructions}...</p>
          <p id="fullInstructions-${meal.idMeal}" class="text-gray-600 hidden">${fullInstructions}</p>
          <a href="#" id="toggleInstructions-${meal.idMeal}" class="text-blue-500 mt-2 inline-block">Show more</a><br/>
          <a href="${meal.strYoutube}" class="text-blue-500 mt-2 inline-block" target="_blank">Watch on YouTube</a>
        `;
  
        recipesDiv.appendChild(recipeCard);
  
        // Add event listener for toggling instructions
        const toggleBtn = document.getElementById(`toggleInstructions-${meal.idMeal}`);
        const truncatedPara = document.getElementById(`truncatedInstructions-${meal.idMeal}`);
        const fullPara = document.getElementById(`fullInstructions-${meal.idMeal}`);
  
        toggleBtn.addEventListener('click', (e) => {
          e.preventDefault();
          if (truncatedPara.classList.contains('hidden')) {
            truncatedPara.classList.remove('hidden');
            fullPara.classList.add('hidden');
            toggleBtn.textContent = 'Show more';
          } else {
            truncatedPara.classList.add('hidden');
            fullPara.classList.remove('hidden');
            toggleBtn.textContent = 'Show less';
          }
        });
      });
    } else {
      errorMessage.classList.remove('hidden');
    }
  }
  
  function getIngredientsList(meal) {
    let ingredients = [];
    for (let i = 1; i <= 20; i++) {
      let ingredient = meal[`strIngredient${i}`];
      let measure = meal[`strMeasure${i}`];
      if (ingredient && ingredient.trim() !== "") {
        ingredients.push(`${measure} ${ingredient}`);
      }
    }
    return ingredients;
  }
  