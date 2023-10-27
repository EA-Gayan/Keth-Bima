import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";

const WeatherScreen = () => {
  return (
    <SafeAreaView>
      <LinearGradient
        colors={["#FFFEFE", "#FFFEFE", "#99ff99"]}
        style={{
          width: "100%",
          height: "100%",
          alignItems: "center",
        }}
      ></LinearGradient>
    </SafeAreaView>
  );
};

export default WeatherScreen;
