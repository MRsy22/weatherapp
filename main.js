function getWeather (){
    const apikey = 'f96b37ded5fc978671bce6efa1ebdbb4';
    const city = document.getElementById('city').values
    if (!city){
        alert('Please enter a city');
        return;
    }
const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APIkey}`;

fetch (currentWeatherUrl)
.then(response => response.json())
.then(data =>{
displayWeather(data);
})
.catch(error => {
    console.error('Error fetching current weather data:',error);
    alert('Error fetching current weather data.Please try again.')
})
fetch(forecastURl)
.then(response => response.json())
.then(data => {
    displayHourlyforecast(data.list)
})
.catch(error => {
    console.error('Error fetching Hourly forecast data:',error);
    alert('Error fetching hourly forecast data.Please try again.')
})
function displayWeather(data){
    const tempDivInfo = document.getElementById('temp-div');
    const weatherInfoDiv = document.getElementById('weather-info')
    const weatherIcon = document.getElementById('weather-icon')
    const hourlyforecastDiv = document.getElementById('hourly-forecast')
    
    weatherInfoDiv.innerHTML= '';
    hourlyforecastDiv.innerHTML='';
    tempDivInfo.innerHTML='';
}
function displayWeather(data){
    if (data.cod==='404'){
        weatherInfoDiv.innerHTML = `<p>${data.message}</p>`;
    }else{
        const cityName = data.name;
        const temperature = Math.round (data.main.temp - 273.15);
        const description = data.weather[0].description;
        const iconCode = data.weather[0].icon;
        const iconURl = `http://maps.openweathermap.org/maps/2.0/weather/{op}/{z}/{x}/{y}?appid={API key}`

        const temperatureHTML = `
        <p>${temperature}°C</p>
        `;
        const weatherHTML = `
        <p>${cityName}</p>
        <p>${description}</p>
        `;

        tempDivInfo.innerHTML = temperatureHTML;
        weatherInfoDiv.innerHTMl = weatherHTML;
        weatherIcon.src = iconURl;
        weatherIcon.alt = description;

        showImage();
    }
}
function displayHourlyforecast(hourlyData){
    const hourlyforecastDiv = document.getElementById('hourlry-forecast');
    const next24Hours = hourlyData.slice(0,8);
    
    next24Hours.forEach(item =>{
        const dataTime = new Date(item.dt * 1000);
        const hour = dataTime.getHours();
        const temperature = Math.round(item.main.temp -273.15);
        const iconCode = item.weather[0].icon;
        const iconURl = `http://maps.openweathermap.org/maps/2.0/weather/{op}/{z}/{x}/{y}?appid={API key}`

        const hourlyItemHTML= `
        <div class="hourly-item">
        <spasn>${hour}:00</sapn>
        <img src="${iconURl}" alt= Hourly weather icon>
        <span>${temperature}°C</span>
        </div>
        `;
        hourlyforecastDiv.innerHTML += hourlyItemHTML;
    });
}
function showImage(){
    const weatherIcon = document.getElementById('weather-icon');
    weatherIcon.style.display = 'block';
}

}