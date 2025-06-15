Weather App - React Native

A beautiful cross-platform weather application built with React Native that displays current weather conditions for any city worldwide.

Key Features
🌍 City Search: Get weather by city name

🌤️ Dynamic Backgrounds: Changes based on current weather conditions

📊 Detailed Weather Info:

Temperature (°C)

Weather description

Wind speed

📱 Responsive Design: Works on both iOS and Android

🔄 Fast Refresh: Instant updates when editing code

Installation
Clone the repository:

sh
git clone https://github.com/your-username/weather-app.git
cd weather-app
Install dependencies:

sh
npm install

# or

yarn install
For iOS (optional):

sh
cd ios && pod install && cd ..
Running the App
Android
sh
npm run android

# or

yarn android
iOS
sh
npm run ios

# or

yarn ios
Configuration
Get your free API key from OpenWeatherMap

Replace the empty API_KEY constant in App.tsx with your actual key:

typescript
const API_KEY = 'your_api_key_here';
Project Structure
text
weather-app/
├── assets/ # All static assets
│ ├── sunny.jpg # Background for clear weather
│ ├── cloudy.jpg # Background for cloudy weather
│ ├── rainy.jpg # Background for rainy weather
│ └── ... # Other weather backgrounds
├── android/ # Android native code
├── ios/ # iOS native code
└── src/
└── App.tsx # Main application component
Dependencies
React Native 0.72+

TypeScript

OpenWeatherMap API

Customization
You can easily customize:

Weather backgrounds by replacing images in /assets

Color scheme by modifying the StyleSheet in App.tsx

Additional weather parameters by extending the API response handling

Troubleshooting
If you encounter issues:

Make sure you have valid API key

Check your internet connection

Verify city name spelling

Ensure you've installed all dependencies

Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

License
MIT
