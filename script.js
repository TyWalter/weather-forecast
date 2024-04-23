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
    const wDate = weather.list[i].main.temp;
    const wIcon = weather.list[i].dt_txt;
    const wTemp = weather.list[i].main.temp;
    const wWind = weather.list[i].wind.speed;
    const wHumidity = weather.list[i].main.humidity;
    printWeek(wDate, wIcon, wTemp, wWind, wHumidity);
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

function printWeek(date, icon, temp, wind, humidity){
  for(let i=0; i<5; i++){
    const forecastDate = document.createElement('h5')
    const icon = document.createElement('div')
    const forecastWeather = document.createElement('div')
    const temperature = document.createElement('p');
    const windSpeed = document.createElement('p')
    const humidityPercentage = document.createElement('p')
    forecastDate.setAttribute('class', 'data-5day-date text-center');
    icon.setAttribute('class', 'data-5day-weather');
    forecastWeather.setAttribute('class', 'data-5day-icon justify-content-center text-center');
    temperature.setAttribute('class', 'temp');
    windSpeed.setAttribute('class', 'wind');
    humidityPercentage.setAttribute('class', 'humidity');
    




    const card = document.createElement('div');
    card.setAttribute('class', `col p-2 mx-3 my-3 ${card[i]}`)
    card.appendChild(temperature);
  }


  const card = document.createElement('div');
  card.setAttribute('style', 'line-height: .5rem; padding: 5px; text-shadow: black 0 0 .3rem;')
  card.appendChild(nameEl) 
  card.appendChild(addressEl)
  card.appendChild(postalEl)
  card.appendChild(phoneEl)

  const breweryLink = document.querySelector(`.card${i}`);
  if (breweryLink) {
    breweryLink.prepend(card);
  }

  const nameEl = document.createElement('h3');
  nameEl.textContent = drinkCard.name;
  nameEl.setAttribute('style', 'font-size: 16px; font-weight: bold; text-shadow: black 0 0 .3rem; color: var(--alloy-orange)')
  
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
