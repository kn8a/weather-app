const btn = document.getElementById('submit');
const loc = document.getElementById('loc');

log=console.log;

btn.addEventListener('click', (e) => {
    getWeather(loc.value, 'metric');
    e.preventDefault()
})

document.onload = getWeather('london', 'metric')


async function getWeather(location, unit){
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${unit}&APPID=8e1dc4b03b256aff4e11d3c73b16bf4d`);
    const data = await response.json();
    const lon = data.coord.lon;
    const lat = data.coord.lat;
    const localTime = await getLocalTime(lon,lat);
    log(data);
    parseData(data, localTime);
}

async function getLocalTime(lon,lat) {
    const response = await fetch(`https://api.ipgeolocation.io/timezone?apiKey=cc8c96fca3774daaa7fe5c898420b303&lat=${lat}&long=${lon}`);
    const data = await response.json();
    return data;
}


function parseData(data, localTime) {
    const windDir = windDegree(data.wind.deg);
    const windSpeed = Math.round(data.wind.speed, 0);
    const temp = Math.round(data.main.temp, 0);
    const tempH = Math.round(data.main.temp_max, 0);
    const tempL = Math.round(data.main.temp_min, 0);
    const tempFeel = Math.round(data.main.feels_like, 0);
    const humidity = Math.round(data.main.humidity, 0);
    const localDay = (localTime.date_time_txt).split(',');
    const weekDay = localDay[0];
    const currentTimeArray = (localTime.time_12).split(' ');
    const AmPm = currentTimeArray[1]
    const currentTimeArray1 = (localTime.time_12).split(':');
    const time = currentTimeArray1[0] + ":" + currentTimeArray1[1];
    const dateArray = (localTime.date).split('-');
    const day = dateArray[2]
    const month = dateArray[1]
    const year = dateArray[0]
    const cityName = data.name;
    const weatherCodeND = data.weather[0].icon;
    const weatherId = data.weather[0].id
    const nightDay = weatherCodeND.slice(-1);
    const desc = data.weather[0].description;
    const pressure = Math.round(data.main.pressure, 0);
    const country = data.sys.country;
    function windDegree(degrees){
        const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
        degrees = degrees * 8 / 360;
        degrees = Math.round(degrees, 0);
        degrees = (degrees + 8) % 8
        return(directions[degrees])
    }
    

    populateData(windDir, desc, windSpeed, temp, tempH, tempL, tempFeel, humidity, weekDay, AmPm, time, day, month, year, cityName, nightDay, weatherId, pressure, country);

}

function populateData(windDir, desc, windSpeed, temp, tempH, tempL, tempFeel, humidity, weekDay, AmPm, time, day, month, year, cityName, nightDay, weatherId, pressure, country){
    const img = document.getElementById('weather-img')
    img.src = `./weather-icons/${iconMap[nightDay][weatherId]}.svg`
    document.getElementById('condition').textContent = desc;
    document.getElementById('weekday').textContent = weekDay;
    document.getElementById('current-time').textContent = time + ' ' + AmPm;
    document.getElementById('date').textContent = `${day}/${month}/${year}`;
    document.getElementById('city').textContent = `${cityName}, ${country}`;
    document.getElementById('temp').textContent = `Current: ${temp}`;
    document.getElementById('feels').textContent = `Feels like: ${tempFeel}`;
    document.getElementById('wind-dir').textContent = `Direction: ${windDir}`;
    document.getElementById('wind-speed').textContent = `Speed: ${windSpeed}`;
    document.getElementById('humidity').textContent = `Humidity: ${humidity}%`;
    document.getElementById('pressure').textContent = `Pressure: ${pressure}`;
}





