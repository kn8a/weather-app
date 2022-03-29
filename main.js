//https://api.openweathermap.org/data/2.5/weather?q=london&units=metric&APPID=8e1dc4b03b256aff4e11d3c73b16bf4d

//&units=imperial

//const location = document.getElementById('location');
const btn = document.getElementById('submit');
btn.addEventListener('click', () => {
    getWeather(document.getElementById('loc').value, 'metric');
})




async function getWeather(location, unit){
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${unit}&APPID=8e1dc4b03b256aff4e11d3c73b16bf4d`);
    const weather = await response.json();
    console.log(weather);
}