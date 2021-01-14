// create nav bar
// study weather dashboard api documentation
// access weather dashboard api - display in the console
// Add the search form
// Handle form submission
// Add error handling
// Display response data on page
// Save the work in Git

//  Global Variables
const apiKey = "3b252b3f0afd61300c13bbf7516fcbb5";
var searchInputEl = document.querySelector("#search-input");
var searchBtnEl = document.querySelector("#search-btn");

// fetch weather data by city
var getweatherData = function(cityName){
    // format the weather dashboard api url
    var apiUrl = "http://api.openweathermap.org/data/2.5/weather?q=" +cityName + "&appid=" +apiKey;
    // make a request to the url
    fetch(apiUrl)
    .then(function(response) {
      // request was successful
      if (response.ok) {
        response.json().then(function(data) {
            console.log(data);
            displayWeatherData(data);
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
            console.log(data);
            
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

// Display response data on page
var displayWeatherData = function(data){
    const dataObj = data;
    const city = dataObj.name;
    const temperature = dataObj.main.temp;
    const humidity = dataObj.main.humidity;
    const windSpeed = dataObj.wind.speed;
    var weatherPic = dataObj.weather[0].icon;
    const date = new Date(dataObj.dt*1000).toLocaleDateString('en-US');

    // Set the data to display
    const card = $("<div>").addClass("card");
    const cardBody = $("<div>").addClass("card-body");
    const cityEl = $("<h4>").addClass("card-title").text(city);
    const currentDateEl = $("<h4>").addClass("card-title").text("(" +date + ")");
    const imageEl = $("<img>").attr("src", "https://openweathermap.org/img/w/" + weatherPic + ".png");
    const tempEl = $("<h4>").addClass("card-title").text("Temperature: " +temperature + ' F');
    const humidityEl = $("<h4>").addClass("card-title").text("Humidity: " +humidity  + " %");
    const windspeedEl = $("<h4>").addClass("card-title").text("Wind Speed: " +windSpeed + " MPH");
    const UVIndexEl = $("<h4>").addClass("card-title").text("UV Index:");

    // display on the page
    cityEl.append(currentDateEl);
    cityEl.append(imageEl);
    cardBody.append(cityEl, tempEl, humidityEl, windspeedEl, UVIndexEl);
    card.append(cardBody);
    $("#response-container").append(card);
}


