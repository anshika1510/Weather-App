const form = document.getElementById('location-form');
const input = document.getElementById('location-input');
const weatherDataDiv = document.getElementById('weather-data');
const apiKey = 'eef7f6c194442f8a3e935a57a5a8a183';

const toggleSwitch = document.getElementById('mode-toggle');
const body = document.body;

// Toggle dark mode
toggleSwitch.addEventListener('change', () => {
  body.classList.toggle('dark');
  body.classList.toggle('light');
});

form.addEventListener('submit', getWeather);

async function getWeather(event) {
  event.preventDefault();
  const city = input.value.trim();
  weatherDataDiv.innerHTML = '';
  input.value = '';

  if (city === '') {
    weatherDataDiv.innerHTML = '<p id="error">Error: Please enter a city name</p>';
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
        icon: data.weather[0].main // e.g., Clear, Clouds, Rain, etc.
      };

      // Add animated icon
      const iconDiv = document.createElement('div');
      iconDiv.id = 'icon';
      weatherDataDiv.appendChild(iconDiv);

      // Load Lottie animation based on weather condition
      loadWeatherAnimation(weatherData.icon);

      weatherDataDiv.innerHTML += `
        <h2>${weatherData.city}</h2>
        <p>${weatherData.description}</p>
        <p>${weatherData.temperature} °C</p>
      `;
    } else {
      weatherDataDiv.innerHTML = '<p id="error">Error: City not found</p>';
    }
  } catch (error) {
    weatherDataDiv.innerHTML = '<p id="error">Error: Unable to fetch weather data</p>';
  }
}

// Load Lottie animation based on weather condition
function loadWeatherAnimation(condition) {
  const iconDiv = document.getElementById('icon');
  const animations = {
    Clear: 'https://assets9.lottiefiles.com/packages/lf20_jmBauI.json',
    Clouds: 'https://assets9.lottiefiles.com/packages/lf20_jv0y3xww.json',
    Rain: 'https://assets10.lottiefiles.com/packages/lf20_mf2r6lgy.json',
    Snow: 'https://assets4.lottiefiles.com/packages/lf20_Wt8JiA.json',
    Thunderstorm: 'https://assets4.lottiefiles.com/packages/lf20_tljjahzj.json',
    Drizzle: 'https://assets9.lottiefiles.com/packages/lf20_LdSxyU.json',
    Mist: 'https://assets3.lottiefiles.com/packages/lf20_taz1lw.json'
  };

  const anim = animations[condition] || animations['Clear'];

  lottie.loadAnimation({
    container: iconDiv,
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: anim
  });
}






