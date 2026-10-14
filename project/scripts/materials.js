
/* ==========================================
   BuildWise - Materials Page JavaScript
   ========================================== */

// Mobile navigation
const menuButton = document.querySelector("#menu-button");
const navigation = document.querySelector("#primary-navigation");

if (menuButton && navigation) {
    menuButton.addEventListener("click", () => {
        navigation.classList.toggle("open");

        const menuIsOpen = navigation.classList.contains("open");

        menuButton.setAttribute("aria-expanded", menuIsOpen);

        if (menuIsOpen) {
            menuButton.setAttribute("aria-label", "Close navigation menu");
        } else {
            menuButton.setAttribute("aria-label", "Open navigation menu");
        }
    });
}


// Footer information
const currentYear = document.querySelector("#current-year");
const lastModified = document.querySelector("#last-modified");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

if (lastModified) {
    lastModified.textContent = document.lastModified;
}


// Material page elements
const materialsContainer = document.querySelector("#materials-container");
const materialCount = document.querySelector("#material-count");
const searchInput = document.querySelector("#material-search");
const categoryFilter = document.querySelector("#category-filter");
const favoritesButton = document.querySelector("#favorites-button");
const showAllButton = document.querySelector("#show-all-button");


// Dialog elements
const materialDialog = document.querySelector("#material-dialog");
const closeDialog = document.querySelector("#close-dialog");
const dialogDetails = document.querySelector("#dialog-details");


// Store all materials after they are loaded
let materials = [];

// Keep track of whether the user wants to see favorites only
let showingFavorites = false;

// localStorage key
const favoritesKey = "buildwise-favorites";

// Get saved favorites from localStorage
let favorites = JSON.parse(localStorage.getItem(favoritesKey)) || [];


// ==========================================
// Load Materials
// ==========================================

async function loadMaterials() {
    try {
        const response = await fetch("data/materials.json");

        if (!response.ok) {
            throw new Error("Could not load the materials data.");
        }

        materials = await response.json();

        createCategoryOptions();
        displayMaterials();

    } catch (error) {
        materialsContainer.innerHTML = `
            <div class="no-results">
                <h2>Materials could not be loaded</h2>
                <p>
                    Sorry, there was a problem loading the materials.
                    Please refresh the page and try again.
                </p>
            </div>
        `;

        materialCount.textContent = "Unable to load materials.";
        console.error(error);
    }
}


// ==========================================
// Create Category Options
// ==========================================

function createCategoryOptions() {
    const categories = [];

    materials.forEach((material) => {
        if (!categories.includes(material.category)) {
            categories.push(material.category);
        }
    });

    categories.sort();

    categories.forEach((category) => {
        const option = document.createElement("option");

        option.value = category;
        option.textContent = category;

        categoryFilter.appendChild(option);
    });
}


// ==========================================
// Display Materials
// ==========================================

function displayMaterials() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    const selectedCategory = categoryFilter.value;

    let filteredMaterials = materials.filter((material) => {

        const matchesSearch =
            material.name.toLowerCase().includes(searchTerm) ||
            material.category.toLowerCase().includes(searchTerm) ||
            material.description.toLowerCase().includes(searchTerm);

        const matchesCategory =
            selectedCategory === "all" ||
            material.category === selectedCategory;

        const matchesFavorites =
            !showingFavorites ||
            favorites.includes(material.id);

        return matchesSearch && matchesCategory && matchesFavorites;
    });


    materialsContainer.innerHTML = "";


    if (filteredMaterials.length === 0) {
        materialsContainer.innerHTML = `
            <div class="no-results">
                <h2>No materials found</h2>
                <p>
                    Try a different search word or category.
                </p>
            </div>
        `;

        materialCount.textContent = "0 materials found.";
        return;
    }


    materialCount.textContent =
        `${filteredMaterials.length} material${filteredMaterials.length === 1 ? "" : "s"} found.`;


    filteredMaterials.forEach((material) => {
        const card = createMaterialCard(material);
        materialsContainer.appendChild(card);
    });
}


// ==========================================
// Create Material Card
// ==========================================

