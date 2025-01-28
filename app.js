const apiKey = '9549d8982c8243d9a107adfd786a43c9'; // Your Spoonacular API key
const searchButton = document.getElementById('search-button');
const ingredientInput = document.getElementById('ingredient-input');
const recipeList = document.getElementById('recipe-list');
const favoritesList = document.getElementById('favorites-list');

// Function to fetch recipes from the Spoonacular API
async function fetchRecipes(ingredients) {
    const url = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&number=5&apiKey=${apiKey}`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        displayRecipes(data);
    } catch (error) {
        console.error("Error fetching recipes:", error);
    }
}

// Function to display the recipes in the UI
function displayRecipes(recipes) {
    recipeList.innerHTML = '';
    recipes.forEach(recipe => {
        const recipeCard = document.createElement('div');
        recipeCard.classList.add('recipe-card');
        recipeCard.innerHTML = `
            <img src="${recipe.image}" alt="${recipe.title}" />
            <h3>${recipe.title}</h3>
            <p>Used Ingredients: ${recipe.usedIngredientCount}</p>
            <button class="favorite-btn" onclick="addToFavorites('${recipe.id}', '${recipe.title}', '${recipe.image}')">Add to Favorites</button>
        `;
        recipeList.appendChild(recipeCard);
    });
}

// Function to add a recipe to the favorites list
function addToFavorites(id, title, image) {
    const favoriteRecipe = {
        id: id,
        title: title,
        image: image
    };

    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites.push(favoriteRecipe);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    displayFavorites();
}

// Function to display the favorites list
function displayFavorites() {
    favoritesList.innerHTML = '';
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites.forEach(favorite => {
        const favoriteCard = document.createElement('div');
        favoriteCard.classList.add('recipe-card');
        favoriteCard.innerHTML = `
            <img src="${favorite.image}" alt="${favorite.title}" />
            <h3>${favorite.title}</h3>
        `;
        favoritesList.appendChild(favoriteCard);
    });
}

// Event listener for the search button
searchButton.addEventListener('click', () => {
    const ingredients = ingredientInput.value.trim().replace(/\s+/g, ',');
    if (ingredients) {
        fetchRecipes(ingredients);
    }
});

// Display favorites on page load
document.addEventListener('DOMContentLoaded', displayFavorites);
