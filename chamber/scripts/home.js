// Abuja Municipal Business Chamber  //
// WDD 231 - Chamber Home Page  //
// Author: Eneche John  //


//OpenWheatherMap API information  //

const apiKey = "YOUR_API_KEY";
const city = "Abuja";
const country = "Nigeria";


//Weather URLs  //

const currentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=metric&appid=${apikey}`;


// Get and display the weather  //

async function getweather() {
    try{
        const weatherResponse = await fetch(currentWeatherURL);

        if(!weatherResponse.ok){
            throw new Error("Could not get the current weather.")
        }

        const weather = await weatherResponse.json();

        displayCurrentWeather(weather);



        const forecastResponse = await fetch(forecastURL);

        if(!forecastResponse.ok){
            throw new Error("Could not get the weather forecast.")
        }

        const forecast = await forecastResponse.json();

        displayForecast(forecast)
    }
    catch(error){
        console.error("Weather error:", error);

        document.querySelector("#current-weather").innerHtml = "<p>Weather information is not available right now.</p>";

        document.querySelector("#forecaste").innerHTML = "<p>Forecast information is not available right now.</p>";


    }
    
}



// Display the current weather  //


function displayCurrentWeather(weather){

    const weatherElement = document.querySelector("#current-weather");

    const description = weather.weather[0].description;

    weatherElement.innerHTML = `<p class = "current-temperature"> ${temperature}C </p>

    <p><strong>Condition:</strong>${description}</p>

    <p><strong>Location:</strong>${weather.name}, Nigeria</p>`;
}


// Display the three-day forecast  //


function displayForecast(weatherData){

    const forecastElent = document.querySelector("#forcast");

    forecastElement.innerHTML = "";

    const days = [];

    /* openWeatherMap would give us several forecast for each day but we only need one forecast
    for the next three days.*/

    weatherData.list.forEach((forecast) =>{
        const forecastDate = new Date(forecast.dt * 1000);

        const day = forecastDate.toLocaleDateString("en-US", {weekday: "long"});

        // Add the day only once  //

        if(!days.some((item) => item.date === date)){
            days.push({
                date: date,
                day: day,
                temperature: forecast.main.temp
            });
        }
    }
);

// Skip today and show the next three days //

const nextThreeDays = days.slice(1, 4);

nextThreeDays.forEach((forecast) => {

    const card = document.createElement("article");

    card.classList.add("forecast-card");

    card.innerHTML = `<h4>${forecast.day}</h4>
    <p>${Math.round(forecast.temperature)}C</p>
    <p>Temperature forcast</p>`;

    forecastElement.appendChild(card);
});
}

// Get Chamber members for the spotlight sectiion  //


async function getSpotlights(){
    try{
        const members = await Response.json();

        /* Membership levels:
        1 = Member
        2 = Silver
        3 = Gold

        Only Silver and Gold members can be displayed as spotlights*/

        const eligibleMembers = members.filter((member) => {
            return  member.membership === 3;
        });

        // Randomize the eligible members  //

        eligibleMembers.sort(() => Math.random() - 0.5);

        // Select up to three members  //

        const spotlightMembers = eligibleMembers.slice(0, 3);

        displaySpotlights(spotlightMembers);


    }
    catch (error){
        console.error("Spotlight error:", error);

        document.querySelector("#spotlight").innerHTML = "<p>Member information  is not available right now.</p>";
    }
    
}


// Display the member spotlight cards //


function displaySpotlights(members){

    const spotlightElement = document.querySelector("#spotlights");

    spotlightElement.innerHTML = "";

    members.forEach((member) => {
        const card = document.createElement("article");

        card.classList.add("spotlight-card");

        let membershipLevel;

        if (member.membership === 3){
            membershipLevel = "Gold Member";
        }
        else{
            membershipLeveln = "Silver Member";
        }

        card.innerHTML = `<h3>${member.name}</h3>

        <p class="spotlight-level">${membershipLevel}</p>
        <img src="images/${member.image}" alt="${member.name} logo"
        loading ="lazy"
        width="300"
        height="200">
        <P><strong>Address:</strong>${member.address}</p>
        <p><strong>Phone:</strong><a href="tel:${member.phone}">${member.phone}</a></p>
        <p><strong>Website:</strong><a href="${member.website}" target="_blank" rel="noopener noreferrer">Visite Website</a></p>`;


        spotlightElement.appendChild(card);
    });
 

}


// Footer dates //

const currentYear = document.querySelector("#currentyear");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

const lastModified = document.querySelector("#lastmodified");

if (lastModified) {
    lastModified.textContent = document.lastModified;
}


// Start the page //

getweather();

getSpotlights();