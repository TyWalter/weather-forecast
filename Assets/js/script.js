const submit = document.querySelector('form');
const static = document.querySelector('article')
let inputClear = document.getElementById('city');

// Getting localstorage and sending it to coversion function
function paramSet(){
  const city = localStorage.getItem('CitySearch');
  if(city){
    convertCity(city);
  }
};

// makes a fetch call to get details of a city
function convertCity(city){
  const location = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=57818e654972af47025ad7f7958acbbe`
  fetch(location)
  .then(function (resp){
    return resp.json();
  })
  .then(function(data){
    getGeoLoc(data);
  })
  .catch(function(err){
    console.error(err);
    alert(`Couldn't find that city, try again!`);
  })
};

// takes a city and converts it into lat and long and clears typed input
function getGeoLoc(data){
  for (let i=0; i<data.length; i++){
    const geoLoc = data[i];
    const lat = geoLoc.lat;
    const lon = geoLoc.lon;
  grabApiCurrent(lat, lon);
  grabApiWeek(lat, lon);
  };
  inputClear.value = '';
};

// makes a fetch call for the current weather of a city
function grabApiCurrent(lat, lon){
  const current = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=57818e654972af47025ad7f7958acbbe`
  fetch(current)
  .then(function (resp){
    return resp.json();
  })
  .then(function(weather){
    getWeatherCurrent(weather);
  })
  .catch(function(err){
    console.error(err);
    console.log('Uh oh, something went wrong');
  })
};

// grabs data from current weather fetch
function getWeatherCurrent(weather){
  const cName = weather.name
  const cDate = weather.dt_txt;
  const cIcon = weather.weather[0].icon;
  const cTemp = weather.main.temp;
  const cWind = weather.wind.speed;
  const cHumidity = weather.main.humidity;
  printCurrent(cName, cDate, cIcon, cTemp, cWind, cHumidity);
};

// takes current data and inputs it on the page
function printCurrent(name, date, icon, temp, wind, humidity){
  const day = dayjs(date);
  const nameCurrent = document.querySelector('h3');
  const dateCurrent = day.format('MM/DD/YYYY');
  const iconCurrent = document.querySelector('img');
  const tempCurrent = document.querySelector('.temp');
  const windCurrent = document.querySelector('.wind');
  const humidityCurrent = document.querySelector('.humidity');

  iconCurrent.setAttribute('src', `https://openweathermap.org/img/wn/${icon}.png`);
  nameCurrent.textContent = `${name} ${dateCurrent}`;
  tempCurrent.textContent = `Temp: ${temp}\u00B0F`;
  windCurrent.textContent = `Wind: ${wind} MPH`;
  humidityCurrent.textContent = `Humidity: ${humidity} %`;

  nameCurrent.appendChild(iconCurrent);
};

// makes a fetch call for the 5 day forecasted weather of a city
function grabApiWeek(lat, lon){
  const week = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&cnt=40&units=imperial&appid=c1dd9688874f70a75ae85555d4ee0cd2`
  fetch(week)
  .then(function (resp){
    return resp.json();
  })
  .then(function(weather){
    getWeatherWeek(weather);
  })
  .catch(function(err){
    console.error(err);
    console.log('Uh oh, something went wrong');
  })
};

// grabs data from 5 day forecasted weather fetch and iterated through the data to grab a time from a different day
function getWeatherWeek(weather){
  for(let i=0; i<5; i++){
    const index = 7+(i*8)
    const wDate = weather.list[index].dt_txt;
    const wIcon = weather.list[index].weather[0].icon;
    const wTemp = weather.list[index].main.temp;
    const wWind = weather.list[index].wind.speed;
    const wHumidity = weather.list[index].main.humidity;
    printWeek(wDate, wIcon, wTemp, wWind, wHumidity, i);
  };
};

// takes 5 day forecasted data and inputs it on the page
function printWeek(date, icon, temp, wind, humidity, i){
  const day = dayjs(date);
  const forecastWeather = document.querySelector(`.data-5day-weather${i}`);
  const card = document.querySelector(`.card${i}`);
  const weekForecast = document.querySelector('.data-5day-forecast');
  const forecastDate = document.querySelector('h5');
  const iconForecast = document.querySelector(`.data-5day-icon${i}`);
  const temperature = document.querySelector(`.temp${i}`);
  const windSpeed = document.querySelector(`.wind${i}`);
  const humidityPercentage = document.querySelector(`.humidity${i}`);

  iconForecast.setAttribute('src', `https://openweathermap.org/img/wn/${icon}.png`);
  forecastDate.textContent = day.format('MM/DD/YYYY');
  temperature.textContent = `Temp: ${temp}\u00B0F`;
  windSpeed.textContent = `Wind: ${wind} MPH`;
  humidityPercentage.textContent = `Humidity: ${humidity} %`;
  
  forecastWeather.appendChild(temperature);
  forecastWeather.appendChild(windSpeed);
  forecastWeather.appendChild(humidityPercentage);
  card.appendChild(forecastDate);
  card.appendChild(iconForecast);
  card.appendChild(forecastWeather);
  weekForecast.appendChild(card);
};

// sets input field localstorage and runs the rest of the page
function saveToStorage(e){
  e.preventDefault();
  const input = document.querySelector('input').value;
  if(!input){
    console.error('You need to input a city');
    return;
  } else {
    localStorage.setItem('CitySearch', input);
    paramSet();
  }
};

// static cities that are clicked will run become the search
function openCity(e){
  e.preventDefault();
  if(e.target.classList.contains('atlanta')){
    localStorage.setItem('CitySearch', 'atlanta');
  } else if(e.target.classList.contains('denver')){
    localStorage.setItem('CitySearch', 'denver');
  } else if(e.target.classList.contains('seattle')){
    localStorage.setItem('CitySearch', 'seattle');
  } else if(e.target.classList.contains('san-francisco')){
    localStorage.setItem('CitySearch', 'san francisco');
  } else if(e.target.classList.contains('orlando')){
    localStorage.setItem('CitySearch', 'orlando');
  } else if(e.target.classList.contains('new-york')){
    localStorage.setItem('CitySearch', 'new york');
  } else if(e.target.classList.contains('chicago')){
    localStorage.setItem('CitySearch', 'chicago');
  } else if(e.target.classList.contains('austin')){
    localStorage.setItem('CitySearch', 'austin');
  }
  paramSet();
};

// loads the current localstorage to display info on refresh/restart
paramSet();

// event listeners for submit button and for static cities
static.addEventListener('click', openCity)
submit.addEventListener('submit', saveToStorage);
