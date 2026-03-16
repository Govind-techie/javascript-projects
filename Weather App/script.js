const API = "1f8b4c3a4fc3c9be13530492155e4dcb";
const URL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

let searchBox = document.querySelector('.search input');
let searchBtn = document.querySelector('.search button');
let weatherIcon = document.querySelector('.weather-icon');

async function checkWeather(city){
    const response = await fetch(URL + city + `&appid=${API}`);
    
    if (response.status === 404) {
        document.querySelector('.error').style.display = "block";
        document.querySelector('.weather').style.display = "none";
    }else{
        let data = await response.json();
        
        document.querySelector('.city').innerHTML = data.name;
        document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector('.wind').innerHTML = data.wind.speed + " km/h";
        document.querySelector('.humidity').innerHTML = data.main.humidity + "%";
        
        if (data.weather[0].main === 'Clouds'){
            weatherIcon.src = 'images/clouds.png';
        }else if(data.weather[0].main === 'Clear'){
            weatherIcon.src = 'images/clear.png';
        }else if(data.weather[0].main === 'Drizzle'){
            weatherIcon.src = 'images/drizzle.png';
        }else if(data.weather[0].main === 'Rain'){
            weatherIcon.src = 'images/rain.png';
        }else if(data.weather[0].main === 'Snow'){
            weatherIcon.src = 'images/snow.png';
        }else if(data.weather[0].main === 'Mist'){
            weatherIcon.src = 'images/mist.png';
        }
        
        document.querySelector('.weather').style.display = "block";
        document.querySelector('.error').style.display = "none";
    }

}

searchBtn.addEventListener('click', () => {
    checkWeather(searchBox.value);
})


