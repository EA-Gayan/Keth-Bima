import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
  Alert,
  Dimensions,
  FlatList,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { translation } from "../lang_model/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";

const openWeatherKey = "ee4d9149db4c74f12281fd1e2df8e224";
const weatherUrl = "https://api.openweathermap.org/data/2.5/weather?";
const forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?";

const WeatherScreen = ({ navigation }) => {
  const [forecast, setForecast] = useState(null);
  const [fiveDayForecast, setFiveDayForecast] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [locationInput, setLocationInput] = useState("");

  const [selectedLang, setSelectedLang] = useState(0);
  useEffect(() => {
    getLang();
  }, []);
  const getLang = async () => {
    setSelectedLang(parseInt(await AsyncStorage.getItem("LANG")));
  };

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
    loadForecast("colombo");
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
  const onLocationInputChange = (text) => {
    setLocationInput(text);
  };

  const handleLocationSearch = () => {
    if (locationInput.trim() !== "") {
      loadForecast(locationInput);
    }
  };

  // Use the filtered data for the FlatList
  const filteredNext3DaysData = filterNext3DaysData();

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/images/bg3.jpg")}
        style={{ width: "100%", height: "100%" }}
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
          style={{ marginTop: 40 }}
        >
          <Text style={styles.title}>
            {selectedLang == 0
              ? translation[18].English
              : selectedLang == 1
              ? translation[18].Sinhala
              : null}
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TextInput
              style={styles.locationInput}
              placeholder="Enter Location"
              onChangeText={onLocationInputChange}
              value={locationInput}
            />
            <TouchableOpacity
              onPress={handleLocationSearch}
              style={styles.searchButton}
            >
              <Ionicons name="search" size={20} color="black" />
            </TouchableOpacity>
          </View>
          <View style={styles.current}>
            <Image style={styles.largeIcon} source={{ uri: weatherIconUrl }} />
            <Text style={styles.currentTemp}>
              {Math.round(forecast.main.temp - 273.15)}°C
            </Text>
          </View>
          <Text style={styles.description}>{current.description}</Text>
          <View style={styles.rect}>
            <View style={styles.extraInfo}>
              <View style={styles.info}>
                <Ionicons
                  style={{ color: "#079470" }}
                  name="thermometer-outline"
                  size={30}
                />
                <Text style={styles.text}>
                  {Math.round(forecast.main.feels_like - 273.15)} °C
                </Text>
                <Text style={styles.text}>
                  {selectedLang == 0
                    ? translation[19].English
                    : selectedLang == 1
                    ? translation[19].Sinhala
                    : null}
                </Text>
              </View>
              <View style={styles.info}>
                <Ionicons
                  style={{ color: "#079470" }}
                  name="water-outline"
                  size={30}
                />
                <Text style={styles.text}>
                  {Math.round(forecast.main.humidity)} °C
                </Text>
                <Text style={styles.text}>
                  {selectedLang == 0
                    ? translation[20].English
                    : selectedLang == 1
                    ? translation[20].Sinhala
                    : null}
                </Text>
              </View>
            </View>
          </View>

          <Text style={styles.subtitle}>
            {selectedLang == 0
              ? translation[21].English
              : selectedLang == 1
              ? translation[21].Sinhala
              : null}
          </Text>

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
                <View style={[styles.card, { marginLeft: 25 }]}>
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
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    textAlign: "center",
    fontSize: 25,
    fontWeight: "bold",
    color: "black",
    marginTop: 70,
  },
  current: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
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
    borderColor: "#c1c1c1",
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
    fontSize: 15,
    textAlign: "center",
    marginTop: -20,
    marginBottom: 10,
    color: "#079470",
    fontWeight: "bold",
  },
  info: {
    width: Dimensions.get("screen").width / 2.5,
    backgroundColor: "transparent",
    padding: 10,
    borderRadius: 22,
    justifyContent: "center",
    borderWidth: 1,
    marginTop: 15,
  },
  extraInfo: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  text: {
    fontSize: 15,
    fontWeight: "bold",
  },
  subtitle: {
    marginTop: 150,
    marginLeft: 20,
    fontWeight: "bold",
    fontSize: 15,
    color: "#079470",
  },
  card: {
    width: 100,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    borderWidth: 0.5,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    marginTop: 25,
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
  rect: {
    marginTop: 380,
    width: 360,
    height: 125,
    position: "absolute",
    backgroundColor: "#ffffff",
    borderRadius: 35,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    elevation: 7,
    shadowOpacity: 1,
    shadowRadius: 4,
    left: 20,
  },
});

export default WeatherScreen;
