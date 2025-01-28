// Spoonacular API key
const API_KEY = '9549d8982c8243d9a107adfd786a43c9';
const apiUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&query=`;

// DOM Elements
const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');
const recipeContainer = document.getElementById('recipe-container');
const recommendationsContainer = document.getElementById('recommendations-container');
const favoritesContainer = document.getElementById('favorites-container');
const toggleLangButton = document.getElementById('toggle-lang-button');
const appTitle = document.getElementById('app-title');
const introText = document.getElementById('intro-text');
const footerText = document.getElementById('footer-text');
const recipeModal = document.getElementById('recipe-modal');
const modalTitle = document.getElementById('modal-title');
const modalIngredients = document.getElementById('modal-ingredients');
const modalInstructions = document.getElementById('modal-instructions');
const closeBtn = document.getElementsByClassName('close-btn')[0];

// Search Button Listener
searchButton.addEventListener('click', searchRecipes);

// Toggle Language Button Listener
toggleLangButton.addEventListener('click', toggleLanguage);

// Search Recipes Function
async function searchRecipes() {
  const query = searchInput.value.trim();
  if (!query) return;

  const response = await fetch(`${apiUrl}${query}`);
  const data = await response.json();

  if (data.results.length === 0) {
    alert('No recipes found!');
    return;
  }

  displayRecipes(data.results);
}

// Display Recipes
function displayRecipes(recipes) {
  recipeContainer.innerHTML = '';
  recipes.forEach(recipe => {
    const recipeCard = document.createElement('div');
    recipeCard.classList.add('recipe-card');
    recipeCard.innerHTML = `
      <img src="${recipe.image}" alt="${recipe.title}">
      <h3>${recipe.title}</h3>
      <p>Ready in ${recipe.readyInMinutes} minutes</p>
      <button onclick="openRecipeModal(${recipe.id})">View Recipe</button>
    `;
    recipeContainer.appendChild(recipeCard);
  });

  // Show recommendations (for demo purposes, we'll show a static list)
  const recommendations = ['Recipe 1', 'Recipe 2', 'Recipe 3'];
  recommendationsContainer.innerHTML = '';
  recommendations.forEach(rec => {
    const recCard = document.createElement('div');
    recCard.classList.add('recipe-card');
    recCard.innerHTML = `
      <h3>${rec}</h3>
      <button>Explore</button>
    `;
    recommendationsContainer.appendChild(recCard);
  });
}

// Open Recipe Modal
async function openRecipeModal(recipeId) {
  const response = await fetch(`https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${API_KEY}`);
  const recipe = await response.json();

  modalTitle.innerText = recipe.title;
  modalIngredients.innerHTML = `<strong>Ingredients:</strong><ul>${recipe.extendedIngredients.map(ingredient => `<li>${ingredient.original}</li>`).join('')}</ul>`;
  modalInstructions.innerHTML = `<strong>Instructions:</strong><p>${recipe.instructions}</p>`;

  recipeModal.style.display = 'flex';
}

// Close Recipe Modal
closeBtn.addEventListener('click', () => {
  recipeModal.style.display = 'none';
});

// Toggle Language
function toggleLanguage() {
  const currentLang = toggleLangButton.innerText;
  if (currentLang === 'Switch to Deutsch') {
    toggleLangButton.innerText = 'Switch to English';
    appTitle.innerText = 'Rezept Finder & Mahlzeiten Planer';
    introText.innerText = 'Finden Sie Ihre Lieblingsgerichte hier! Geben Sie Zutaten ein, die Sie zu Hause haben, und wir helfen Ihnen, köstliche Rezepte zu entdecken.';
    footerText.innerText = 'Erstellt mit 💻 von Sunshine Remollo';
  } else {
    toggleLangButton.innerText = 'Switch to Deutsch';
    appTitle.innerText = 'Recipe Finder & Meal Planner';
    introText.innerText = 'Find your favorite meals here! Enter ingredients you have at home, and we\'ll help you discover delicious recipes.';
    footerText.innerText = 'Created with 💻 by Sunshine Remollo';
  }
}
