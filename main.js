const API_KEY = 'ed0b4cb87a45b3d6ae1241e9e0f2593b'

const fetchData = position => {
    const {latitude, longitude} = position.coords;
    fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${latitude}&lon=${longitude}&appid=${API_KEY}`)
        .then(Response => Response.json())
        .then(data => setWeatherData(data))
}
const setWeatherData = data =>{
    console.log(data);
    const weatherData = {
        location: data.name,
        description: data.weather[0].main,
        humidity: 'hum: '+(data.main.humidity + '%'),
        pressure: 'pres: ' + data.main.pressure,
        temperature: (Math.floor(data.main.temp)+'°C'),
        tempmax: ' ' + data.main.temp_max,
        tempmin: ' ' + data.main.temp_min,
        date: getDate(),
    }
    Object.keys(weatherData).forEach(key =>{
        document.getElementById(key).textContent = weatherData[key];
    })
}
const getDate = () => {
    let date = new Date();
    return `${date.getDate()}-${('0' + (date.getMonth()+1)).slice(-2)}-${date.getFullYear()}`
}
const onLoad = () => {
    navigator.geolocation.getCurrentPosition(fetchData);
}