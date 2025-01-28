const apiKey = '9549d8982c8243d9a107adfd786a43c9';
const searchButton = document.getElementById('search-button');
const recipeCards = document.getElementById('recipe-cards');
const recipeModal = document.getElementById('recipe-modal');
const closeModalBtn = document.querySelector('.close-btn');
const mealTypeSelect = document.getElementById('meal-type');
const ingredientsInput = document.getElementById('ingredients');
const recommendationsButton = document.getElementById('recommendations-button');
const recommendationsSection = document.getElementById('recommendations-section');

// Function to fetch recipes based on user input
async function searchRecipes() {
  const ingredients = ingredientsInput.value;
  const mealType = mealTypeSelect.value;

  if (!ingredients) {
    alert("Please enter some ingredients!");
    return;
  }

  const response = await fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&type=${mealType}&apiKey=${apiKey}`);
  const data = await response.json();

  if (data.length === 0) {
    recipeCards.innerHTML = '<p>No recipes found. Try different ingredients.</p>';
    return;
  }

  recipeCards.innerHTML = data.map(recipe => `
    <div class="recipe-card" onclick="showRecipeDetails(${recipe.id})">
      <img src="${recipe.image}" alt="${recipe.title}" />
      <h3>${recipe.title}</h3>
    </div>
  `).join('');
}

// Function to show detailed recipe information in the modal
async function showRecipeDetails(recipeId) {
  const response = await fetch(`https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}`);
  const recipeDetails = await response.json();

  document.getElementById('recipe-title').innerText = recipeDetails.title;
  document.getElementById('recipe-image').src = recipeDetails.image;
  document.getElementById('recipe-time').innerText = `Time: ${recipeDetails.readyInMinutes} minutes`;
  document.getElementById('recipe-ingredients').innerHTML = recipeDetails.extendedIngredients.map(ingredient => `
    <li>${ingredient.original}</li>
  `).join('');
  document.getElementById('recipe-instructions').innerText = recipeDetails.instructions;

  recipeModal.style.display = 'flex';
}

// Function to close the modal
closeModalBtn.onclick = () => {
  recipeModal.style.display = 'none';
};

// Function to toggle language between English and German
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

// Event listener for search button
searchButton.onclick = searchRecipes;
