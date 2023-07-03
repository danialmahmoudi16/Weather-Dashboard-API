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
function fetchForecastData(city) {
    const forecastApiUrl = 'https://api.openweathermap.org/data/2.5/forecast?q='+city+'&appid=a2986e392fb8f98a746af14b93d91f5a';
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

    currentWeather.textContent = weatherData.name;
    currentTemp.textContent = 'Temp:' + convertKelvinToFarenheit(weatherData.main.temp) + ' °F ';
    currentWind.textContent = 'Wind:' + convertMetersPerSecondToMPH(weatherData.wind.speed) + ' MPH ';
    currentHumidity.textContent = 'Humidity:' + weatherData.main.humidity + ' % ';
};


// Display 5 day forecast data
function displayFiveDayForecast(forecastData) {
    console.log(forecastData);
    forecastColumns.innerHTML = '';
    for (let i = 0; i < 5; i++) {
        const forecast = forecastData.list[i];

        const forecastColumn = document.createElement('div');
        forecastColumn.classList.add('col', 'bg-primary', 'text-white', 'rounded', 'p-2', 'm-2');

        // const forecastDate = document.createElement('h3');
        // forecastDate.textcontent = formatDate(forecast.date);
        // forecastColumn.appendChild(forecastDate);

        // const forecastIcon = document.createElement('img');


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




// Handle search form submit
function handleSearchFormSubmit(event) {
    event.preventDefault();
    const userSearch = cityInput.value.trim();
    cityInput.value = '';

    if (userSearch) {
        fetchWeatherData(userSearch);
        fetchForecastData(userSearch);
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