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
    ingredients: ["Spaghetti", "Eggs", "Parmesan Cheese", "Black Pepper", "Pancetta"],
    instructions:
      "Cook the spaghetti until perfectly al dente. In a bowl, whisk eggs with grated Parmesan cheese until creamy. Sauté diced pancetta until crispy, then combine it with the pasta and the egg mixture. Toss well to coat and sprinkle with freshly ground black pepper. Serve immediately with extra Parmesan on top.",
    description: {
      en: "A rich and indulgent Italian classic, blending the creamy textures of eggs and cheese with the crispness of pancetta. Perfect for dinner after a long day!",
      de: "Ein reichhaltiger und köstlicher italienischer Klassiker, der die cremige Textur von Eiern und Käse mit der Knusprigkeit von Pancetta kombiniert. Perfekt für ein Abendessen nach einem langen Tag!",
    },
    image: "https://images.unsplash.com/photo-1608571429269-8ce06b32a326",
  },
  {
    id: 2,
    title: "Vegetable Stir Fry",
    cuisine: "Asian",
    mealType: "Lunch",
    diet: "Vegan",
    difficulty: "Easy",
    ingredients: ["Broccoli", "Carrots", "Bell Peppers", "Soy Sauce", "Ginger"],
    instructions:
      "Heat oil in a wok over high heat. Add broccoli, sliced carrots, and colorful bell peppers. Toss with soy sauce, freshly grated ginger, and a touch of sesame oil. Cook until vegetables are crisp-tender, then serve over steamed jasmine rice.",
    description: {
      en: "A vibrant medley of crunchy vegetables tossed in savory soy sauce, with the warmth of fresh ginger. A quick, healthy, and satisfying meal!",
      de: "Eine lebendige Mischung aus knusprigem Gemüse, gewürzt mit herzhaftem Sojasauce und der Wärme von frischem Ingwer. Eine schnelle, gesunde und sättigende Mahlzeit!",
    },
    image: "https://images.unsplash.com/photo-1618221341333-9e07e1be1317",
  },
  {
    id: 3,
    title: "Hearty Beef Tacos",
    cuisine: "Mexican",
    mealType: "Dinner",
    diet: "Gluten-free",
    difficulty: "Intermediate",
    ingredients: ["Taco Shells", "Ground Beef", "Cheese", "Lettuce", "Salsa"],
    instructions:
      "Brown the ground beef with Mexican spices like cumin, paprika, and chili powder. Fill crunchy taco shells with the seasoned beef, shredded lettuce, grated cheese, and a generous spoonful of fresh salsa. Serve with lime wedges on the side.",
    description: {
      en: "Bold Mexican flavors in every bite! Juicy, spiced beef paired with crunchy taco shells and fresh toppings. A fun and delicious dinner option!",
      de: "Mutige mexikanische Aromen in jedem Bissen! Saftiges, gewürztes Rindfleisch, kombiniert mit knusprigen Tacos und frischen Belägen. Eine unterhaltsame und köstliche Abendessensidee!",
    },
    image: "https://images.unsplash.com/photo-1598799231580-d31f88cc57ff",
  },
];

// Render Recipes
function renderRecipes(data) {
  recipesContainer.innerHTML = ""; // Clear previous recipes
  data.forEach((recipe) => {
    const recipeCard = document.createElement("div");
    recipeCard.classList.add("recipe-card");
    recipeCard.innerHTML = `
      <img src="${recipe.image}" alt="${recipe.title}" class="recipe-image" />
      <h3>${recipe.title}</h3>
      <p>${recipe.description.en}</p>
      <button class="view-recipe-btn" data-id="${recipe.id}">View Recipe</button>
    `;
    recipesContainer.appendChild(recipeCard);
  });
}

// Open Modal with Recipe Details
function openModal(recipe) {
  recipeModal.style.display = "block";
  modalContent.innerHTML = `
    <h2>${recipe.title}</h2>
    <img src="${recipe.image}" alt="${recipe.title}" class="modal-recipe-image" />
    <p><strong>Description:</strong> ${recipe.description.en}</p>
    <p><strong>Ingredients:</strong> ${recipe.ingredients.join(", ")}</p>
    <p><strong>Instructions:</strong> ${recipe.instructions}</p>
  `;
}

// Event Listeners
recipesContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("view-recipe-btn")) {
    const recipeId = parseInt(e.target.dataset.id, 10);
    const selectedRecipe = recipes.find((r) => r.id === recipeId);
    if (selectedRecipe) openModal(selectedRecipe);
  }
});

closeModalBtn.addEventListener("click", () => {
  recipeModal.style.display = "none";
});

// Initialize App
renderRecipes(recipes);
