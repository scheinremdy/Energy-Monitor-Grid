const apiKey = 9549d8982c8243d9a107adfd786a43c9; // Replace with your Spoonacular API Key
const recipeList = document.getElementById('recipe-list');
const categoryButtons = document.querySelectorAll('.category-btn');

categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
        const category = button.textContent.toLowerCase();
        fetchRecipes(category);
    });
});

function fetchRecipes(category) {
    fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${category}&apiKey=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            displayRecipes(data.results);
        })
        .catch(error => console.error('Error fetching recipes:', error));
}

function displayRecipes(recipes) {
    recipeList.innerHTML = '';
    recipes.forEach(recipe => {
        const recipeItem = document.createElement('div');
        recipeItem.classList.add('recipe-item');

        recipeItem.innerHTML = `
            <img src="https://spoonacular.com/recipeImages/${recipe.id}-312x231.jpg" alt="${recipe.title}">
            <h3>${recipe.title}</h3>
            <p>${recipe.description || 'No description available.'}</p>
            <button onclick="downloadRecipe(${recipe.id})">Download Instructions</button>
        `;
        
        recipeList.appendChild(recipeItem);
    });
}

function downloadRecipe(recipeId) {
    fetch(`https://api.spoonacular.com/recipes/${recipeId}/analyzedInstructions?apiKey=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            const instructions = data[0].steps.map(step => step.step).join('\n');
            const blob = new Blob([instructions], { type: 'text/plain' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'recipe-instructions.txt';
            link.click();
        })
        .catch(error => console.error('Error downloading recipe:', error));
}
