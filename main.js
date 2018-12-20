var lat;
var long;
var temp = 0;
var tempUnits = "cels";
var key = "AIzaSyCpgxWvzjIh-E6FldhGDKYLz_mzvkxxAAY";

function convertToFahr(currTemp) {
    temp = Math.round((1.8 * currTemp) + 32);
    tempUnits = "fahr";
    return temp;
}

function convertToCels(currTemp) {
    temp = Math.round((currTemp - 32) / 1.8);
    tempUnits = "cels";
    return temp;
}

$("#fahr").on("click", function() {
    if (tempUnits != "fahr") {
        temp = convertToFahr(temp);
        document.getElementById('temp').innerHTML = temp + "&deg;F";
    } 
});

$("#cels").on("click", function() {
    if (tempUnits != "cels") {
        temp = convertToCels(temp);
        document.getElementById('temp').innerHTML = temp + "&deg;C";
    }
});

$("#getCoords").on("click", function() {
    getLocation();
});

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
        lat = position.coords.latitude;
        long = position.coords.longitude;
        showWeather();
        getCity();
        });
    }
}

function getCity() {
    $.getJSON("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + long + "&sensor=false" + "," + "CA&key=" + key, function(json) {
        document.getElementById("city").innerHTML = json.results[0].address_components[2].long_name + ", " + json.results[0].address_components[4].short_name;
    });
}
function showWeather() {
    console.log("https://fcc-weather-api.glitch.me/api/current?lon=" + long + "&lat=" + lat);
    $.getJSON("https://fcc-weather-api.glitch.me/api/current?lon=" + long + "&lat=" + lat, function(json) {
        document.getElementById('weather-container').classList.remove("weath-contain");
        document.getElementById('coordsButton').classList.add("weath-contain");
        document.getElementById('description').innerHTML = json.weather[0].description;
        temp = json.main.temp;
        temp = convertToFahr(temp);
        document.getElementById('temp').innerHTML = temp + "&deg;F";
        if (json.weather[0].main === "Rain") {
            console.log("hi");
            document.getElementById("icon").className += "fas fa-tint";
        }
        if (json.weather[0].main === "Sun" | json.weather[0].main === "Clear")
            document.getElementById("icon").className += "fas fa-sun-o";
        if (json.weather[0].main === "Clouds")
            document.getElementById("icon").className += "fas fa-cloud";
        if (json.weather[0].main === "Snow")
            document.getElementById("icon").className += "fas fa-snowflake-o";
    });
}