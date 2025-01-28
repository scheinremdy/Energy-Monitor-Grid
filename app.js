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

// Recipe Data
const recipes = [
  {
    id: 1,
    title: "Spaghetti Carbonara",
    cuisine: "Italian",
    mealType: "Dinner",
    diet: "Vegetarian",
    difficulty: "Easy",
    ingredients: ["Spaghetti", "Eggs", "Parmesan Cheese", "Black Pepper", "Pancetta"],
    instructions: "Cook spaghetti until al dente. In a separate bowl, whisk eggs and Parmesan. Fry pancetta, then mix everything with the pasta. Serve hot!",
    description: {
      en: "Indulge in this creamy, cheesy classic with a hint of crispy pancetta.",
      de: "Genießen Sie dieses cremige, käsige Gericht mit knusprigem Pancetta.",
    },
    image: "https://example.com/images/spaghetti-carbonara.jpg",
  },
  {
    id: 2,
    title: "Vegetable Stir Fry",
    cuisine: "Asian",
    mealType: "Lunch",
    diet: "Vegan",
    difficulty: "Easy",
    ingredients: ["Broccoli", "Carrots", "Bell Peppers", "Soy Sauce", "Ginger"],
    instructions: "Heat oil in a wok. Add vegetables and stir fry with soy sauce and ginger until crisp-tender. Serve with steamed rice.",
    description: {
      en: "A quick, vibrant, and healthy dish packed with fresh veggies and Asian flavors.",
      de: "Ein schnelles, lebhaftes und gesundes Gericht voller frischem Gemüse und asiatischer Aromen.",
    },
    image: "https://example.com/images/vegetable-stir-fry.jpg",
  },
  {
    id: 3,
    title: "Tacos",
    cuisine: "Mexican",
    mealType: "Dinner",
    diet: "Gluten-free",
    difficulty: "Intermediate",
    ingredients: ["Taco Shells", "Ground Beef", "Cheese", "Lettuce", "Salsa"],
    instructions: "Cook ground beef with spices. Fill taco shells with beef, lettuce, cheese, and salsa. Serve immediately.",
    description: {
      en: "Enjoy the bold flavors of Mexico with these customizable tacos.",
      de: "Genießen Sie die kräftigen Aromen Mexikos mit diesen anpassbaren Tacos.",
    },
    image: "https://example.com/images/tacos.jpg",
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
      <img src="${recipe.image}" alt="${recipe.title}" class="recipe-image" />
      <h3>${recipe.title}</h3>
      <p>${recipe.description[language]}</p>
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
    <img src="${recipe.image}" alt="${recipe.title}" class="modal-image" />
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

// Render Recommendations
function renderRecommendations() {
  recommendationsContainer.innerHTML = ""; // Clear recommendations
  recipes.slice(0, 3).forEach((recipe) => {
    const recommendationCard = document.createElement("div");
    recommendationCard.classList.add("recommendation-card");
    recommendationCard.innerHTML = `
      <img src="${recipe.image}" alt="${recipe.title}" class="recommendation-image" />
      <h4>${recipe.title}</h4>
      <p>${recipe.description[language]}</p>
    `;
    recommendationsContainer.appendChild(recommendationCard);
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
