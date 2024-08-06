const apiKey = '4e5a4697f8684c369db13254240604';
const url = 'https://api.weatherapi.com/v1';
const searchLocation = document.querySelector('#locationInput');
const weatherForm = document.querySelector('#weatherForm');
const weatherInfo = document.querySelector('#weatherInfo');


async function getWeather() {
  try {
    const location = searchLocation.value;
    const response = await fetch(`${url}/current.json?key=${apiKey}&q=${location}&aqi=no`, {mode: 'cors'});
    const responseData = await response.json();
    return responseData;
  } catch(error) {
    console.error('there is an error', error.message);
    return null;
  }
}

function displayWeather(data) {
  if (!data) {
    weatherInfo.textContent = 'failed to get weather data';
    return;
  }
  const { location, current } = data;
  const weatherHtml = `
  <h2>${location.name}, ${location.country}</h2>
  <p>Temperature: ${current.temp_f}°F</p>
  <p>Condition: ${current.condition.text}</p>
  <img src="${current.condition.icon}">
  `;
  weatherInfo.innerHTML = weatherHtml;
}

weatherForm.addEventListener('submit', async(e) => {
  e.preventDefault();
  const location = locationInput.value;
  const weatherData = await getWeather(location);
  displayWeather(weatherData);
});
