// Function to create and append elements using DOM
function createElement(element, className, text, id) {
  const ele = document.createElement(element);
  if (className) ele.className = className;
  if (text) ele.textContent = text;
  if (id) ele.id = id;
  return ele;
}


function createFlag(element, className, src) {
    const ele = document.createElement(element);
    if (className) ele.className = className;
    if (src) ele.src = src;
    return ele;
}

// Function to display the country cards
function displayCountryCards(countries) {
  const Container = document.getElementById('card-container');

  countries.forEach(country => {
    const row = createElement('div', 'row');
    const title = createElement('H1', 'text-center', 'weather app', 'title');
    const col = createElement('div', 'col-sm-6 col-md-4 col-lg-4 col-xl-4');
    const card = createElement('div','card h-100','',country.name);
    const cardHeader = createElement('div', 'card-header', country.name);
    const cardImg = createFlag('img', 'card-img-top', `${country.flags.png}`);
    const cardBody = createElement('div', 'card-body');
    const cardText = createElement('div', 'card-text');
    const capital = createElement('p', '', `Capital: ${country.capital}`);
    const region = createElement('p', '', `Region: ${country.region}`);
    const countryCode = createElement('p', '', `Country Code: ${country.alpha2Code}`);
    const button = createElement('button', 'btn btn-primary', 'Click for Weather');

    button.addEventListener('click', () => {
      getWeatherData(country);
    });

    cardText.append(capital, region, countryCode, button)
cardBody.append(cardText)
    card.append(cardHeader,cardImg,cardBody );
    col.append(card);
    row.append(col);
    Container.append(title,row);

    

  });
}


  // Function to render weather data
function renderWeatherData(weatherData,id) {

 // Check if weather info already exists
  const existingWeatherInfo = document.getElementById(`weather-info`);
  if (existingWeatherInfo) {
    existingWeatherInfo.remove(); // Remove existing weather info
  }

  // Extract the necessary information from the weatherData object
  const temperatureKelvin = weatherData.main.temp;
  const temperatureCelsius = temperatureKelvin - 273.15; // Conversion from Kelvin to Celsius
  const humidity = weatherData.main.humidity;
  const description = weatherData.weather[0].description;
  const lon = weatherData.coord.lon
  const lat = weatherData.coord.lat


  // Create and update the HTML elements to display the weather data
  const weatherInfoContainer = document.createElement('div');
  weatherInfoContainer.id = "weather-info";
  weatherInfoContainer.innerHTML = `
    <p>Temperature: ${temperatureCelsius.toFixed(2)}°C</p>
    <p>Humidity: ${humidity}%</p>
    <p>Description: ${description}</p>
    <p>longitude: ${lon}</p>    
    <p>latitude: ${lat}</p>
  `;
console.log(weatherData)
   const card = document.getElementById(id);
  card.appendChild(weatherInfoContainer);  
}

// Function to get weather data for a country
function getWeatherData(country) {
    const apiKey = "780b7a8eb5ef7a726a9306c61bba5444";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${country.capital},${country.alpha2Code}&appid=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(weatherData => {
           // Render the weather data on the page
      renderWeatherData(weatherData,country.name);
    })
        .catch(error => {
            console.log('Error:', error);
        });
}

// Fetch rest countries data
fetch('https://restcountries.com/v2/all')
    .then(response => response.json())
    .then(countries => {
        displayCountryCards(countries);
    })
    .catch(error => {
        console.log('Error:', error);
    });

     
  