// Recipe Data
const recipes = [
    { id:'mug-cookie', title:'5-Minute Mug Cookie', img:'https://i.imgur.com/5VuQ0H8.jpeg', time:10, category:'quick', content:`<strong>Ingredients:</strong><br>• 1 tbsp butter<br>• 1 tbsp sugar<br>• 1 tbsp brown sugar<br>• 3 tbsp flour<br>• Pinch salt<br>• 2 tbsp chocolate chips<br><br><strong>Instructions:</strong><br>1. Melt butter<br>2. Mix sugars, flour, salt<br>3. Fold in chocolate chips<br>4. Microwave 40-50s` },
    { id:'soft-chewy', title:'Soft & Chewy Cookies', img:'https://i.imgur.com/WXqYk2V.jpeg', time:20, category:'chocolate', content:`<strong>Ingredients:</strong><br>• Butter, sugar, egg, flour, chocolate chips...<br><strong>Instructions:</strong> Mix, scoop, bake 12-14 min` },
    { id:'crispy-chocolate', title:'Crispy Chocolate Chip Cookies', img:'https://i.imgur.com/qd9dVnX.jpeg', time:30, category:'chocolate', content:`...` },
    { id:'chocolate-chip', title:'Classic Chocolate Chip Cookies', img:'https://i.imgur.com/f6hcCOf.jpeg', time:25, category:'chocolate', content:`...` },
    { id:'oatmeal', title:'Hearty Oatmeal Cookies', img:'https://i.imgur.com/JJ6L4np.jpeg', time:25, category:'oatmeal', content:`...` },
    { id:'sugar', title:'Classic Sugar Cookies', img:'https://i.imgur.com/nUjrnny.jpeg', time:30, category:'sugar', content:`...` },
    { id:'peanut-butter', title:'Peanut Butter Cookies', img:'https://i.imgur.com/5VuQ0H8.jpeg', time:20, category:'peanut', content:`...` }
];

// DOM Elements
const screens = { start: document.getElementById('start-screen'), options: document.getElementById('options-screen'), recipe: document.getElementById('recipe-screen') };
const startBtn = document.getElementById('start-btn');
const backToStart = document.getElementById('back-to-start');
const backToOptions = document.getElementById('back-to-options');
const settingsIcon = document.getElementById('settings-icon');
const settingsMenu = document.getElementById('settings-menu');
const darkToggle = document.getElementById('dark-mode-toggle');
const searchInput = document.getElementById('search-input');

// Screen Navigation
function showScreen(screen) {
    Object.values(screens).forEach(s => s.classList.remove('active'));
    screen.classList.add('active');
}

// Button Events
startBtn.onclick = () => showScreen(screens.options);
backToStart.onclick = () => showScreen(screens.start);
backToOptions.onclick = () => showScreen(screens.options);

// Load Recipe
function loadRecipe(recipe) {
    document.getElementById('recipe-title').textContent = recipe.title;
    document.getElementById('recipe-content').innerHTML = recipe.content;
    const img = document.getElementById('recipe-img');
    img.src = recipe.img;
    img.alt = recipe.title;
    showScreen(screens.recipe);
}

// Filter functions
function getRecipesByTime(maxTime) { return recipes.filter(r => r.time <= maxTime); }
function getRecipesByCategory(category) { return recipes.filter(r => r.category === category); }

// Option Buttons
document.querySelectorAll('.option-btn').forEach(btn => {
    btn.addEventListener('click', e => {
        const filtered = getRecipesByTime(parseInt(e.target.dataset.time));
        if(filtered.length>0) loadRecipe(filtered[0]);
    });
});

// Category Buttons
document.querySelectorAll('.category-btn').forEach(btn => {
    btn.addEventListener('click', e => {
        const filtered = getRecipesByCategory(e.target.dataset.category);
        if(filtered.length>0) loadRecipe(filtered[0]);
    });
});

// Search
searchInput.addEventListener('input', e => {
    const query = e.target.value.toLowerCase();
    if(query.length<2) return;
    const found = recipes.find(r => r.title.toLowerCase().includes(query) || r.category.includes(query));
    if(found) loadRecipe(found);
});

// Settings Toggle
settingsIcon.onclick = () => settingsMenu.classList.toggle('active');
document.addEventListener('click', e => { if(!settingsMenu.contains(e.target) && e.target!==settingsIcon) settingsMenu.classList.remove('active'); });

// Dark Mode
if(localStorage.getItem('darkMode')==='true'){ document.body.classList.add('dark-mode'); darkToggle.checked=true; }
darkToggle.onchange = () => { document.body.classList.toggle('dark-mode'); localStorage.setItem('darkMode', document.body.classList.contains('dark-mode')); };

// Language select (placeholder)
document.getElementById('language-select').addEventListener('change', e=>console.log('Language changed to',e.target.value));
