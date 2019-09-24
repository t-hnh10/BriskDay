const level = document.getElementById("weather");
let searchBar = document.createElement("input");
searchBar.className = "search";
searchBar.setAttribute("type", "text");
level.appendChild(searchBar);
let button = document.createElement("button");
button.className = "button";
level.appendChild(button);

// Creating a clock with JavaScript

function updateClock() {
        // Creates a Date object containing current date and time
        let currentTime = new Date();

        // Extract hours, minutes and seconds of current time
        let currentHours = currentTime.getHours();
        let currentMinutes = currentTime.getMinutes();
        // let currentSeconds = currentTime.getSeconds();

        // Formatting the time

        // Add a leading zero to the minutes and seconds values
        currentMinutes = (currentMinutes < 10 ? "0" : "") + currentMinutes;
        // currentSeconds = (currentSeconds < 10 ? "0" : "") + currentSeconds;

        // Create a variable to determine whether time is AM or PM
        let timeOfDay = (currentHours < 12) ? "am" : "pm";
        currentHours = (currentHours > 12) ? currentHours - 12 : currentHours;
        currentHours = (currentHours == 0) ? 12 : currentHours;

        // Join all components together into a string
        let currentTimeString = currentHours + ":" + currentMinutes + timeOfDay;

        document.getElementById("clock").firstChild.nodeValue = currentTimeString;
}

const apiKey = '4a43e69ef8adee6b15a775082d129647';
const locations = fetch('cityList.json');

function getCityId(city) {
  locations.then(function(response) {
    return response.json();
  }).then(function(cities) {
    console.log(`location 1: ${cities[0].id} ${cities[0].name} 
    `);
  });
}



