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
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as Location from "expo-location";
import { Ionicons } from "@expo/vector-icons";

const openWeatherKey = "ee4d9149db4c74f12281fd1e2df8e224";
const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?`;

const WeatherScreen = ({ navigation }) => {
  const [forecast, setForecast] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [locationInput, setLocationInput] = useState("");

  const loadForecast = async (city) => {
    setRefreshing(true);

    const response = await fetch(
      `${weatherUrl}q=${city}&appid=${openWeatherKey}`
    );
    const data = await response.json();
    console.log(data);

    if (!response.ok) {
      Alert.alert("Error", "Something went wrong");
    } else {
      setForecast(data);
    }

    setRefreshing(false);
  };

  useEffect(() => {
    loadForecast("Colombo");
  }, []);

  const handleManualLocation = () => {
    loadForecast(locationInput);
  };

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
            <Text style={styles.currenTemp}>{forecast?.current?.temp}°C </Text>

            {/* <Text>{Math.round(forecast.current.temp)}</Text> */}
          </View>
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
  },
  largeIcon: {
    width: 300,
    height: 250,
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
  manualLocationButton: {
    backgroundColor: "#C84831",
    padding: 10,
    margin: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  manualLocationButtonText: {
    color: "white",
  },
  currenTemp: {
    fontSize: 35,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default WeatherScreen;
