const apiKey = '9549d8982c8243d9a107adfd786a43c9';
const searchButton = document.getElementById('search-button');
const recipeCards = document.getElementById('recipe-cards');
const recipeModal = document.getElementById('recipe-modal');
const closeModalBtn = document.querySelector('.close-btn');
const mealTypeSelect = document.getElementById('meal-type');
const ingredientsInput = document.getElementById('ingredients');
const toggleLangButton = document.getElementById('toggle-lang');
const appTitle = document.getElementById('app-title');
const introText = document.getElementById('intro-text');
const footerText = document.getElementById('footer-text');

// Function to fetch recipes based on user input
async function searchRecipes() {
  const ingredients = ingredientsInput.value;
  const mealType = mealTypeSelect.value;
  const url = `https://api.spoonacular.com/recipes/complexSearch?type=${mealType}&ingredients=${ingredients}&apiKey=${apiKey}`;

  const response = await fetch(url);
  const data = await response.json();
  displayRecipes(data.results);
}

// Function to display recipes
function displayRecipes(recipes) {
  recipeCards.innerHTML = ''; // Clear previous results
  recipes.forEach(recipe => {
    const card = document.createElement('div');
    card.classList.add('recipe-card');
    card.innerHTML = `
      <img src="${recipe.image}" alt="${recipe.title}">
      <h3>${recipe.title}</h3>
    `;
    card.onclick = () => showRecipeDetails(recipe.id);
    recipeCards.appendChild(card);
  });
}

// Function to show recipe details in the modal
async function showRecipeDetails(recipeId) {
  const url = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}`;
  const response = await fetch(url);
  const recipeDetails = await response.json();
  
  document.getElementById('recipe-title').innerText = recipeDetails.title;
  document.getElementById('recipe-image').src = recipeDetails.image;
  document.getElementById('recipe-time').innerText = `Cooking Time: ${recipeDetails.readyInMinutes} minutes`;
  document.getElementById('recipe-ingredients').innerHTML = recipeDetails.extendedIngredients.map(ingredient => `<li>${ingredient.original}</li>`).join('');
  document.getElementById('recipe-instructions').innerText = recipeDetails.instructions;
  
  recipeModal.style.display = 'flex';
}

// Close the modal
closeModalBtn.onclick = () => recipeModal.style.display = 'none';
window.onclick = event => {
  if (event.target === recipeModal) {
    recipeModal.style.display = 'none';
  }
}

// Language toggle functionality
function toggleLanguage() {
  if (appTitle.innerHTML === 'Recipe Finder & Meal Planner') {
    appTitle.innerHTML = 'Rezeptfinder & Essensplaner';
    introText.innerHTML = 'Willkommen beim Rezeptfinder & Essensplaner. Diese App hilft Ihnen, Rezepte basierend auf den Zutaten zu finden, die Sie zu Hause haben.';
    footerText.innerHTML = 'Erstellt mit 💻 von Sunshine Remollo';
    toggleLangButton.innerHTML = 'Switch to English';
  } else {
    appTitle.innerHTML = 'Recipe Finder & Meal Planner';
    introText.innerHTML = 'Find your favorite meals here! Enter ingredients you have at home, and we\'ll help you discover delicious recipes.';
    footerText.innerHTML = 'Created with 💻 by Sunshine Remollo';
    toggleLangButton.innerHTML = 'Switch to Deutsch';
  }
}

// Event listener for the search button
searchButton.onclick = searchRecipes;
