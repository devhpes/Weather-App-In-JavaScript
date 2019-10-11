const latitude = document.querySelector(".lat");
const longitude = document.querySelector(".long");
const currentTemp = document.querySelector(".currentTemperature");
const currentSymbol = document.querySelector(".currentTemp");
const icons = document.querySelector(".icons");
const change = document.querySelector("temp");
const button = document.querySelector(".button");
const timezone = document.querySelector(".currentTimezone");
const symbol = document.querySelector(".symbol");

window.addEventListener("load", () => {
  getLocation();
  skyCons();
});

getLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      latitude.textContent = lat;
      longitude.textContent = long;

      //Bypassing CORS policy thanks to Dev Ed
      const corsproxy = `https://cors-anywhere.herokuapp.com/`;
      const darkSkyUrl = `${corsproxy}https://api.darksky.net/forecast/3677a24cdd8605c96719f672ce004eaf/${long},${lat}`;

      fetch(darkSkyUrl)
        .then(function(response) {
          if (response.status !== 200) {
            console.log(
              "Looks like there was a problem. Status Code: " + response.status
            );
            return;
          }
          response.json().then(function(data) {
            let temperature = data.currently.temperature;
            currentTemp.textContent = temperature;
            timezone.textContent = data.timezone;
            let fahrenheit = ((temperature - 32) * 5) / 9;
            button.addEventListener("click", () => {
              if (currentSymbol.textContent === "°C") {
                currentSymbol.textContent = "°F";
                currentTemp.textContent = fahrenheit.toFixed(2);
              } else {
                currentSymbol.textContent = "°C";
                currentTemp.textContent = temperature;
              }
            });
          });
        })
        .catch(function(err) {
          console.log("Fetch Error: ", err);
        });
    });
  } else {
    alert("Geolocation is not supported by this browser.");
  }
};

//Code from skycons, If you want to change icons just replace the canvas id in HTML with the below list id
// And this icon is just for fun. It will not change according to the Weather.

skyCons = () => {
  var icons = new Skycons(),
    list = [
      "clear-day",
      "clear-night",
      "partly-cloudy-day",
      "partly-cloudy-night",
      "cloudy",
      "rain",
      "sleet",
      "snow",
      "wind",
      "fog"
    ],
    i;
  for (i = list.length; i--; ) icons.set(list[i], list[i]);

  icons.play();
};

buttonSymbol = () => {
  button.addEventListener("click", () => {
    if (symbol.textContent === "°F") {
      symbol.textContent = "°C";
    } else {
      symbol.textContent = "°F";
    }
  });
};

buttonSymbol();