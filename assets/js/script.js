// create nav bar
// study weather dashboard api documentation
// access weather dashboard api - display in the console
// Add the search form
// Handle form submission
// Add error handling
// Display response data on page
// implement local storage for the searched cities
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

    // Set the data to display
    const card = $("<div>").addClass("card");
    const cardBody = $("<div>").addClass("card-body");
    const imageEl = $("<img>").attr("src", "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png");
        //convert Time of data calculation, unix, UTC to date specific locale
    const date = new Date(data.dt*1000).toLocaleDateString('en-US');
    const cityEl = $("<h4>").addClass("card-title").text(data.name + "  ("+date + ") " );
    // converting temp from Kelvin to Farenheit 
    const tempEl = $("<p>").addClass("card-text").text("Temperature: " +Math.floor(((data.main.temp - 273.15) * 1.80 + 32))+ ' F');
    const humidityEl = $("<p>").addClass("card-text").text("Humidity: " +data.main.humidity  + " %");
    const windspeedEl = $("<p>").addClass("card-text").text("Wind Speed: " +data.wind.speed + " MPH");
    const uvIndexUrl= "http://api.openweathermap.org/data/2.5/uvi?lat=" +data.coord.lat + "&lon=" +data.coord.lon +"&appid=" +apiKey;
    // fetching the uvIndex value
    fetch(uvIndexUrl)
    .then(function(response){
        return response.json();
    })
    .then(function(uvIndex){
        /* From resource: https://www.epa.gov/sunsafety/uv-index-scale-0
        https://www.epa.gov/sites/production/files/documents/uviguide.pdf */
        // Low
        if (uvIndex.value >=0 && uvIndex.value <=2){
          console.log("UVIndex is Low or favourable");
           var UVIndexEl = $("button").addClass("btn btn-success").text("UV Index: " +uvIndex.value);
         } // Moderate to High
         else if (uvIndex.value > 2 && uvIndex.value <= 7){
           console.log("UVIndex is Moderate to High");
           var UVIndexEl = $("button").addClass("btn btn-warning").text("UV Index: " +uvIndex.value);
         } // very High to Extreme
         else{
           console.log("UVIndex is Severe or Extreme");
           var UVIndexEl = $("button").addClass("btn btn-danger").text("UV Index: " +uvIndex.value);
         }
         cardBody.append(UVIndexEl);
    });
    cityEl.append(imageEl);
    cardBody.append(cityEl, tempEl, humidityEl, windspeedEl);
    card.append(cardBody);
    $("#currentDay").append(card);
};

// fetch 5-Day Weather Forecast by city
var getweatherData_5DayForecast = function(cityName){
    // format the weather dashboard api url by city name
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
    //    console.log(responseList);
        const forecastTitle = $("<h4>").addClass("forecast-title").text("5-Day Forecast:");
        $("#forecast-text").append(forecastTitle);
        for ( let i = 0; i < responseList.length; i++){
           // console.log(responseList[i]);
            //get the vaues
           


            // Set the data to display
           // const cardDeck = $("<div>").addClass("card-deck");
            const card = $("<div>").addClass("card text-white bg-primary");
            const cardBody = $("<div>").addClass("card-body");
            const date = new Date(responseList[i].dt*1000).toLocaleDateString('en-US');
            const dateEl = $("<p>").addClass("card-title").text(date);
            const tempEl = $("<p>").addClass("card-title").text("Temp: " + Math.floor(((responseList[i].temp.day - 273.15) * 1.80 + 32)) + ' F');
            const humidityEl = $("<p>").addClass("card-title").text("Humidity: " +responseList[i].humidity  + " %");
            const imagedEl = $("<img>").attr("src", "https://openweathermap.org/img/w/" + responseList[i].weather[0].icon + ".png")

            // display on the page
            $("#forecast").append()
            cardBody.append(dateEl,imagedEl, tempEl, humidityEl);
            card.append(cardBody);
           // $(cardDeck).append(cardDay);
            $("#forecast").append(card);
        }
}

// handle the user input
var searchInputHandler = function(event) {
    event.preventDefault();
    // get value from input element
    var cityName = searchInputEl.value.trim();   // trim() is good to use because we don't want any unnecessary spaces along with the text user might accidently type in
    if (cityName){
        getweatherData(cityName);
        getweatherData_5DayForecast(cityName);
        searchInputEl.value = " "; // clear the input text
    }else{
        alert("Error:" + response.statusText);
    }
};

searchBtnEl.addEventListener("click", searchInputHandler);


