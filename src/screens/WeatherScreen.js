import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
  Alert,
  Dimensions,
  FlatList,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as Location from "expo-location";
import { Ionicons } from "@expo/vector-icons";

const openWeatherKey = "ee4d9149db4c74f12281fd1e2df8e224";
const weatherUrl = "https://api.openweathermap.org/data/2.5/weather?";
const forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?";

const WeatherScreen = ({ navigation }) => {
  const [forecast, setForecast] = useState(null);
  const [fiveDayForecast, setFiveDayForecast] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [locationInput, setLocationInput] = useState("");

  const loadForecast = async (city) => {
    setRefreshing(true);

    const currentResponse = await fetch(
      `${weatherUrl}q=${city}&appid=${openWeatherKey}`
    );
    const currentData = await currentResponse.json();

    if (!currentResponse.ok) {
      Alert.alert("Error", "Something went wrong");
      setRefreshing(false);
      return;
    }

    const forecastResponse = await fetch(
      `${forecastUrl}q=${city}&appid=${openWeatherKey}`
    );
    const forecastData = await forecastResponse.json();

    if (!forecastResponse.ok) {
      Alert.alert("Error", "Something went wrong");
      setRefreshing(false);
      return;
    }

    setForecast(currentData);
    setFiveDayForecast(forecastData.list);
    setRefreshing(false);
  };

  useEffect(() => {
    loadForecast("galle");
  }, []);

  if (!forecast) {
    return (
      <SafeAreaView style={styles.loading}>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  const current = forecast.weather[0];
  const iconCode = current.icon;
  const weatherIconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

  const filterNext3DaysData = () => {
    const currentDate = new Date();
    const next3Days = [];
    for (let i = 1; i < 4; i++) {
      const date = new Date(currentDate);
      date.setDate(currentDate.getDate() + i);
      next3Days.push(date.toDateString());
    }

    const filteredData = [];

    for (const day of next3Days) {
      const matchingItems = fiveDayForecast.filter((item) => {
        const itemDate = new Date(item.dt * 1000).toDateString();
        return itemDate === day;
      });

      if (matchingItems.length > 0) {
        filteredData.push(matchingItems[0]);
      }
    }

    return filteredData;
  };

  // Use the filtered data for the FlatList
  const filteredNext3DaysData = filterNext3DaysData();

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={["#FFFEFE", "#FFFEFE", "#99ff99"]}
        style={{
          width: "100%",
          height: "100%",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.goBack()}
          style={{
            backgroundColor: "white",
            width: 40,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 100,
            position: "absolute",
            top: 50,
            left: 2,
            zIndex: 100,
          }}
        >
          <Ionicons name="chevron-back" size={32} color="black" />
        </TouchableOpacity>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => loadForecast(locationInput)}
            />
          }
          style={{ marginTop: 50 }}
        >
          <Text style={styles.title}>Current Weather</Text>
          <Text style={{ textAlign: "center" }}>Your Location</Text>

          <View style={styles.current}>
            <Image style={styles.largeIcon} source={{ uri: weatherIconUrl }} />
            <Text style={styles.currentTemp}>
              {Math.round(forecast.main.temp - 273.15)}°C
            </Text>
          </View>
          <Text style={styles.description}>{current.description}</Text>
          <View style={styles.extraInfo}>
            <View style={styles.info}>
              <Ionicons name="thermometer-outline" size={30} />
              <Text style={styles.text}>
                {Math.round(forecast.main.feels_like - 273.15)} °C
              </Text>
              <Text style={styles.text}>Feels like</Text>
            </View>
            <View style={styles.info}>
              <Ionicons name="water-outline" size={30} />
              <Text style={styles.text}>
                {Math.round(forecast.main.humidity)} °C
              </Text>
              <Text style={styles.text}>Humidity</Text>
            </View>
          </View>
          <Text style={styles.subtitle}>Next 3-Day Forecast</Text>
          <FlatList
            horizontal
            data={filteredNext3DaysData}
            keyExtractor={(item) => item.dt.toString()}
            renderItem={({ item }) => {
              const date = new Date(item.dt * 1000);
              const day = date.toLocaleDateString("en-US", {
                weekday: "short",
              });
              const weatherIconUrl = `https://openweathermap.org/img/wn/${item.weather[0].icon}.png`;

              return (
                <View style={[styles.card, { marginLeft: 10 }]}>
                  <Text style={styles.hourlyForecastHour}>{day}</Text>
                  <Image
                    style={styles.forecastIcon}
                    source={{ uri: weatherIconUrl }}
                  />
                  <Text style={styles.forecastTemp}>
                    {Math.round(item.main.temp - 273.15)}°C
                  </Text>
                </View>
              );
            }}
          />
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#ECDBBA" },
  title: {
    textAlign: "center",
    fontSize: 25,
    fontWeight: "bold",
    color: "#C84831",
    marginTop: 70,
  },
  current: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  largeIcon: {
    width: 250,
    height: 200,
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  locationInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    margin: 10,
  },
  currentTemp: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginRight: 20,
  },
  description: {
    fontSize: 20,
    width: "100%",
    textAlign: "center",
  },
  info: {
    width: Dimensions.get("screen").width / 2.5,
    backgroundColor: "transparent",
    padding: 10,
    borderRadius: 22,
    justifyContent: "center",
    borderWidth: 3,
    marginTop: 15,
  },
  extraInfo: {
    flexDirection: "row",
    justifyContent: "space-around",
    gap: 25,
  },
  text: {
    fontSize: 10,
    fontWeight: "bold",
  },
  subtitle: {
    marginTop: 50,
    fontWeight: "bold",
    fontSize: 15,
    color: "#C84831",
  },
  card: {
    width: 100,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    marginTop: 20,
  },
  hourlyForecastHour: {
    fontSize: 16,
    fontWeight: "bold",
  },
  forecastIcon: {
    width: 50,
    height: 50,
  },
  forecastTemp: {
    fontSize: 18,
  },
});

export default WeatherScreen;
