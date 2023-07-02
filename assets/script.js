const apiKey = 'a2986e392fb8f98a746af14b93d91f5a';


const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const searchHistory = document.getElementById('search-history');
const currentWeather = document.getElementById('current-weather');
const currentTemp = document.getElementById('current-temp');
const currentWind = document.getElementById('current-wind');
const currentHumidity = document.getElementById('current-humidity');
const fiveDayForecast = document.getElementById('five-day-forecast');
const forecastColumns = document.getElementById('5-day-forecast-columns');


function fetchWeatherData(city) {
    const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q='+city+'&appid=a2986e392fb8f98a746af14b93d91f5a';
    fetch(apiUrl)
    .then(function (response) {
        if (!response.ok) {
            throw response.json('No weather data found');
        }
        return response.json();
    })
    .then(function (data) {
        displayCurrentWeather(data);
    })
    .catch(function (error) {
        alert('Unable to connect to OpenWeather');
    });
}



// fetch current weather data
function displayCurrentWeather(weatherData) {

        currentWeather.textContent = weatherData.name;
        currentTemp.textContent = 'Temp:' + convertKelvinToFarenheit(weatherData.main.temp) + ' °F ';
        currentWind.textContent = 'Wind:' + convertMetersPerSecondToMPH(weatherData.wind.speed) + ' MPH ';
        currentHumidity.textContent = 'Humidity:' + weatherData.main.humidity + ' % ';
    };


// // fetch 5 day forecast data
// function fetchFiveDayForecast(city) {
//     const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

//     fetch(apiUrl)
//     .then(function (response) {
//         return response.json();
//     })
//     .then(function (data) {
//         fiveDayForecast.innerHTML = '<h2>5-Day Forecast:</h2>';
//         forecastColumns.innerHTML = '';
//         for (let i = 0; i < data.forecast.forecastday.length; i++) {
//             const forecast = data.forecastday[i];
//             const column = document.createElement('div');
//             column.classList.add('column');
//             column.innerHTML = `
//             <div class="col--12 mb-3">
//             <div class="date">${forecast.date}</div>
//             <div class="icon">
//              <img src="${forecast.day.condition.icon}" 
//              alt="weather Icon">
//              </div>
//              <div class="temp">Temp: ${forecast.day.avgtemp_f}°F</div>
//              <div class="wind">Wind: ${forecast.day.maxwind_mph}MPH</div>
//              <div class="humidity">Humidity: ${forecast.day.avghumidity}%</div>
//                 </div>
//              `;
//                 forecastColumns.appendChild(column);
//         }
//     });
// }

function handleSearchFormSubmit(event) {
    event.preventDefault();
    const userSearch = cityInput.value.trim();
    cityInput.value = '';

    if (userSearch) {
        fetchWeatherData(userSearch);
    }
}

function convertKelvinToFarenheit(kelvin) {
    return Math.round((kelvin - 273.15) * 9/5 + 32);
}

function convertMetersPerSecondToMPH(metersPerSecond) {
    return Math.round(metersPerSecond * 2.237);
}

searchBtn.addEventListener('click', handleSearchFormSubmit);