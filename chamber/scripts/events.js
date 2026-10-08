const menuButton = document.querySelector("#menu");

const navigation = document.querySelector("#navigation");

if (menuButton && navigation){
    menuButton.addEventListener("click", () => {

        navigation.classList.contains("open");

        menuButton.setAttribute("aria-expanded", menuIsOpen);

        if (menuIsOpen){

            menuButton.setAttribute(
                "aria-label", "Close navigation menu"
            );
        }
        else
        {
            menuButton.setAttribute(
                "aria-label", "open navigation menu"
            );
        }


    });
}


const currentYear = document.querySelector("#currentyear");

if (currentYear){
    currentYear.textContent = new Date().getFullYear();
}

const lastModified = document.querySelector("#lastModified");

if (lastModified) {
    lastModified.textContent = document.lastModified;
}