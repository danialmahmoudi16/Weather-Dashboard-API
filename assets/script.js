const apiKey = 'a2986e392fb8f98a746af14b93d91f5a';
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const searchHistory = document.getElementById('search-history');
const currentWeather = document.getElementById('current-weather');
const currentTemp = document.getElementById('current-temp');
const currentWind = document.getElementById('current-wind');
const currentHumidity = document.getElementById('current-humidity');
const fiveDayForecast = document.getElementById('five-day-forecast');
const forecastColumns = document.getElementsById('5-day-forecast-columns');

// fetch current weather data
function fetchCurrentWeather(city) {
    fetch(apiUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        currentWeather.textContent = data.city.name;
        currentTemp.textContent = 'Temp:' + data.current.temp + '°F';
        currentWind.textContent = 'Wind:' + data.current.wind_speed + 'MPH';
        currentHumidity.textContent = 'Humidity:' + data.current.humidity + '%';
    });
}
