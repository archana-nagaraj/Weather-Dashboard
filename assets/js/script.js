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

var getWeatherData = function(cityName){
    // format the weather dashboard api url
    var apiUrl = "http://api.openweathermap.org/data/2.5/weather?q=" +cityName + "&appid=" +apiKey;
    // make a request to the url
    fetch(apiUrl).then(function(response){
        response.json().then(function(data){
            console.log(data);
        });
    
    });
};

getWeatherData("London");
getWeatherData("Bangalore");
getWeatherData("San Jose");

