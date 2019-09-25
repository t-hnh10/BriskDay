const weather = document.getElementById("weather");
let searchBar = document.createElement("input");
searchBar.className = "search";
searchBar.setAttribute("id", "location");
searchBar.setAttribute("placeholder", "Please add a city e.g. London UK");
searchBar.setAttribute("type", "text");
weather.appendChild(searchBar);
let button = document.createElement("button");
button.className = "button";
button.innerHTML = "Submit";
weather.appendChild(button);
let weatherContent = document.createElement("div");
weatherContent.setAttribute("id", "weatherContent");
weather.appendChild(weatherContent);

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
const url = 'http://api.openweathermap.org/data/2.5/';

function genUrl(cityName, country) {
  let newUrl = [];
  newUrl.push(`${url}weather?q=${cityName},${country}&appid=${apiKey}`);
  newUrl.push(`${url}forecast?q=${cityName},${country}&mode=json&appid=${apiKey}`);

  return newUrl;
}

function toCapitalize(text) {
  return text = text[0].toUpperCase() + text.slice(1);
}

function getWeather(newUrl) {
  let weatherForTheWeek = [];
  let weather =  fetch(newUrl[0]);
  let forecast = fetch(newUrl[1]);
  weatherForTheWeek.push(weather);
  weatherForTheWeek.push(forecast);
  // await Promise.all(weatherForTheWeek);
  return weatherForTheWeek;
}

function genWeatherObject(weather) {
  return {
    temp:`${(weather.main.temp-273.15).toFixed(1)}°`,
    tempMax:`${(weather.main.temp_max-273.15).toFixed(1)}°`,
    tempMin:`${(weather.main.temp_min-273.15).toFixed(1)}°`,
    humidity:(weather.main.humidity) + '%',
    windDeg:weather.wind.deg,
    windSpeed:weather.wind.speed + 'm/s',
    icon:weather.weather[0].icon,
    description:weather.weather[0].description
  };
}

function handleWeather(weatherForTheWeek) {
  // let weekWeather = [];
  // console.log(weatherForTheWeek.json());
  weatherForTheWeek.forEach(function(weather, i) {
    if(i === 0) {
      weather.then(response => {
        return response.json();
      }).then(w => {
        showWeather(genWeatherObject(w));
      }).catch(e=>{
        console.log(e);
      });
    }else {
      weather.then(response => {
        return response.json();
      }).then(f=> {
        f.list.forEach(function(forecast, j) {
          if((j + 1) % 8 === 0) {
            showWeather(genWeatherObject(forecast));
          }
        });
      }).catch(e=> {
        console.log(e);
      });
    }
  });
  // console.log(weekWeather);
  // showWeather(weekWeather);
  // return weekWeather;
}

function showWeather(day) {
  // weekWeather.forEach(function(day) {
    let weatherText = document.getElementById("weatherContent");
    let text = document.createElement("p");
    text.className = "weatherText";
    weatherText.appendChild(text);
    text.textContent = 
    `temp: ${day.temp}
     tempMax: ${day.tempMax}
     tempMin: ${day.tempMin}
     humidity: ${day.humidity}
     wind degree: ${day.windDeg}
     wind speed: ${day.windSpeed}
     weather icon: ${day.icon}
     description: ${day.description}`;
  // });
}

button.addEventListener('click', (e) => {
  e.preventDefault();
  let location = document.getElementById("location").value.split(" ");
  let cityName = toCapitalize(location[0].toLowerCase());
  let country = location[1].toLowerCase();
  console.log(`city name: ${cityName} ${country}`);
  let newUrl = genUrl(cityName, country, "weather");
  handleWeather(getWeather(newUrl));
});
