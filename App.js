import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import * as Location from "expo-location";
import axios from "axios";
import { Fontisto } from "@expo/vector-icons";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const API_KEY = "fa74a4961e7cf545075f8e66f7fb1ce9";

const icons = {
  Clouds: "cloudy",
  Clear: "day-sunny",
  Atmosphere: "cloudy-gusts",
  Snow: "snow",
  Rain: "rains",
  Drizzle: "rain",
  Thunderstorm: "lightning",
};

export default function App() {
  const [city, setCity] = useState("Loading...");
  const [days, setDays] = useState([]);
  const [ok, setOk] = useState(true);

  const getPermission = async () => {
    const { granted } = await Location.requestForegroundPermissionsAsync();
    if (!granted) setOk(false);
  };

  const getLocation = async () => {
    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync({ accuracy: 5 });
    const location = await Location.reverseGeocodeAsync(
      {
        latitude,
        longitude,
      },
      { useGoogleMaps: false }
    );

    setCity(location[0].region);
    getWeather(latitude, longitude);
  };

  const getWeather = async (lat, lon) => {
    try {
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
      );

      setDays(data.list);
      console.log(data.list);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getPermission();
    if (ok) {
      getLocation();
    }
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>{city}</Text>
      </View>
      <ScrollView
        horizontal //가로 정렬
        pagingEnabled //페이지네이션으로 하나씩 스크롤
        showsHorizontalScrollIndicator={false} //스크롤바 숨김
        contentContainerStyle={styles.weathers} //scrollview는 style로는 작동하지 않음
      >
        {days.length > 0 ? (
          days.map((day, index) => (
            <View key={index} style={styles.day}>
              <View style={styles.tempContainer}>
                <Text style={styles.temp}>
                  {parseFloat(day.main.temp).toFixed(1)}
                </Text>
                <Fontisto
                  name={icons[day.weather[0].main]}
                  size={60}
                  color='white'
                  marginLeft={-60}
                />
              </View>
              <View style={styles.descriptionContainer}>
                <Text style={styles.weather}>{day.weather[0].main}</Text>
                <Text style={styles.description}>
                  {day.weather[0].description}
                </Text>
              </View>
            </View>
          ))
        ) : (
          <View style={{ ...styles.day, alignItems: "center" }}>
            <ActivityIndicator color='white' size='large' />
          </View>
        )}
      </ScrollView>

      <StatusBar style='light' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#487242",
  },
  city: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cityName: {
    fontSize: 68,
    fontWeight: "600",
    color: "white",
  },
  weathers: {},
  day: {
    width: SCREEN_WIDTH,
    alignItems: "flex-start",
    paddingHorizontal: 20,
  },
  tempContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-startss",
    width: SCREEN_WIDTH,
  },
  temp: {
    marginTop: 50,
    color: "white",
    fontSize: 178,
  },
  descriptionContainer: {
    marginLeft: 10,
  },
  description: {
    color: "white",
    fontSize: 30,
    marginTop: -5,
  },
  weather: {
    marginTop: -30,
    fontSize: 40,
    color: "white",
  },
});
