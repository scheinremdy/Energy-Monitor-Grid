const apiKey = "YOUR_API_KEY"; // Replace with your actual API key
const apiBaseUrl = "https://api.spoonacular.com/recipes";

// Select elements
const searchInput = document.querySelector("#search-input");
const searchButton = document.querySelector("#search-btn");
const recipesContainer = document.querySelector("#recipes-container");
const recipeModal = document.querySelector("#recipe-modal");
const closeModalButton = document.querySelector("#close-modal-btn");
const modalContent = document.querySelector("#modal-content");
const filtersForm = document.querySelector("#filters-form");
const shoppingListContainer = document.querySelector("#shopping-list-container");
const shoppingListDownload = document.querySelector("#shopping-list-download");
const langToggleButton = document.querySelector("#lang-toggle-btn");
const langLabel = document.querySelector("#lang-label");
const recommendationsSection = document.querySelector("#recommendations-section");

// Current state
let currentLanguage = "en"; // Default language
let shoppingList = [];

// Fetch recipes from the API
async function fetchRecipes(query, filters = {}) {
    try {
        const filterParams = Object.entries(filters)
            .map(([key, value]) => `${key}=${value}`)
            .join("&");

        const response = await fetch(
            `${apiBaseUrl}/complexSearch?query=${query}&apiKey=${apiKey}&${filterParams}`
        );

        if (!response.ok) {
            throw new Error("Failed to fetch recipes. Please try again later.");
        }

        const data = await response.json();
        return data.results || [];
    } catch (error) {
        alert(error.message);
        return [];
    }
}

// Render recipe cards
function renderRecipes(recipes) {
    recipesContainer.innerHTML = ""; // Clear previous results
    if (recipes.length === 0) {
        recipesContainer.innerHTML = `<p>No recipes found. Try a different search!</p>`;
        return;
    }

    recipes.forEach((recipe) => {
        const card = document.createElement("div");
        card.className = "recipe-card";

        card.innerHTML = `
            <img src="${recipe.image}" alt="${recipe.title}">
            <h3>${recipe.title}</h3>
            <button class="details-btn" data-id="${recipe.id}">${currentLanguage === "en" ? "View Recipe" : "Rezept ansehen"}</button>
        `;

        recipesContainer.appendChild(card);
    });
}

// Show recipe details in a modal
async function showRecipeDetails(recipeId) {
    try {
        const response = await fetch(`${apiBaseUrl}/${recipeId}/information?apiKey=${apiKey}`);
        const recipe = await response.json();

        modalContent.innerHTML = `
            <h2>${recipe.title}</h2>
            <img src="${recipe.image}" alt="${recipe.title}">
            <p>${currentLanguage === "en" ? "Cooking Time" : "Kochzeit"}: ${recipe.readyInMinutes} mins</p>
            <h3>${currentLanguage === "en" ? "Ingredients" : "Zutaten"}:</h3>
            <ul>
                ${recipe.extendedIngredients
                    .map((ingredient) => `<li>${ingredient.original}</li>`)
                    .join("")}
            </ul>
            <h3>${currentLanguage === "en" ? "Instructions" : "Anweisungen"}:</h3>
            <p>${recipe.instructions || "No instructions provided."}</p>
            <button id="add-to-shopping-list">${currentLanguage === "en" ? "Add to Shopping List" : "Zur Einkaufsliste hinzufügen"}</button>
        `;

        recipeModal.style.display = "block";

        // Add ingredients to shopping list
        document.querySelector("#add-to-shopping-list").addEventListener("click", () => {
            shoppingList = recipe.extendedIngredients.map((ingredient) => ingredient.original);
            renderShoppingList();
        });
    } catch (error) {
        alert("Failed to fetch recipe details. Please try again.");
    }
}

// Render shopping list
function renderShoppingList() {
    shoppingListContainer.innerHTML = shoppingList
        .map((item) => `<li>${item}</li>`)
        .join("");

    shoppingListDownload.style.display = "block"; // Show download button
}

// Download shopping list
function downloadShoppingList() {
    const blob = new Blob([shoppingList.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "shopping-list.txt";
    a.click();
    URL.revokeObjectURL(url);
}

// Toggle language
function toggleLanguage() {
    currentLanguage = currentLanguage === "en" ? "de" : "en";
    langLabel.textContent = currentLanguage === "en" ? "English" : "Deutsch";
    updateUIForLanguage();
}

// Update UI text for the selected language
function updateUIForLanguage() {
    searchInput.placeholder = currentLanguage === "en" ? "Search recipes..." : "Rezepte suchen...";
    searchButton.textContent = currentLanguage === "en" ? "Search" : "Suchen";
    renderRecommendations();
}

// Render recommendations
function renderRecommendations() {
    const recommendations = [
        { id: 1, title: "Vegan Lasagna", image: "example1.jpg" },
        { id: 2, title: "Gluten-Free Pancakes", image: "example2.jpg" },
        { id: 3, title: "Mediterranean Salad", image: "example3.jpg" },
    ];

    recommendationsSection.innerHTML = recommendations
        .map(
            (rec) => `
        <div class="recommendation-card">
            <img src="${rec.image}" alt="${rec.title}">
            <h4>${rec.title}</h4>
        </div>
    `
        )
        .join("");
}

// Event Listeners
searchButton.addEventListener("click", async () => {
    const query = searchInput.value;
    const filters = Object.fromEntries(new FormData(filtersForm).entries());
    const recipes = await fetchRecipes(query, filters);
    renderRecipes(recipes);
});

recipesContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("details-btn")) {
        const recipeId = e.target.dataset.id;
        showRecipeDetails(recipeId);
    }
});

closeModalButton.addEventListener("click", () => {
    recipeModal.style.display = "none";
});

langToggleButton.addEventListener("click", toggleLanguage);
shoppingListDownload.addEventListener("click", downloadShoppingList);

// Initial Load
renderRecommendations();
