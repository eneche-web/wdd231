// Footer year
const currentYear = document.querySelector("#currentyear");

if (currentYear){
    currentYear.textContent = new Date().getFullYear();
}

//Last modified date
const lastModified = document.querySelector("#lastmodified");

if (lastModified){
    lastModified.textContent = document.lastModified;
}


//Get the submitted form information
const formData = new URLSearchParams(window.location.search);

const firstName = formData.get("firstName");

const lastName =  formData.get("lastName");

const email = formData.get("email");

const phone = formData.get("phone");

const organization = formData.get("organization");

const timestamp = formData.get("timestamp");


//Display  the application
const information = document.querySelector("application-information");

if (information){
    information.innerHTML = `
    <p>
        <strong>First Name:</strong>${firstName || "Not provided"}
    </p>
    <p>
        <strong>Last Name:</strong>${lastName || "Not provided"}
    </p>
    <p>
        <strong>Email:</strong>${email || "Not provided"}
    </p>
    <p>
        <strong>Mobile:</strong>${phone || "Not provided"}
    </p>
    <p>
        <strong>Business or Organization:</strong>${organization || "Not provided"}
    </p>
    <p>
        <strong>Application Date:</strong>${timestamp || "Not available"}
    </p>`;
}