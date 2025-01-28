const apiKey = "9549d8982c8243d9a107adfd786a43c9";  // Your API key
let language = "en"; // Default language

const recipesContainer = document.getElementById("recipes-container");
const searchInput = document.getElementById("search-input");
const recipeModal = document.getElementById("recipe-modal");
const toggleLangButton = document.getElementById("toggle-lang");

let recipesData = [];  // To store fetched recipes

// Fetch Recipes from API
async function fetchRecipes(query = '') {
    const apiUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${query}&number=10`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        recipesData = data.results;
        displayRecipes(recipesData);
    } catch (error) {
        console.error('Error fetching recipes:', error);
    }
}

// Display Recipe Cards
function displayRecipes(recipes) {
    recipesContainer.innerHTML = '';
    recipes.forEach(recipe => {
        const card = document.createElement("div");
        card.classList.add("recipe-card");
        card.innerHTML = `
            <img src="https://spoonacular.com/recipeImages/${recipe.id}-480x360.jpg" alt="${recipe.title}">
            <div class="recipe-card-content">
                <h3 class="recipe-title">${recipe.title}</h3>
            </div>
        `;
        card.onclick = () => showRecipeDetails(recipe.id);
        recipesContainer.appendChild(card);
    });
}

// Show Recipe Details in Modal
async function showRecipeDetails(recipeId) {
    const apiUrl = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}`;
    
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        document.getElementById("recipe-title").textContent = data.title;
        document.getElementById("recipe-image").src = data.image;
        document.getElementById("recipe-details").innerHTML = `
            <p><strong>Time:</strong> ${data.readyInMinutes} minutes</p>
            <p><strong>Servings:</strong> ${data.servings}</p>
        `;
        document.getElementById("recipe-ingredients").innerHTML = `
            <h3>Ingredients</h3>
            <ul>${data.extendedIngredients.map(ingredient => `<li>${ingredient.original}</li>`).join('')}</ul>
        `;
        document.getElementById("recipe-instructions").innerHTML = `
            <h3>Instructions</h3>
            <p>${data.instructions}</p>
        `;
        recipeModal.style.display = "block";
    } catch (error) {
        console.error('Error fetching recipe details:', error);
    }
}

// Close Modal
function closeModal() {
    recipeModal.style.display = "none";
}

// Toggle Language
function toggleLanguage() {
    if (language === "en") {
        language = "de";
        toggleLangButton.textContent = "Switch to English";
        // Here you would fetch German recipes or content.
    } else {
        language = "en";
        toggleLangButton.textContent = "Switch to Deutsch";
    }
}

// Dark Mode Toggle
document.body.classList.add("light-mode");

function toggleTheme() {
    if (document.body.classList.contains("light-mode")) {
        document.body.classList.remove("light-mode");
        document.body.classList.add("dark-mode");
    } else {
        document.body.classList.remove("dark-mode");
        document.body.classList.add("light-mode");
    }
}

// Initialize
window.onload = () => {
    fetchRecipes();
    toggleLangButton.addEventListener('click', toggleLanguage);
    document.getElementById("toggle-theme").addEventListener('click', toggleTheme);
}
