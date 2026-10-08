const menuButton = document.querySelector("#menu");

const navigation = document.querySelector("#naivgation");


if (menuButton && navigation) {
    menuButton.addEventListener("click", () => {
        navigation.classList.toggle("open");

        const menuIsOpen = navigation.classList.contains("open");

        menuButton.setAttribute("aria-expanded", menuIsOpen);


        if (menuIsOpen) {
            menuButton.setAttribute("aria-label", "close navigation menu");
        }
        else{
            menuButton.setAttribute("arial-label", "open navigation menu");
        }
    });
}



const currentYear = document.querySelector("#current year");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}


const lastModified = document.querySelector("#lastModified");

if (lastModified) {
    lastModified.textContent = document.lastModified;
}