
function getWeather () {

    const apiKey = '0a22980bf291d9382a648731fea10051';
    const city = document.getElementById('city').value;

    if (!city) {
        alert('Please enter a city');
    }

    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

    fetch(currentWeatherUrl).then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Request failed!');
    }, networkError => console.log(networkError.message)
).then(jsonResponse => {
    displayWeather(jsonResponse)
});

fetch(forecastUrl)
.then(response => response.json())
.then(data => {
    displayHourlyForecast(data.list)
})
.catch(error => {
    console.error('Error fetching hourly forecast data:', error);
    alert('Error fetching hourly forecast data. please try again');
})

}

function displayWeather(jsonResponse) {

    const tempDivInfo = document.getElementById('temp-div');
    const weatherInfoDiv = document.getElementById('weather-info');
    const weatherIcon = document.getElementById('weather-icon');
    const hourlyForecastDiv = document.getElementById('hourly-forecast');

    // clear out any existing content 

    weatherInfoDiv.innerHtml = '';
    tempDivInfo.innerHTML = '';
    hourlyForecastDiv.innerHTML = '';

    if (jsonResponse.cod === '404') {
        weatherInfoDiv.innerHTML = `<p>${jsonResponse.message}</p>`
    } else {
        const cityName = jsonResponse.name;
        const temperature = Math.round(jsonResponse.main.temp - 273.15);
        const description = jsonResponse.weather[0].description;
        const iconCode = jsonResponse.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

        const temperatureHtml = `<p>${temperature} °C</p>`;
        const weatherHtml = `
            <p>${cityName}</p>
            <p>${description}</p>
        `;

        tempDivInfo.innerHTML = temperatureHtml;
        weatherInfoDiv.innerHTML = weatherHtml;
        weatherIcon.src = iconUrl;
        weatherIcon.alt = description;

        showImage();
    }
}


    function displayHourlyForecast(hourlyData) {
        const hourlyForecastDiv = document.getElementById('hourly-forecast');
        const next24Hours = hourlyData.slice(0, 8);

        next24Hours.forEach(item => {
            const dateTime = new Date(item.dt * 1000);
            const hour = dateTime.getHours();
            const temperature = Math.round(item.main.temp - 273.15);
            const iconCode = item.weather[0].icon;
            const iconUrl = `https:openweathermap.org/img/wn/${iconCode}.png`;

            const hourlyItemHtml = `
                <div class="hourly-item">
                    <span>${hour}:00</span>
                    <img src="${iconUrl}" alt="Hourly Weather Icon">
                    <span>${temperature} °C</span>
                </div>
            `;

            hourlyForecastDiv.innerHTML += hourlyItemHtml;

        })
    }

    function showImage() {
        const weatherIcon = document.getElementById('weather-icon');
        weatherIcon.style.display = 'block';
    }