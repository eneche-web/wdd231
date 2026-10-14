
// BuildWise - Main JavaScript File

// Get the menu button and navigation links.
const menuButton = document.querySelector("#menu-button");
const navigation = document.querySelector("#primary-navigation");

// Open and close the navigation menu on small screens.
if (menuButton && navigation) {
    menuButton.addEventListener("click", function () {
        navigation.classList.toggle("open");

        // Update the button so screen readers know the menu state.
        const menuIsOpen = navigation.classList.contains("open");

        menuButton.setAttribute("aria-expanded", menuIsOpen);

        if (menuIsOpen) {
            menuButton.setAttribute(
                "aria-label",
                "Close navigation menu"
            );
        } else {
            menuButton.setAttribute(
                "aria-label",
                "Open navigation menu"
            );
        }
    });
}


// Display the current year in the footer.
const currentYear = document.querySelector("#current-year");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}


// Display when the page was last modified.
const lastModified = document.querySelector("#last-modified");

if (lastModified) {
    lastModified.textContent = document.lastModified;
}


// Load the featured construction materials from the JSON file.
async function loadFeaturedMaterials() {
    const featuredContainer =
        document.querySelector("#featured-materials");

    // Stop if this page does not have a featured materials section.
    if (!featuredContainer) {
        return;
    }

    try {
        // Request the materials data.
        const response = await fetch("data/materials.json");

        // Check whether the request was successful.
        if (!response.ok) {
            throw new Error("The materials data could not be loaded.");
        }

        // Convert the response into JavaScript data.
        const materials = await response.json();

        // Display the first three materials on the Home page.
        const featuredMaterials = materials.slice(0, 3);

        // Remove the loading message.
        featuredContainer.innerHTML = "";

        featuredMaterials.forEach(function (material) {
            // Create a card for each featured material.
            const card = document.createElement("article");
            card.classList.add("material-card");

            card.innerHTML = `<p class="material-category">
                    ${material.category}
                </p>

                <h3>${material.name}</h3>

                <p>${material.description}</p>

                <a
                    class="button"
                    href="materials.html"
                    aria-label="Explore the materials guide to learn about ${material.name}">
                    Learn More
                </a>`;

            featuredContainer.appendChild(card);
        });

    } catch (error) {
        // Show a helpful message if the materials cannot be loaded.
        featuredContainer.innerHTML = `<p class="no-results">
                Featured materials are not available right now.
                Please visit the Materials page to try again.
            </p>`;

        console.error("Error loading featured materials:", error);
    }
}


// Run the function when the page loads.
loadFeaturedMaterials();