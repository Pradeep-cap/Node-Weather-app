// Simple Node.js Weather App with Caching
// Usage: node weather.js <city>

const https = require('https');

const apiKey = '6843680554c8ad9019bba21ab2fad385'; // Replace with your OpenWeatherMap API key
const city = process.argv[2];

if (!city) {
    console.log('Usage: node weather.js <city>');
    process.exit(1);
}

// Create a cache object
const cache = {};

// Cache expiry time (in milliseconds)
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

// Function to fetch weather
function fetchWeather(cityName) {
    // Check if data is in cache and not expired
    const cached = cache[cityName];
    const now = Date.now();
    if (cached && (now - cached.timestamp) < CACHE_DURATION) {
        console.log(`(Using cached data)`);
        displayWeather(cached.data);
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityName)}&appid=${apiKey}&units=metric`;

    https.get(url, (res) => {
        let data = '';
        res.on('data', (chunk) => {
            data += chunk;
        });
        res.on('end', () => {
            try {
                const weather = JSON.parse(data);
                if (weather.cod !== 200) {
                    console.log('Error:', weather.message);
                } else {
                    // Save to cache
                    cache[cityName] = {
                        data: weather,
                        timestamp: Date.now()
                    };
                    displayWeather(weather);
                }
            } catch (e) {
                console.log('Error parsing weather data.');
            }
        });
    }).on('error', (err) => {
        console.log('Error:', err.message);
    });
}

// Function to display weather data
function displayWeather(weather) {
    console.log(`Weather in ${weather.name}, ${weather.sys.country}:`);
    console.log(`Temperature: ${weather.main.temp}°C`);
    console.log(`Description: ${weather.weather[0].description}`);
    console.log(`Humidity: ${weather.main.humidity}%`);
    console.log(`Wind Speed: ${weather.wind.speed} m/s`);
}

// Fetch weather
fetchWeather(city);
