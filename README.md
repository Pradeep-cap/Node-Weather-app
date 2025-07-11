# Node-Weather-app(with Caching)

A simple Node.js command-line weather application that fetches real-time weather data for any city using the OpenWeatherMap API.

🚀 Features
Get real-time weather data for any city

Displays temperature, description, humidity, and wind speed

Simple terminal-based usage

In-memory caching to reduce API calls (cache expires in 10 minutes)

🛠️ Requirements
Node.js installed

Internet connection

OpenWeatherMap API key (free)

⚙️ Setup
1️⃣ Clone this repository
bash
git clone https://github.com/yourusername/weather-app.git
cd weather-app


2️⃣ Install dependencies
This app only uses built-in Node.js modules (no extra installs needed).


3️⃣ Add your API key
Replace the apiKey value in weather.js with your own OpenWeatherMap API key:

const apiKey = 'YOUR_API_KEY_HERE';
You can get a free API key here: OpenWeatherMap Signup.

💡 Usage
bash
node weather.js <city_name>

Example
bash
node weather.js London


🧊 Caching
The app caches weather data for each city for 10 minutes (600,000 ms).

If you request the same city again within this period, it will show cached data instead of making a new API call.

💬 Example Output
yaml:
Weather in London, GB:
Temperature: 22°C
Description: broken clouds
Humidity: 55%
Wind Speed: 4.1 m/s

🤝 Contributing
Pull requests and improvements are welcome! Feel free to open an issue or submit a PR.

📝 License
This project is open source and free to use under the MIT license.

⭐️ Credits
OpenWeatherMap API
