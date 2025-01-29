const API_KEY = '9549d8982c8243d9a107adfd786a43c9';
let language = 'en';
let mealType = 'breakfast';

const mealTypeMapping = {
    breakfast: { en: 'Breakfast', de: 'Frühstück' },
    lunch: { en: 'Lunch', de: 'Mittagessen' },
    dinner: { en: 'Dinner', de: 'Abendessen' },
    snacks: { en: 'Snacks', de: 'Snacks' },
};

const fetchRecipes = async () => {
    try {
        const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?type=${mealType}&apiKey=${API_KEY}`);
        const data = await response.json();
        const recipeList = document.getElementById('recipe-list');
        recipeList.innerHTML = '';

        if (data.results && data.results.length > 0) {
            data.results.forEach(recipe => {
                const li = document.createElement('li');
                li.classList.add('mb-2');
                li.innerHTML = `
                    <div class="flex justify-between">
                        <span>${recipe.title}</span>
                        <a href="${recipe.sourceUrl}" class="text-blue-500 underline" target="_blank" rel="noopener noreferrer">
                            ${language === 'en' ? 'View Recipe' : 'Rezept ansehen'}
                        </a>
                    </div>
                `;
                recipeList.appendChild(li);
            });
        } else {
            recipeList.innerHTML = `<li>${language === 'en' ? 'No recipes found.' : 'Keine Rezepte gefunden.'}</li>`;
        }
    } catch (error) {
        console.error('Error fetching recipes:', error);
    }
};

const updateMealButtons = () => {
    const mealButtons = document.getElementById('meal-buttons');
    mealButtons.innerHTML = '';

    Object.keys(mealTypeMapping).forEach(type => {
        const button = document.createElement('button');
        button.textContent = mealTypeMapping[type][language];
        button.className = `px-4 py-2 rounded ${mealType === type ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`;
        button.addEventListener('click', () => {
            mealType = type;
            updateMealButtons();
            fetchRecipes();
        });
        mealButtons.appendChild(button);
    });
};

const toggleLanguage = () => {
    language = language === 'en' ? 'de' : 'en';
    document.getElementById('title').textContent = language === 'en' ? 'Recipe Food Planner' : 'Rezept-Essensplaner';
    document.getElementById('toggle-language').textContent = language === 'en' ? 'Switch to Deutsch' : 'Zu Englisch wechseln';
    updateMealButtons();
    fetchRecipes();
};

document.getElementById('toggle-language').addEventListener('click', toggleLanguage);

// Initial setup
updateMealButtons();
fetchRecipes();
