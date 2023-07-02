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

// Fetches current weather data from OpenWeather API`
function fetchWeatherData(city) {
    const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=a2986e392fb8f98a746af14b93d91f5a';
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

// Fetches 5 day forecast data from OpenWeather API
function fetchForecastData(weatherData) {
    const apiUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=a2986e392fb8f98a746af14b93d91f5a';
    fetch(apiUrl)
        .then(function (response) {
            if (!response.ok) {
                throw response.json('No weather data found');
            }
            return response.json();
        })
        .then(function (data) {
            displayFiveDayForecast(data);
        })
        .catch(function (error) {
            alert('Unable to connect to OpenWeather');
        });
}


// Display current weather data
function displayCurrentWeather(weatherData) {

    currentWeather.textContent = weatherData.name;
    currentTemp.textContent = 'Temp:' + convertKelvinToFarenheit(weatherData.main.temp) + ' °F ';
    currentWind.textContent = 'Wind:' + convertMetersPerSecondToMPH(weatherData.wind.speed) + ' MPH ';
    currentHumidity.textContent = 'Humidity:' + weatherData.main.humidity + ' % ';
};


// Display 5 day forecast data




// Handle search form submit
function handleSearchFormSubmit(event) {
    event.preventDefault();
    const userSearch = cityInput.value.trim();
    cityInput.value = '';

    if (userSearch) {
        fetchWeatherData(userSearch);
    }
}

// Convert Kelvin to Farenheit
function convertKelvinToFarenheit(kelvin) {
    return Math.round((kelvin - 273.15) * 9 / 5 + 32);
}

// Convert meters per second to MPH
function convertMetersPerSecondToMPH(metersPerSecond) {
    return Math.round(metersPerSecond * 2.237);
}


searchBtn.addEventListener('click', handleSearchFormSubmit);