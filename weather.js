const apikey = "436259f4162b8488d658956d12d67387";
console.log(apikey);
const weatherDataEl = document.getElementById("weather-data");
const cityInputEl = document.getElementById("city-input");
const formEl = document.querySelector(".search");

const iconMap = {
  "01d": "clear.png",
  "01n": "clear-night.png",

  "02d": "few-clouds.png",
  "02n": "few-clouds-night-night.png",

  "03d": "scattered-clouds.png",
  "03n": "scattered-clouds-night.png",

  "04d": "broken-clouds.png",
  "04n": "scattered-clouds-night.png",

  "09d": "shower-rain.png",
  "09n": "shower-rain-night.png",

  "10d": "shower-rain.png",
  "10n": "shower-rain-night.png",

  "11d": "thunderstorm.png",
  "11n": "thunderstorm-night.png",

  "13d": "snow.png",
  "13n": "snow-night.png",

  "50d": "fog.png",
  "50n": "fog-night.png",
};

window.addEventListener("load", () => {
  getWeatherData("Karachi");
});

formEl.addEventListener("click", (event) => {
  event.preventDefault();
  const cityValue = cityInputEl.value.trim();

  if (cityValue === "") {
    getWeatherData("Karachi");
  } else {
    getWeatherData(cityValue);
  }
});

async function getWeatherData(cityValue) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apikey}&units=metric`
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    console.log(data);

    const cityName = data.name;
    const temperature = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const icon = data.weather[0].icon;
    const iconUrl =
      iconMap[icon] || `http://openweathermap.org/img/wn/${icon}.png`;

    const details = [
      `Humidity: ${data.main.humidity}%  <img src="humidity.png" alt="Humidity">`,
      `Wind speed: ${data.wind.speed} m/s <img src="wind speed.png" alt="Wind Speed">`,
    ];

    weatherDataEl.querySelector(".city-name").textContent = cityName;
    weatherDataEl.querySelector(
      ".icon"
    ).innerHTML = `<img src="${iconUrl}" alt="Weather Icon">`;
    weatherDataEl.querySelector(
      ".temperature"
    ).textContent = `${temperature}°C`;
    weatherDataEl.querySelector(".description").textContent = description;

    weatherDataEl.querySelector(".details").innerHTML = details
      .map((detail) => `<div>${detail}</div>`)
      .join("");
  } catch (error) {
    weatherDataEl.querySelector(".icon").innerHTML = "";
    weatherDataEl.querySelector(".temperature").textContent = "";
    weatherDataEl.querySelector(".description").textContent =
      "The city name you entered is not valid. Please try again";

    weatherDataEl.querySelector(".details").innerHTML = "";
  }
}
