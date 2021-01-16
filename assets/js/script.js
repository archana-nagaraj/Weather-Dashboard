// create nav bar
// study weather dashboard api documentation
// access weather dashboard api - display in the console
// Add the search form
// Handle form submission
// Add error handling
// Display response data on page
// implement local storage for the searched items
// implement when user cick on the search item , the weather data shows up.
// Save the work in Git

//  Global Variables
const apiKey = "3b252b3f0afd61300c13bbf7516fcbb5";
var searchInputEl = document.querySelector("#search-input");
var searchBtnEl = document.querySelector("#search-btn");

// fetch current day weather data by city
var getweatherData = function(cityName){
    // format the weather dashboard api url
    var apiUrl = "http://api.openweathermap.org/data/2.5/weather?q=" +cityName + "&appid=" +apiKey;
    // make a request to the url
    fetch(apiUrl)
    .then(function(response) {
      // request was successful
      if (response.ok) {
        response.json().then(function(data) {
            //console.log(data);
            displayWeatherData_currentDay(data);
        });
      } else {
        alert("Error: " + response.statusText);
      }
    })
    .catch(function(error) {
      alert("Unable to connect to GitHub");
    });
};

// Display current day weather on the page
var displayWeatherData_currentDay = function(data){
    //get the values from the response
    const dataObj = data;
    const city = dataObj.name;
        // converting temp from Kelvin to Farenheit 
    const temperature = Math.floor(((dataObj.main.temp - 273.15) * 1.80 + 32));
    const humidity = dataObj.main.humidity;
    const windSpeed = dataObj.wind.speed;
    var weatherPic = dataObj.weather[0].icon;
        //convert Time of data calculation, unix, UTC to date specific locale
    const date = new Date(dataObj.dt*1000).toLocaleDateString('en-US');

    // Set the data to display
    const card = $("<div>").addClass("card");
    const cardBody = $("<div>").addClass("card-body");
    const cityEl = $("<h4>").addClass("card-title").text(city);
    const currentDateEl = $("<h4>").addClass("card-title").text("("+date + ")");
    const imageEl = $("<img>").attr("src", "https://openweathermap.org/img/w/" + weatherPic + ".png");
    const tempEl = $("<h4>").addClass("card-title").text("Temperature: " +temperature+ ' F');
    const humidityEl = $("<h4>").addClass("card-title").text("Humidity: " +humidity  + " %");
    const windspeedEl = $("<h4>").addClass("card-title").text("Wind Speed: " +windSpeed + " MPH");
    const UVIndexEl = $("<h4>").addClass("card-title").text("UV Index:");

    // display on the page
    cityEl.append(currentDateEl);
    cityEl.append(imageEl);
    cardBody.append(cityEl, tempEl, humidityEl, windspeedEl, UVIndexEl);
    card.append(cardBody);
    $("#currentDay").append(card);
};

// fetch 5-Day Weather Forecast by city
var getweatherData_5DayForecast = function(cityName){
    // format the weather dashboard api url
   var apiUrl = "http://api.openweathermap.org/data/2.5/forecast/daily?q=" +cityName + "&cnt=5&appid=" +apiKey;
    // make a request to the url
    fetch(apiUrl)
    .then(function(response) {
      // request was successful
      if (response.ok) {
        response.json().then(function(data) {
            displayWeatherData_forecast(data);
            //console.log(data);
        });
      } else {
        alert("Error: " + response.statusText);
      }
    })
    .catch(function(error) {
      // Notice this `.catch()` getting chained onto the end of the `.then()` method
      alert("Unable to connect to GitHub");
    });
};

// Display 5-Day Weather Forecast on the page
var displayWeatherData_forecast = function(data) {
       let responseList = data.list;
       //console.log(responseList);
        const forecastTitle = $("<h3>").addClass("forecast-title").text("5-Day Forecast");
        $("#forecast-text").append(forecastTitle);
        for ( let i = 0; i < responseList.length; i++){
           // console.log(responseList[i]);
            //get the vaues
            const date = new Date(responseList[i].dt*1000).toLocaleDateString('en-US');
            console.log(date);
            const temperature = Math.floor(((responseList[i].temp.day - 273.15) * 1.80 + 32));
            const humidity = responseList[i].humidity;
            const weathericon = responseList[i].weather[0].icon;

            // Set the data to display
            const cardDay = $("<div>").addClass("card");
            const cardBody = $("<div>").addClass("card-body");
            const dateDayEl = $("<p>").addClass("card-title").text(date);
            const tempDayEl = $("<p>").addClass("card-title").text("Temp: " + temperature + ' F');
            const humidityDayEl = $("<p>").addClass("card-title").text("Humidity: " +humidity  + " %");
            const imagedDayEl = $("<img>").attr("src", "https://openweathermap.org/img/w/" + weathericon + ".png")

            // display on the page
            cardBody.append(dateDayEl,imagedDayEl, tempDayEl, humidityDayEl);
            cardDay.append(cardBody);
            $("#forecast").append(cardDay);
        }
}

// handle the user input
var searchInputHandler = function(event) {
    event.preventDefault();
    // get value form input element
    var cityName = searchInputEl.value.trim();   // trim() is good to use because we don't want any unnecessary spaces along with the text as username
    if (cityName){
        getweatherData(cityName);
        getweatherData_5DayForecast(cityName);
        searchInputEl.value = " "; // clear the input text
    }else{
        alert("Error:" + response.statusText);
    }
};

searchBtnEl.addEventListener("click", searchInputHandler);