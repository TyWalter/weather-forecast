const button = document.querySelector('form');
let inputClear = document.getElementById('city');

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
  const week = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=c1dd9688874f70a75ae85555d4ee0cd2`
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
  const cIcon = weather.weather.icon;
  const cTemp = weather.main.temp;
  const cWind = weather.wind.speed;
  const cHumidity = weather.main.humidity;
  // printCurrent(cDate, cIcon, cTemp, cWind, cHumidity);
};

function getWeatherWeek(weather){
  for(let i=0; i<5; i++){
    const wDate = weather.list[i].dt_txt;
    const wIcon = weather.list[i].weather.icon;
    const wTemp = weather.list[i].main.temp;
    const wWind = weather.list[i].wind.speed;
    const wHumidity = weather.list[i].main.humidity;
    printWeek(wDate, wIcon, wTemp, wWind, wHumidity, i);
  };
};

// function printCurrent(date, icon, temp, wind, humidity){
//   const cityName = document.createElement('h3');
//   cityName.textContent = print.name;
//   const cityTime = document.createElement('span');
//   cityTime.textContent = print.dt;
//   const cityIcon = document.createElement('span');
//   cityIcon.textContent = print.weather.icon;
//   const cityTemp = document.createElement('p');
//   cityTemp.textContent = print.main.temp;
//   const cityWind = document.createElement('p');
//   cityWind.textContent = print.wind.speed;
//   const cityHumidity = document.createElement('p');
//   cityHumidity.textContent = print.main.humidity;

//   const card = document.createElement('div');
//   card.setAttribute('style', 'line-height: .5rem; padding: 5px; text-shadow: black 0 0 .3rem;')
//   card.appendChild(nameEl) 
//   card.appendChild(addressEl)
//   card.appendChild(postalEl)
//   card.appendChild(phoneEl)

//   const currentWeather = document.querySelector(`.card${i}`);
//   if (currentWeather) {
//     currentWeather.prepend(card);
//   }
// }

function printWeek(date, icon, temp, wind, humidity, i){
  const weekForecast = document.querySelector('.data-5day-forecast')
  const forecastDate = document.querySelector('h5')
  const iconForecast = document.querySelector('.data-5day-icon')
  const temperature = document.querySelector('.temp');
  const windSpeed = document.querySelector('.wind')
  const humidityPercentage = document.querySelector('.humidity')
  
  forecastDate.textContent = date;
  iconForecast.textContent = icon;
  temperature.textContent = temp;
  windSpeed.textContent = wind;
  humidityPercentage.textContent = humidity;
  
  const forecastWeather = document.querySelector(`.data-5day-weather${i}`)
  const card = document.querySelector(`.card${i}`);

  forecastWeather.appendChild(temperature);
  forecastWeather.appendChild(windSpeed);
  forecastWeather.appendChild(humidityPercentage);
  card.appendChild(forecastDate);
  card.appendChild(iconForecast);
  card.appendChild(forecastWeather);
  weekForecast.appendChild(card);
  console.log(card)
};

  // const cityName = document.createElement('h3');
  // cityName.textContent = print.name;
  // const cityTime = document.createElement('span');
  // cityTime.textContent = print.dt;
  // const cityIcon = document.createElement('span');
  // cityIcon.textContent = print.weather.icon;
  // const cityTemp = document.createElement('p');
  // cityTemp.textContent = print.main.temp;
  // const cityWind = document.createElement('p');
  // cityWind.textContent = print.wind.speed;
  // const cityHumidity = document.createElement('p');
  // cityHumidity.textContent = print.main.humidity;

  // const card = document.createElement('div');
  // card.setAttribute('style', 'line-height: .5rem; padding: 5px; text-shadow: black 0 0 .3rem;')
  // card.appendChild(nameEl) 
  // card.appendChild(addressEl)
  // card.appendChild(postalEl)
  // card.appendChild(phoneEl)

  // const currentWeather = document.querySelector(`.card${i}`);
  // if (currentWeather) {
  //   currentWeather.prepend(card);
  // }

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