function createMaterialCard(material) {
    const card = document.createElement("article");

    card.classList.add("material-card");

    const isFavorite = favorites.includes(material.id);

    card.innerHTML = `
        <p class="material-category">${material.category}</p>

        <h3>${material.name}</h3>

        <p>${material.description}</p>

        <div class="card-actions">

            <button
                type="button"
                class="details-button"
                data-id="${material.id}">
                View Details
            </button>

            <button
                type="button"
                class="favorite-button ${isFavorite ? "saved" : ""}"
                data-id="${material.id}"
                aria-label="${isFavorite ? `Remove ${material.name} from favorites` : `Save ${material.name} to favorites`}">
                ${isFavorite ? "★ Saved" : "☆ Save"}
            </button>

        </div>
    `;


    // Details button
    const detailsButton = card.querySelector(".details-button");

    detailsButton.addEventListener("click", () => {
        showMaterialDetails(material.id);
    });


    // Favorite button
    const favoriteButton = card.querySelector(".favorite-button");

    favoriteButton.addEventListener("click", () => {
        toggleFavorite(material.id);
    });


    return card;
}


// ==========================================
// Show Material Details
// ==========================================

function showMaterialDetails(materialId) {
    const material = materials.find((item) => item.id === materialId);

    if (!material) {
        return;
    }


    const usesList = material.uses
        .map((use) => `<li>${use}</li>`)
        .join("");

    const propertiesList = material.properties
        .map((property) => `<li>${property}</li>`)
        .join("");

    const advantagesList = material.advantages
        .map((advantage) => `<li>${advantage}</li>`)
        .join("");

    const considerationsList = material.considerations
        .map((consideration) => `<li>${consideration}</li>`)
        .join("");


    dialogDetails.innerHTML = `
        <p class="material-category">${material.category}</p>

        <h2>${material.name}</h2>

        <p>${material.description}</p>

        <h3>Common Uses</h3>
        <ul>
            ${usesList}
        </ul>

        <h3>Properties</h3>
        <ul>
            ${propertiesList}
        </ul>

        <h3>Advantages</h3>
        <ul>
            ${advantagesList}
        </ul>

        <h3>Things to Consider</h3>
        <ul>
            ${considerationsList}
        </ul>
    `;


    materialDialog.showModal();
}


// ==========================================
// Add or Remove Favorites
// ==========================================

function toggleFavorite(materialId) {

    if (favorites.includes(materialId)) {

        favorites = favorites.filter((id) => id !== materialId);

    } else {

        favorites.push(materialId);
    }


    localStorage.setItem(
        favoritesKey,
        JSON.stringify(favorites)
    );


    displayMaterials();
}


// ==========================================
// Search
// ==========================================

searchInput.addEventListener("input", () => {
    displayMaterials();
});


// ==========================================
// Category Filter
// ==========================================

categoryFilter.addEventListener("change", () => {
    displayMaterials();
});


// ==========================================
// Show Favorites
// ==========================================

favoritesButton.addEventListener("click", () => {

    showingFavorites = true;

    favoritesButton.style.display = "none";
    showAllButton.style.display = "inline-block";

    displayMaterials();
});


// ==========================================
// Show All Materials
// ==========================================

showAllButton.addEventListener("click", () => {

    showingFavorites = false;

    showAllButton.style.display = "none";
    favoritesButton.style.display = "inline-block";

    displayMaterials();
});


// ==========================================
// Close Dialog
// ==========================================

closeDialog.addEventListener("click", () => {
    materialDialog.close();
});


// Close dialog if the user clicks outside the dialog
materialDialog.addEventListener("click", (event) => {

    const dialogBox = materialDialog.getBoundingClientRect();

    const clickedInside =
        event.clientX >= dialogBox.left &&
        event.clientX <= dialogBox.right &&
        event.clientY >= dialogBox.top &&
        event.clientY <= dialogBox.bottom;

    if (!clickedInside) {
        materialDialog.close();
    }
});


// ==========================================
// Start the Page
// ==========================================

showAllButton.style.display = "none";

loadMaterials();