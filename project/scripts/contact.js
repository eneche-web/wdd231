
// BuildWise - Contact Page JavaScript

// Get the mobile menu button and navigation.
const menuButton = document.querySelector("#menu-button");
const navigation = document.querySelector("#primary-navigation");

// Open and close the navigation menu on smaller screens.
if (menuButton && navigation) {
    menuButton.addEventListener("click", function () {
        navigation.classList.toggle("open");

        // Check whether the menu is open.
        const menuIsOpen = navigation.classList.contains("open");

        // Update the button for accessibility.
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


// Display the date the page was last modified.
const lastModified = document.querySelector("#last-modified");

if (lastModified) {
    lastModified.textContent = document.lastModified;
}


// Get the contact form and confirmation message elements.
const contactForm = document.querySelector("#contact-form");
const formResult = document.querySelector("#form-result");
const resultMessage = document.querySelector("#result-message");


// Process the form when the user submits it.
if (contactForm) {
    contactForm.addEventListener("submit", function (event) {

        // Stop the page from reloading immediately.
        event.preventDefault();

        // Check that all required fields are valid.
        if (!contactForm.checkValidity()) {
            contactForm.reportValidity();
            return;
        }

        // Collect the information entered in the form.
        const formData = new FormData(contactForm);

        const name = formData.get("name");
        const email = formData.get("email");
        const subject = formData.get("subject");

        // Display a confirmation message.
        resultMessage.textContent =
            `Thank you, ${name}! Your message about "${subject}" ` +
            `has been processed in this demonstration. ` +
            `Your email address is ${email}.`;

        // Make the confirmation section visible.
        formResult.hidden = false;

        // Clear the form after submission.
        contactForm.reset();

        // Move the visitor to the confirmation message.
        formResult.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    });
}
