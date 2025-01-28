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
  {
    id: 4,
    title: "Savory Butter Chicken",
    cuisine: "Indian",
    mealType: "Dinner",
    diet: "Gluten-free",
    difficulty: "Intermediate",
    ingredients: [
      "Chicken",
      "Tomato Puree",
      "Heavy Cream",
      "Butter",
      "Spices (Cumin, Coriander, Garam Masala)",
    ],
    instructions:
      "Marinate chicken pieces in yogurt and spices. Cook them until tender, then simmer in a creamy tomato-based sauce enriched with butter and heavy cream. Serve hot with basmati rice or naan.",
    description: {
      en: "A creamy, spiced delight with tender chicken pieces immersed in a rich, buttery tomato sauce. Perfectly paired with fragrant rice or naan bread!",
      de: "Ein cremiges, gewürztes Gericht mit zarten Hähnchenstücken, eingetaucht in einer reichhaltigen, buttrigen Tomatensauce. Perfekt kombiniert mit duftendem Reis oder Naan-Brot!",
    },
    image: "https://images.unsplash.com/photo-1601646831948-c160daa2ff83",
  },
  {
    id: 5,
    title: "Chocolate Lava Cake",
    cuisine: "Dessert",
    mealType: "Dessert",
    diet: "Vegetarian",
    difficulty: "Advanced",
    ingredients: ["Dark Chocolate", "Butter", "Sugar", "Eggs", "Flour"],
    instructions:
      "Melt dark chocolate and butter together. Beat eggs and sugar until fluffy, then fold in the melted chocolate and flour. Bake until the edges are set, but the center remains molten. Serve warm with vanilla ice cream.",
    description: {
      en: "An indulgent treat with a gooey molten center, oozing with rich chocolate. A decadent dessert for any special occasion!",
      de: "Ein genussvolles Dessert mit einem flüssigen Kern, der von reichhaltiger Schokolade durchzogen ist. Ein dekadenter Nachtisch für jeden besonderen Anlass!",
    },
    image: "https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb",
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

// Initialize App
renderRecipes(recipes);
