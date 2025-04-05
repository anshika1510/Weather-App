const form = document.getElementById('location-form');
const input = document.getElementById('location-input');
const weatherDataDiv = document.getElementById('weather-data');
const apiKey = 'eef7f6c194442f8a3e935a57a5a8a183';

form.addEventListener('submit', getWeather);

async function getWeather(event) {
  event.preventDefault();
  const city = input.value.trim();
  weatherDataDiv.innerText = '';
  input.value = ''; // Clear the input field

  if (city === '') {
    weatherDataDiv.innerText = 'Error: Please enter a city name';
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (response.ok) {
      const weatherData = {
        city: data.name,
        temperature: data.main.temp,
        description: data.weather[0].description,
      };

      weatherDataDiv.innerHTML = `
        <h2>${weatherData.city}</h2>
        <p>${weatherData.description}</p>
        <p>${weatherData.temperature} °C</p>
      `;
    } else {
      weatherDataDiv.innerText = `Error: City not found`;
    }
  } catch (error) {
    weatherDataDiv.innerText = 'Error: Unable to fetch weather data';
  }
}





