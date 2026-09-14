const membersContainer = document.querySelector("#members");

const girdButton = document.querySelector("#grid");

const listButton = document.querySelector("#list");

const menuBotton = document.querySelector("#menu");

const navigation = document.querySelector(".navigation");

const membershipNames = {1:"Member",2:"Silver",3:"Gold"};



//Load Chamber member information 
async function getmembers(){
    try{
        const response = await fetch("data/members.json");

        if (!response.ok){
            throw new Error(`HTTP error: ${response.status}`)
        }

        const members = await response.json();

        displayMembers(members);


    }

    catch (error){
        console.error("not able to load member data:", error);

        membersContainer.innerHTML = ` <p class="error-massage">
        Sorry, the Chamber member information could not be loaded now. Please try againe later.</p>`;
    }

}

//  Display Chember members function displayMembers(members)

membersContainer.innerHTML = "";

members.forEach((member) =>{
    const card = document.createElement("article");

    card.classList.add("member-card");

    card.innerHTML = `<img src="images/{member.image}" alt="${member.name} business logo" loading="lazy" width="300" height="200"/>
    <div class="member-information">
        <h3>${member.name}</h3>
        <p class="membership">
            ${membershipNames[member.membership]}
        </p>
        <p>${member.description}</p>
        <p><strong>phone:</strong> <a href="tel:${member.phone}"> ${member.phone}</a></p>
        <p><strong>Website:</strong><a href="${member.websit}" target="_blank" rel="noopener noreferrer">Visit Website</p>
    </div>`;

    membersContainer.appendChild(card);

});


// Display members in grid view

function showGrid(){
    membersContainer.classList.add("members-grid");

    membersContainer.classList.remove("members-list");

    girdButton.classList.add("active");

    listButton.classList.remove("active");

    girdButton.setAttribute("aria-pressed", "true");

    listButton.setAttribute("aria-oressed", "false");
}


// Display member in list view

function showList(){
    membersContainer.classList.add("members-list");

    membersContainer.classList.remove("members-grid");

    listButton.classList.add("active");

    girdButton.classList.remove("active");

    listButton.setAttribute("aria-pressed", "true");

    girdButton.setAttribute("aria-pressed", "false");
}

//Grid and list button events

girdButton.addEventListener("click", showGrid);

listButton.addEventListener("click", showList);

//Mobile navigation menu

menuButton.addEventListener("click", () =>{
    navigation.classList.toggle("open");

    const isOpen = navigation.classList.contains("open");

    menuBotton.setAttribute("aria-expanded", isOpen);

    menuBotton.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");


});

// Current copyright year

document.querySelector("#currentyear").textContent = new Date().getFullYear();

// Last modified date

document.querySelector("#lastmodified").textContent = document.lastModified;

// Load the member data

getmembers();

    