const iconMap = {
    "d": {
        "200": "thunderstorms-day-rain",
        "201": "thunderstorms-day-rain",
        "202": "thunderstorms-day-overcast-rain",
        "210": "thunderstorms-day",
        "211": "thunderstorms",
        "212": "thunderstorms-overcast",
        "221": "thunderstorms-overcast",
        "230": "thunderstorms-day-rain",
        "231": "thunderstorms-day-rain",
        "232": "thunderstorms-day-rain",
        "300": "partly-cloudy-day-drizzle",
        "301": "partly-cloudy-day-drizzle",
        "302": "overcast-day-drizzle",
        "310": "overcast-day-drizzle",
        "311": "drizzle",
        "312": "overcast-drizzle",
        "313": "overcast-drizzle",
        "314": "overcast-rain",
        "321": "overcast-rain",
        "500": "partly-cloudy-day-rain",
        "501": "partly-cloudy-day-rain",
        "502": "overcast-day-rain",
        "503": "overcast-day-rain",
        "504": "overcast-rain",
        "511": "sleet",
        "520": "partly-cloudy-day-rain",
        "521": "partly-cloudy-day-rain",
        "522": "overcast-day-rain",
        "531": "overcast-day-rain",
        "600": "partly-cloudy-day-snow",
        "601": "partly-cloudy-day-snow",
        "602": "overcast-day-snow",
        "611": "partly-cloudy-day-sleet",
        "612": "partly-cloudy-day-sleet",
        "613": "overcast-day-sleet",
        "615": "partly-cloudy-day-sleet",
        "616": "partly-cloudy-day-sleet",
        "620": "partly-cloudy-day-snow",
        "621": "partly-cloudy-day-snow",
        "622": "overcast-snow",
        "701": "mist",
        "711": "partly-cloudy-day-smoke",
        "721": "haze-day",
        "731": "dust-day",
        "741": "fog-day",
        "751": "dust-day",
        "761": "dust-day",
        "762": "overcast-smoke",
        "771": "wind",
        "781": "tornado",
        "800": "clear-day",
        "801": "partly-cloudy-day",
        "802": "partly-cloudy-day",
        "803": "overcast-day",
        "804": "overcast-day"
    },
    "n": {
        "200": "thunderstorms-night-rain",
        "201": "thunderstorms-night-rain",
        "202": "thunderstorms-night-overcast-rain",
        "210": "thunderstorms-night",
        "211": "thunderstorms",
        "212": "thunderstorms-overcast",
        "221": "thunderstorms-overcast",
        "230": "thunderstorms-night-rain",
        "231": "thunderstorms-night-rain",
        "232": "thunderstorms-night-rain",
        "300": "partly-cloudy-night-drizzle",
        "301": "partly-cloudy-night-drizzle",
        "302": "overcast-night-drizzle",
        "310": "overcast-night-drizzle",
        "311": "drizzle",
        "312": "overcast-drizzle",
        "313": "overcast-drizzle",
        "314": "overcast-rain",
        "321": "overcast-rain",
        "500": "partly-cloudy-night-rain",
        "501": "partly-cloudy-night-rain",
        "502": "overcast-night-rain",
        "503": "overcast-night-rain",
        "504": "overcast-rain",
        "511": "sleet",
        "520": "partly-cloudy-night-rain",
        "521": "partly-cloudy-night-rain",
        "522": "overcast-night-rain",
        "531": "overcast-night-rain",
        "600": "partly-cloudy-night-snow",
        "601": "partly-cloudy-night-snow",
        "602": "overcast-night-snow",
        "611": "partly-cloudy-night-sleet",
        "612": "partly-cloudy-night-sleet",
        "613": "overcast-night-sleet",
        "615": "partly-cloudy-night-sleet",
        "616": "partly-cloudy-night-sleet",
        "620": "partly-cloudy-night-snow",
        "621": "partly-cloudy-night-snow",
        "622": "overcast-snow",
        "701": "mist",
        "711": "partly-cloudy-night-smoke",
        "721": "haze-night",
        "731": "dust-night",
        "741": "fog-night",
        "751": "dust-night",
        "761": "dust-night",
        "762": "overcast-smoke",
        "771": "wind",
        "781": "tornado",
        "800": "clear-night",
        "801": "partly-cloudy-night",
        "802": "partly-cloudy-night",
        "803": "overcast-night",
        "804": "overcast-night"
    }}