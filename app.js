// Spoonacular API key
const API_KEY = '9549d8982c8243d9a107adfd786a43c9';
const apiUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&query=`;

// DOM Elements
const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');
const recipeContainer = document.getElementById('recipe-container');
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
      <button class="view-recipe-btn" data-id="${recipe.id}">View Recipe</button>
      <button class="add-to-favorites-btn" data-id="${recipe.id}">Add to Favorites</button>
    `;
    recipeContainer.appendChild(recipeCard);

    // View Recipe Button Listener
    const viewRecipeButton = recipeCard.querySelector('.view-recipe-btn');
    viewRecipeButton.addEventListener('click', () => viewRecipeDetails(recipe.id));

    // Add to Favorites Button Listener
    const addToFavoritesButton = recipeCard.querySelector('.add-to-favorites-btn');
    addToFavoritesButton.addEventListener('click', () => addToFavorites(recipe));
  });
}

// View Recipe Details in Modal
async function viewRecipeDetails(id) {
  const response = await fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`);
  const data = await response.json();

  modalTitle.innerText = data.title;
  modalIngredients.innerHTML = `<strong>Ingredients:</strong><ul>${data.extendedIngredients.map(ingredient => `<li>${ingredient.original}</li>`).join('')}</ul>`;
  modalInstructions.innerHTML = `<strong>Instructions:</strong><p>${data.instructions}</p>`;
  
  recipeModal.style.display = 'flex';
}

// Close Modal
closeBtn.addEventListener('click', () => {
  recipeModal.style.display = 'none';
});

// Add to Favorites
function addToFavorites(recipe) {
  const favoriteRecipe = document.createElement('div');
  favoriteRecipe.classList.add('recipe-card');
  favoriteRecipe.innerHTML = `
    <img src="${recipe.image}" alt="${recipe.title}">
    <h3>${recipe.title}</h3>
  `;
  favoritesContainer.appendChild(favoriteRecipe);
}

// Toggle Language Function
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
