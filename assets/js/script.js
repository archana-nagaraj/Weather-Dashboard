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
// api urls
const apiUrl_currentDay = "https://api.openweathermap.org/data/2.5/weather?q=";
const apiUrl_forecast = "https://api.openweathermap.org/data/2.5/forecast/daily?q=" ;
const weathericonUrl = "http://openweathermap.org/img/w/";
const uvUrl = "https://api.openweathermap.org/data/2.5/uvi?lat=" ;

var searchInputEl = $("#search-input");
var searchBtnEl = $("#search-btn");
let searchHistoryEl = $(".historyItems");
var searchHistoryArr = [];

$(document).ready(function() {
  init();
function init(){
    citySearch(); 
    displaySearchHistory();
    clearSearchHistory();
    clickSearchHistory();
}

function citySearch() {
  searchBtnEl.on('click', function() {
    citySearch = $('#search-input').val().trim();
    if (citySearch === '') {
      return;
    }
    $('#search-input').val('');
    getweatherData(citySearch);
    getweatherData_5DayForecast(citySearch);
    storeHistory(citySearch);
  });
}

// fetch current day weather data by city
var getweatherData = function(cityName){
    // format the weather dashboard api url
    let apiUrl = apiUrl_currentDay +cityName + "&appid=" +apiKey;
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
    const imageEl = $("<img>").attr("src", weathericonUrl + data.weather[0].icon + ".png");
        //convert Time of data calculation, unix, UTC to date specific locale
    const cityEl = $("<h4>").addClass("card-title").text(data.name + "  ("+new Date(data.dt*1000).toLocaleDateString('en-US') + ") " );
    // converting temp from Kelvin to Farenheit 
    const tempEl = $("<p>").addClass("card-text").text("Temperature: " +Math.floor(((data.main.temp - 273.15) * 1.80 + 32))+ ' °F');
    const humidityEl = $("<p>").addClass("card-text").text("Humidity: " +data.main.humidity  + " %");
    const windspeedEl = $("<p>").addClass("card-text").text("Wind Speed: " +data.wind.speed + " MPH");
    const uvIndexUrl=  uvUrl +data.coord.lat + "&lon=" +data.coord.lon +"&appid=" +apiKey;
    // fetching the uvIndex value
    fetch(uvIndexUrl)
    .then(function(response){
        return response.json();
    })
    .then(function(uvIndex){
        /* Resource: 
        https://www.epa.gov/sunsafety/uv-index-scale-0
        https://www.epa.gov/sites/production/files/documents/uviguide.pdf 
        https://www.dreamstime.com/illustration/uv-index.html */   
        // Low
        if (uvIndex.value >=0 && uvIndex.value <=2){
          console.log("UVIndex is Low or favourable");
          var UVIndexTitle = $("<p>").addClass("card-text").text("UV Index: ");
           var UVIndexValue = $("<span>").addClass("favourable").text(uvIndex.value);
         } // Moderate 
         else if (uvIndex.value > 2 && uvIndex.value <= 5){
           console.log("UVIndex is Moderate");
           var UVIndexTitle = $("<p>").addClass("card-text").text("UV Index: ");
           var UVIndexValue = $("<span>").addClass("moderate").text(uvIndex.value);
         } // High
         else if (uvIndex.value > 5 && uvIndex.value <= 7){
          console.log("UVIndex is High");
          var UVIndexTitle = $("<p>").addClass("card-text").text("UV Index: ");
          var UVIndexValue = $("<span>").addClass("high").text(uvIndex.value);
        }
         // Very High
         else if (uvIndex.value > 7 && uvIndex.value <= 10){
          console.log("UVIndex is Very High/Severe");
          var UVIndexTitle = $("<p>").addClass("card-text").text("UV Index: ");
          var UVIndexValue = $("<span>").addClass("severe").text(uvIndex.value);
         } //Extreme
         else 
         {
           console.log("UVIndex is Extreme!!!");
           var UVIndexTitle = $("<p>").addClass("card-text").text("UV Index: ");
           var UVIndexValue = $("<span>").addClass("extreme").text(uvIndex.value); 
         } 
         var UVIndexEl = UVIndexTitle.append(UVIndexValue);
         cardBody.append(UVIndexEl);
    });

    cityEl.append(imageEl);
    cardBody.append(cityEl, tempEl, humidityEl, windspeedEl);
    card.append(cardBody);
    $("#currentDay").empty();
    $("#currentDay").append(card);
};

// fetch 5-Day Weather Forecast by city
var getweatherData_5DayForecast = function(cityName){
    // format the weather dashboard api url by city name
   let apiUrl = apiUrl_forecast +cityName + "&cnt=5&appid=" +apiKey;
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
        $("#forecast-text").empty();
        $("#forecast-text").append(forecastTitle);
        $("#forecast").empty();
        const carddeck = $("<div>").addClass("card-deck");
        for ( let i = 0; i < responseList.length; i++){
           // console.log(responseList[i]);
            const card = $("<div>").addClass("card text-white bg-primary");
            const cardBody = $("<div>").addClass("card-body");
            const dateEl = $("<p>").addClass("card-title").text(new Date(responseList[i].dt*1000).toLocaleDateString('en-US'));
            const tempEl = $("<p>").addClass("card-title").text("Temp: " + Math.floor(((responseList[i].temp.day - 273.15) * 1.80 + 32)) + ' °F');
            const humidityEl = $("<p>").addClass("card-title").text("Humidity: " +responseList[i].humidity  + " %");
            const imageEl = $("<img>").attr("src", weathericonUrl + responseList[i].weather[0].icon + ".png")

            // display on the page
            cardBody.append(dateEl,imageEl, tempEl, humidityEl);
            carddeck.append(card);
            card.append(cardBody);
            $("#forecast").append(carddeck);
        }
}

function storeHistory(citySearchName) {
  var searchHistoryObj = {};
  if (searchHistoryArr.length === 0) {
    searchHistoryObj['city'] = citySearchName;
    searchHistoryArr.push(searchHistoryObj);
    localStorage.setItem('searchHistory', JSON.stringify(searchHistoryArr));
  } else {
    var checkHistory = searchHistoryArr.find(
      ({ city }) => city === citySearchName
    );

    // store upto 10 search items and display
    if (searchHistoryArr.length < 10) {
      if (checkHistory === undefined) {
        searchHistoryObj['city'] = citySearchName;
        searchHistoryArr.push(searchHistoryObj);
        //console.log("1sttime");
        localStorage.setItem(
          'searchHistory',
          JSON.stringify(searchHistoryArr)
        );
      }
    } else {
      if (checkSearchHistory === undefined) {
        searchHistoryArr.shift();
        searchHistoryObj['city'] = citySearchName;
        searchHistoryArr.push(searchHistoryObj);
        //console.log("2ndtime");
        localStorage.setItem(
          'searchHistory',
          JSON.stringify(searchHistoryArr)
        );
      }
    }
  }
  $('#search-history').empty();
  displaySearchHistory();
}

function displaySearchHistory() {
  var getLocalSearchHistory = localStorage.getItem('searchHistory');
  var localSearchHistory = JSON.parse(getLocalSearchHistory);
  if (getLocalSearchHistory === null) {
    createSearchHistory();
    getLocalSearchHistory = localStorage.getItem('searchHistory');
    localSearchHistory = JSON.parse(getLocalSearchHistory);
  }

  for (var i = 0; i < localSearchHistory.length; i++) {
    var historyLi = $('<li>');
    historyLi.addClass('list-group-item');
    historyLi.text(localSearchHistory[i].city);
    $('#search-history').prepend(historyLi);
    $('#search-history-container').show();
  }
  return (searchHistoryArr = localSearchHistory);
}

function createSearchHistory() {
  searchHistoryArr.length = 0;
  localStorage.setItem('searchHistory', JSON.stringify(searchHistoryArr));
  
}

function clearSearchHistory() {
  $('#clear-button').on('click', function() {
    $('#search-history').empty();
    $('#search-history-container').hide();
    localStorage.removeItem('searchHistory');
    createSearchHistory();
  });
}

function clickSearchHistory() {
  $('#search-history').on('click', 'li', function() {
    var cityNameHistory = $(this).text();
    getweatherData(cityNameHistory);
    getweatherData_5DayForecast(cityNameHistory);
  });
}

});