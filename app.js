// DOM Elements
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const filters = {
  cuisine: document.getElementById('cuisine-filter'),
  mealType: document.getElementById('meal-type-filter'),
  diet: document.getElementById('diet-filter'),
  difficulty: document.getElementById('difficulty-filter'),
};
const recipesContainer = document.getElementById('recipes-container');
const recommendationsContainer = document.getElementById('recommendation-cards');
const recipeModal = document.getElementById('recipe-modal');
const modalContent = document.getElementById('modal-content');
const closeModalBtn = document.getElementById('close-modal-btn');

// Recipe Data
const recipes = [
  {
    id: 1,
    title: "Classic Spaghetti Carbonara",
    cuisine: "Italian",
    mealType: "Dinner",
    diet: "Vegetarian",
    difficulty: "Easy",
    description: "A rich and indulgent Italian classic.",
    ingredients: ["Spaghetti", "Eggs", "Parmesan Cheese", "Pancetta"],
    instructions: "Cook pasta. Combine ingredients.",
    image: "https://images.unsplash.com/photo-1608571429269-8ce06b32a326",
  },
  {
    id: 2,
    title: "Vegetable Stir Fry",
    cuisine: "Asian",
    mealType: "Lunch",
    diet: "Vegan",
    difficulty: "Easy",
    description: "A vibrant medley of fresh veggies.",
    ingredients: ["Broccoli", "Carrots", "Peppers", "Soy Sauce"],
    instructions: "Toss veggies with soy sauce.",
    image: "https://images.unsplash.com/photo-1618221341333-9e07e1be1317",
  },
];

// Render Recipes
function renderRecipes(data) {
  recipesContainer.innerHTML = "";
  data.forEach((recipe) => {
    const recipeCard = document.createElement("div");
    recipeCard.classList.add("recipe-card");
    recipeCard.innerHTML = `
      <img src="${recipe.image}" alt="${recipe.title}" />
      <h3>${recipe.title}</h3>
      <p>${recipe.description}</p>
      <button class="view-recipe-btn" data-id="${recipe.id}">View Recipe</button>
    `;
    recipesContainer.appendChild(recipeCard);
  });
}

// Open Modal
function openModal(recipe) {
  recipeModal.style.display = "flex";
  modalContent.innerHTML = `
    <h2>${recipe.title}</h2>
    <img src="${recipe.image}" alt="${recipe.title}" />
    <p><strong>Description:</strong> ${recipe.description}</p>
    <p><strong>Ingredients:</strong> ${recipe.ingredients.join(", ")}</p>
    <p><strong>Instructions:</strong> ${recipe.instructions}</p>
  `;
}

// Close Modal
closeModalBtn.addEventListener("click", () => {
  recipeModal.style.display = "none";
});

// Event Listeners
recipesContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("view-recipe-btn")) {
    const recipeId = parseInt(e.target.dataset.id, 10);
    const selectedRecipe = recipes.find((r) => r.id === recipeId);
    if (selectedRecipe) openModal(selectedRecipe);
  }
});

// Initialize
renderRecipes(recipes);
