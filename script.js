const button = document.querySelector('form');
let inputClear = document.getElementById('city');

// function clear(){
//   document.getElementById('zero').innerHTML = "";
//   document.getElementById('one').innerHTML = "";
//   document.getElementById('two').innerHTML = "";
//   document.getElementById('three').innerHTML = "";
//   document.getElementById('four').innerHTML = "";
// }

function paramSet(){
  const city = localStorage.getItem('CitySearch');
  convertCity(city);
};

function convertCity(city){
  const location = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=57818e654972af47025ad7f7958acbbe`
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

function grabApiWeek(lat, lon){
  const week = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&cnt=33&units=imperial&appid=c1dd9688874f70a75ae85555d4ee0cd2`
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

function getWeatherCurrent(weather){
  const cDate = weather.dt;
  const cIcon = weather.weather[0].icon;
  const cTemp = weather.main.temp;
  const cWind = weather.wind.speed;
  const cHumidity = weather.main.humidity;
  printCurrent(cDate, cIcon, cTemp, cWind, cHumidity);
};

function getWeatherWeek(weather){
  for(let i=0; i<5; i++){
    const wDate = weather.list[i*8].dt_txt;
    const wIcon = weather.list[i*8].weather[0].icon;
    const wTemp = weather.list[i*8].main.temp;
    const wWind = weather.list[i*8].wind.speed;
    const wHumidity = weather.list[i*8].main.humidity;
    printWeek(wDate, wIcon, wTemp, wWind, wHumidity, i);
  };
};

function printCurrent(date, icon, temp, wind, humidity){
  const day = dayjs(date);
  const dateCurrent = document.querySelector('h3');
  const iconCurrent = document.querySelector('span');
  const tempCurrent = document.querySelector('.temp');
  const windCurrent = document.querySelector('.wind');
  const humidityCurrent = document.querySelector('humidity');

  tempCurrent.setAttribute

}

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

  iconForecast.setAttribute('src', `http://openweathermap.org/img/wn/${icon}.png`);
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

// paramSet();

button.addEventListener('submit', saveToStorage);
