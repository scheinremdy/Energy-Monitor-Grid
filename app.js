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
const darkModeToggle = document.getElementById('dark-mode-toggle');

// Recipe Data (Mock Data for now)
const recipes = [
  {
    id: 1,
    title: "Spaghetti Carbonara",
    cuisine: "Italian",
    mealType: "Dinner",
    diet: "Vegetarian",
    difficulty: "Easy",
    ingredients: ["Spaghetti", "Eggs", "Parmesan Cheese", "Black Pepper"],
    instructions: "Boil pasta. Mix eggs and cheese. Toss with hot pasta.",
    language: { en: "Classic Italian pasta dish.", de: "Klassisches italienisches Pastagericht." }
  },
  {
    id: 2,
    title: "Vegetable Stir Fry",
    cuisine: "Asian",
    mealType: "Lunch",
    diet: "Vegan",
    difficulty: "Easy",
    ingredients: ["Broccoli", "Carrots", "Soy Sauce", "Garlic"],
    instructions: "Stir fry vegetables in soy sauce and garlic.",
    language: { en: "Quick and healthy veggie stir-fry.", de: "Schnelles und gesundes Gemüsegericht." }
  },
  {
    id: 3,
    title: "Tacos",
    cuisine: "Mexican",
    mealType: "Dinner",
    diet: "Gluten-free",
    difficulty: "Intermediate",
    ingredients: ["Taco Shells", "Ground Beef", "Cheese", "Lettuce"],
    instructions: "Cook beef, assemble tacos with toppings.",
    language: { en: "Mexican street food classic.", de: "Mexikanischer Straßenessen-Klassiker." }
  },
];

// Global State
let language = "en";

// Render Recipes
function renderRecipes(data) {
  recipesContainer.innerHTML = ""; // Clear previous recipes
  data.forEach((recipe) => {
    const recipeCard = document.createElement("div");
    recipeCard.classList.add("recipe-card");
    recipeCard.innerHTML = `
      <h3>${recipe.title}</h3>
      <p>${recipe.language[language]}</p>
      <button class="view-recipe-btn" data-id="${recipe.id}">View Recipe</button>
    `;
    recipesContainer.appendChild(recipeCard);
  });

  // Attach event listeners to "View Recipe" buttons
  document.querySelectorAll(".view-recipe-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => showRecipeModal(e.target.dataset.id));
  });
}

// Show Recipe Modal
function showRecipeModal(recipeId) {
  const recipe = recipes.find((r) => r.id === parseInt(recipeId));
  modalContent.innerHTML = `
    <h2>${recipe.title}</h2>
    <h4>Ingredients:</h4>
    <ul>${recipe.ingredients.map((ing) => `<li>${ing}</li>`).join("")}</ul>
    <h4>Instructions:</h4>
    <p>${recipe.instructions}</p>
    <button id="download-list" class="download-btn">Download Shopping List</button>
  `;
  recipeModal.style.display = "flex";

  // Attach download functionality
  document.getElementById("download-list").addEventListener("click", () => {
    const shoppingList = recipe.ingredients.join("\n");
    const blob = new Blob([shoppingList], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${recipe.title}-shopping-list.txt`;
    link.click();
  });
}

// Close Modal
closeModalBtn.addEventListener("click", () => {
  recipeModal.style.display = "none";
});

// Filter Recipes
function filterRecipes() {
  const cuisine = filters.cuisine.value;
  const mealType = filters.mealType.value;
  const diet = filters.diet.value;
  const difficulty = filters.difficulty.value;

  const filteredRecipes = recipes.filter((recipe) => {
    return (
      (cuisine === "" || recipe.cuisine === cuisine) &&
      (mealType === "" || recipe.mealType === mealType) &&
      (diet === "" || recipe.diet === diet) &&
      (difficulty === "" || recipe.difficulty === difficulty)
    );
  });

  renderRecipes(filteredRecipes);
}

// Attach Filter Change Event Listeners
Object.values(filters).forEach((filter) => {
  filter.addEventListener("change", filterRecipes);
});

// Search Recipes
searchBtn.addEventListener("click", () => {
  const query = searchInput.value.toLowerCase();
  const filteredRecipes = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(query)
  );
  renderRecipes(filteredRecipes);
});

// Dark Mode Toggle
darkModeToggle.addEventListener("click", () => {
  document.body.dataset.theme = document.body.dataset.theme === "dark" ? "" : "dark";
});

// Recommendations
function renderRecommendations() {
  recommendationsContainer.innerHTML = "";
  recipes.slice(0, 3).forEach((recipe) => {
    const card = document.createElement("div");
    card.classList.add("recipe-card");
    card.innerHTML = `
      <h3>${recipe.title}</h3>
      <p>${recipe.language[language]}</p>
    `;
    recommendationsContainer.appendChild(card);
  });
}

// Language Toggle
const languageToggle = document.createElement("button");
languageToggle.textContent = "🇩🇪/🇬🇧";
languageToggle.addEventListener("click", () => {
  language = language === "en" ? "de" : "en";
  renderRecipes(recipes);
  renderRecommendations();
});
document.querySelector("header").appendChild(languageToggle);

// Initialize App
renderRecipes(recipes);
renderRecommendations();
