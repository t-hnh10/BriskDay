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

// Pull news from The Guardian API

const apiKey = "";

const newsUrl = `https://content.guardianapis.com/search?api-key=${apiKey}`;
const gallery = document.getElementById('gallery');

// Asynchronous function to get the JSON document from the url
fetch(newsUrl).then(response => response.json())
    .then(data => showUsers(data));

function showUsers(data) {
    data.response.results.forEach((index) => {
        const news = document.createElement('li');
        news.textContent = index.webTitle;
        news.className = "menu-list"
        gallery.appendChild(news);
    });
}