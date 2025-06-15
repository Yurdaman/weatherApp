import React from 'react';
import {
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
  ImageBackground,
  TextInput,
  Text,
  ImageSourcePropType,
  TouchableOpacity,
} from 'react-native';

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const [searchText, setSearchText] = React.useState('');
  const [weatherData, setWeatherData] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const API_KEY = '';

  const getWeatherBackground = (
    weatherDescription: string,
  ): ImageSourcePropType => {
    const description = weatherDescription.toLowerCase();

    if (description.includes('clear')) {
      return require('./assets/sunny.jpg');
    } else if (description.includes('cloud')) {
      return require('./assets/cloudy.jpg');
    } else if (description.includes('rain')) {
      return require('./assets/rainy.jpg');
    } else if (description.includes('snow')) {
      return require('./assets/snowy.jpg');
    } else if (description.includes('storm')) {
      return require('./assets/stormy.jpg');
    } else if (description.includes('fog') || description.includes('mist')) {
      return require('./assets/foggy.jpg');
    } else {
      return require('./assets/default.jpg');
    }
  };

  const fetchWeather = async () => {
    if (!searchText) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${searchText}&appid=${API_KEY}&units=metric`,
      );
      const data = await response.json();

      if (data.cod === 200) {
        setWeatherData(data);
      } else {
        setError(data.message || 'City not found');
      }
    } catch (err) {
      setError('Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  const backgroundImage = weatherData?.weather?.[0]?.description
    ? getWeatherBackground(weatherData.weather[0].description)
    : require('./assets/default.jpg');

  return (
    <ImageBackground
      source={backgroundImage}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Select city"
            placeholderTextColor="#999"
            value={searchText}
            onChangeText={setSearchText}
          />
          <TouchableOpacity style={styles.searchButton} onPress={fetchWeather}>
            <Text style={styles.searchButtonText}>🔍</Text>
          </TouchableOpacity>
        </View>

        {loading && <Text style={styles.text}>Loading...</Text>}
        {error && <Text style={styles.errorText}>{error}</Text>}

        {weatherData && (
          <View style={styles.weatherInfo}>
            <Text style={styles.cityName}>{weatherData.name}</Text>
            <Text style={styles.weatherDescription}>
              {weatherData.weather[0].description}
            </Text>
            <Text style={styles.text}>
              Temperature: {Math.round(weatherData.main.temp)}°C
            </Text>
            <Text style={styles.text}>
              Wind Speed: {weatherData.wind.speed} m/s
            </Text>
          </View>
        )}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  searchInput: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
    marginRight: 10,
  },
  searchButton: {
    backgroundColor: '#1E90FF',
    padding: 12,
    borderRadius: 10,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchButtonText: {
    color: 'white',
    fontSize: 16,
  },
  text: {
    color: 'black',
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
  },
  cityName: {
    color: 'black',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },
  weatherDescription: {
    color: 'black',
    fontSize: 18,
    marginTop: 5,
    textAlign: 'center',
    textTransform: 'capitalize',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    marginTop: 20,
    textAlign: 'center',
  },
  weatherInfo: {
    marginTop: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 10,
    padding: 15,
  },
});

export default App;
