// create nav bar
// study weather dashboard documentation
// access weather dashboard api - display in the console
// Add the search form
// Handle form submission
// Display response data on page
// Add error handling
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

var displayWeatherData = function(){
    console.log("displaying weather data");
}