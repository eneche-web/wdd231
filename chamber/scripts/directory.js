const membersContainer = document.querySelector("#members");

const gridButton = document.querySelector("#grid");

const listButton = document.querySelector("#list");

const menuButton = document.querySelector("#menu");

const navigation = document.querySelector(".navigation");

const membershipNames = {1:"Member",2:"Silver",3:"Gold"};



//Load sample member information 
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
        Sorry, the sample member profiles could not be loaded now. Please try againe later.</p>`;
    }

}

//  Display Sample members profiles
function displayMembers(members){
    membersContainer.innerHTML = "";
    members.forEach((member) =>{
        const card = document.createElement("article");
        card.classList.add("member-card");

        card.innerHTML = `<img src="images/${member.image}"  alt="${member.name} business logo" loading="lazy" width="300" height="200"/>
        <div class="member-information">
        <h3>${member.name}</h3>
        <p class="membership">
            ${membershipNames[member.membership]}
        </p>
        <p>${member.description}</p>
        <p><strong>phone:</strong> <a href="tel:${member.phone}"> ${member.phone}</a></p>
        <p><strong>Website:</strong> <a href="${member.website}" target="_blank" rel="noopener noreferrer">Visit Website</a></p>
        </div>`;
        membersContainer.appendChild(card);
    });

}


// Display sample members in grid view

function showGrid(){
    membersContainer.classList.add("members-grid");

    membersContainer.classList.remove("members-list");

    gridButton.classList.add("active");

    listButton.classList.remove("active");

    gridButton.setAttribute("aria-pressed", "true");

    listButton.setAttribute("aria-pressed", "false");
}


// Display sample member in list view

function showList(){
    membersContainer.classList.add("members-list");

    membersContainer.classList.remove("members-grid");

    listButton.classList.add("active");

    gridButton.classList.remove("active");

    listButton.setAttribute("aria-pressed", "true");

    gridButton.setAttribute("aria-pressed", "false");
}

//Grid and list button events

gridButton.addEventListener("click", showGrid);

listButton.addEventListener("click", showList);

//Mobile navigation menu

menuButton.addEventListener("click", () => {
    navigation.classList.toggle("open");

    const isOpen = navigation.classList.contains("open");

    menuButton.setAttribute("aria-expanded", isOpen);

    menuButton.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");


});

// Current copyright year

document.querySelector("#currentyear").textContent = new Date().getFullYear();

// Last modified date

document.querySelector("#lastModified").textContent = document.lastModified;

// Load the member data

getmembers();

    
