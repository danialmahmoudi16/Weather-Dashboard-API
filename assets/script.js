const apiKey = 'a2986e392fb8f98a746af14b93d91f5a';
const searchHistoryArray = [];

const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const searchHistory = document.getElementById('search-history');
const currentWeather = document.getElementById('current-weather');
const currentTemp = document.getElementById('current-temp');
const currentWind = document.getElementById('current-wind');
const currentHumidity = document.getElementById('current-humidity');
const fiveDayForecast = document.getElementById('five-day-forecast');
const forecastColumns = document.getElementById('five-day-forecast-columns');

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
function fetchForecastData(city) {
    const forecastApiUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=a2986e392fb8f98a746af14b93d91f5a';
    fetch(forecastApiUrl)
        .then(function (futureResponse) {
            if (!futureResponse.ok) {
                throw futureResponse.json('No weather data found');
            }
            return futureResponse.json();
        })
        .then(function (futureData) {
            displayFiveDayForecast(futureData);
        })
        .catch(function (error) {
            console.log(error);
            alert('Unable to connect to OpenWeather');
        });
}


// Display current weather data
function displayCurrentWeather(weatherData) {

    currentWeather.textContent = weatherData.name + currentDate();
    currentWeather.appendChild(currentWeatherIcon(weatherData));
    currentTemp.textContent = 'Temp:' + convertKelvinToFarenheit(weatherData.main.temp) + ' °F ';
    currentWind.textContent = 'Wind:' + convertMetersPerSecondToMPH(weatherData.wind.speed) + ' MPH ';
    currentHumidity.textContent = 'Humidity:' + weatherData.main.humidity + ' % ';
};


// Display 5 day forecast data
function displayFiveDayForecast(forecastData) {
    console.log(forecastData);
    forecastColumns.innerHTML = '';
    for (let i = 0; i < 40; i += 8) {
        const forecast = forecastData.list[i];

        const forecastColumn = document.createElement('div');
        forecastColumn.classList.add('col', 'forecast-card', 'text-white', 'rounded', 'p-3', 'm-2');

        const forecastDate = document.createElement('h3');
        forecastDate.textContent = formatDate(forecast.dt_txt);
        forecastDate.classList.add('forecast-date');
        forecastColumn.appendChild(forecastDate);

        const forecastIcon = document.createElement('img');
        const iconUrl = 'https://openweathermap.org/img/w/' + forecast.weather[0].icon + '.png';
        forecastIcon.setAttribute('src', iconUrl);
        forecastColumn.appendChild(forecastIcon);

        const forecastTemp = document.createElement('p');
        forecastTemp.innerHTML = `<span>Temp:</span> ${convertKelvinToFarenheit(forecast.main.temp)} °F`;
        forecastColumn.appendChild(forecastTemp);

        const forecastWind = document.createElement('p');
        forecastWind.innerHTML = `<span>Wind:</span> ${convertMetersPerSecondToMPH(forecast.wind.speed)} MPH`;
        forecastColumn.appendChild(forecastWind);

        const forecastHumidity = document.createElement('p');
        forecastHumidity.innerHTML = `<span>Humidity:</span> ${forecast.main.humidity} %`;
        forecastColumn.appendChild(forecastHumidity);

        forecastColumns.appendChild(forecastColumn);
    }
}

function displaySearchHistory(history) {
    searchHistory.innerHTML = '';
    for (let i = history.length - 1; i >= 0; i--) {
        const historyItem = document.createElement('li');
        historyItem.classList.add('list-group-item', 'bg-secondary', 'text-white', 'rounded', 'p-2', 'm-2');
        historyItem.textContent = history[i];
        historyItem.addEventListener('click', function () {
            fetchWeatherData(history[i]);
            fetchForecastData(history[i]);
        });
        searchHistory.appendChild(historyItem);
    }
}



// Handle search form submit
function handleSearchFormSubmit(event) {
    event.preventDefault();
    const userSearch = cityInput.value.trim();
    cityInput.value = '';

    if (userSearch) {
        fetchWeatherData(userSearch);
        fetchForecastData(userSearch);

        searchHistoryArray.push(userSearch);
        if (searchHistoryArray.length > 5) {
            searchHistoryArray.shift();
        }

        localStorage.setItem('searchHistory', JSON.stringify(searchHistoryArray));

        displaySearchHistory(searchHistoryArray);
    }
}

function loadSearchHistory() {
    const storedSearchHistory = JSON.parse(localStorage.getItem('searchHistory'));
    if (storedSearchHistory) {
        searchHistoryArray = JSON.parse(storedSearchHistory);
        displaySearchHistory(searchHistoryArray);
    }
}

window.addEventListener('load', loadSearchHistory);


// Convert Kelvin to Farenheit
function convertKelvinToFarenheit(kelvin) {
    return Math.round((kelvin - 273.15) * 9 / 5 + 32);
}

// Convert meters per second to MPH
function convertMetersPerSecondToMPH(metersPerSecond) {
    return Math.round(metersPerSecond * 2.237);
}

function formatDate(date) {
    const dateTypes = { weekday: "short", month: "short", day: "numeric" };
    return new Date(date).toLocaleDateString("en-US", dateTypes);
}

function currentDate() {
    const currentDate = new Date();
    const dateTypes = { weekday: "short", month: "short", day: "numeric" };
    return new Date().toLocaleDateString("en-US", dateTypes);
}

function currentWeatherIcon(weatherData) {
    const icon = document.createElement('img');
    const iconUrl = 'https://openweathermap.org/img/w/' + weatherData.weather[0].icon + '.png';
    icon.setAttribute('src', iconUrl);
    return icon;
}

searchBtn.addEventListener('click', handleSearchFormSubmit);