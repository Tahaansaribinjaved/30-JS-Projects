const apiKey = 'ed2dd5cdabee456fddc007705cbd9570'; // Replace with your OpenWeatherMap API key

document.getElementById('getWeatherBtn').addEventListener('click', function () {
  const city = document.getElementById('cityInput').value;
  if (city === '') {
    alert('Please enter a city name.');
    return;
  }
  
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      if (data.cod === '404') {
        document.getElementById('weatherDetails').innerHTML = '<p class="text-red-500">City not found. Please try again.</p>';
      } else {
        const weatherIcon = `https://openweathermap.org/img/wn/${data?.weather[0].icon}@2x.png`;
        document.getElementById('weatherDetails').innerHTML = `
          <h2 class="text-2xl font-bold">${data.name}, ${data.sys.country}</h2>
          <img src="${weatherIcon}" alt="${data.weather[0].description}" class="mx-auto">
          <p class="text-lg">Temperature: ${data.main.temp}°C</p>
          <p class="text-lg">Weather: ${data.weather[0].description}</p>
          <p class="text-lg">Humidity: ${data.main.humidity}%</p>
        `;
      }
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      document.getElementById('weatherDetails').innerHTML = '<p class="text-red-500">An error occurred. Please try again later.</p>';
    });
});
