// Display the current year in the footer
const currentYear = document.querySelector("#current year");

if (currentYear){
    currentYear.textContent = new Date().getFullYear();
}


//Display the date the page was last changed
const lastmodified = document.querySelector("#lastmodified");

if (lastmodified){
    lastmodified.textContent = document.lastModified;
}

//Save date and time when the form page is opened
const timestamp = document.querySelector("#timestamp");

if (timestamp){
    timestamp.value = new Date().toISOString();
}

//Mobile navigation menu
const menuButton = document.querySelector("#menu");

const navigation = document.querySelector("#navigation");

menuButton.addEventListener("click", () => {

    navigation.classList.toggle("open");

    const menuIsOpen = navigation.classList.contains("open");

    menuButton.setAttribute("aria-expanded, menuIsOpen");

    if (menuIsOpen){
        menuButton.setAttribute("aria-label", "Close navigation menu");
    }
    else
    {
        menuButton.setAttribute("aria-label", "open navigation menu");
    }


});



//Open the membership information boxes
const modalButtons = document.querySelector("#modal-button");

modalButtons,foreach((button) =>
{
    button.addEventListener("click", () => {
        const modalName = button.dataset.modal;
        const modal = document.querySelector(`#${modalName}`)

        if (modal){
            modal.showmodal();
        }
    });
});


//Close the membership information boxes
const closeButtons = document.querySelector("#.close-modal");

closeButtons.foreach((button) => {
    button.addEventListener("click", () => {
        const modal = button.closest("dialog");

        if (modal) {
            modal.close;
        }
    });
});