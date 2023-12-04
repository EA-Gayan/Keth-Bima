import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { Ionicons } from "@expo/vector-icons";
import { DB } from "../../firebaseInit";
import { StackedBarChart } from "react-native-chart-kit";

const BarChartScreen = ({ navigation }) => {
  const [harvestData, setHarvestData] = useState({ labels: [] });
  const [startYear, setStartYear] = useState("");
  const [endYear, setEndYear] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const snapshot = await getDocs(collection(DB, "harvesting"));
        if (snapshot.empty) {
          console.log("No data available");
          return;
        }
        const data = snapshot.docs.map((doc) => doc.data());

        // Filter data based on selected range
        const filteredData = data.filter(
          (item) =>
            (startYear === "" || item.year >= startYear) &&
            (endYear === "" || item.year <= endYear)
        );

        const chartData = {
          labels: filteredData.map((item) => item.year),
          legend: ["Yala", "Maha"],
          data: filteredData.map((item) => [
            Number(item.yala),
            Number(item.maha),
          ]),
          barColors: ["#9F71D8", "#36BC15"],
        };
        setHarvestData(chartData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [startYear, endYear]);

  return (
    <View style={styles.container}>
      <ImageBackground
        style={{ resizeMode: "cover", width: "100%", height: "110%" }}
        source={require("../../assets/images/bg3.jpg")}
      >
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="chevron-back" size={32} color="black" />
        </TouchableOpacity>

        <View style={{ alignItems: "center", marginTop: 150 }}>
          <Text style={styles.title}>Previous Records</Text>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Start Year"
            keyboardType="numeric"
            value={startYear}
            onChangeText={(text) => setStartYear(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="End Year"
            keyboardType="numeric"
            value={endYear}
            onChangeText={(text) => setEndYear(text)}
          />
        </View>

        <View style={styles.chart}>
          {harvestData.labels.length > 0 ? (
            <StackedBarChart
              data={harvestData}
              width={300}
              height={300}
              yAxisLabel="Quantity"
              chartConfig={{
                backgroundGradientFrom: "#f0f0f0",
                backgroundGradientTo: "#f0f0f0",
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              }}
            />
          ) : (
            <Text>No data available</Text>
          )}
        </View>
        <TouchableOpacity
          style={styles.saveButton}
          onPress={() => navigation.navigate("Harvest")}
        >
          <Text style={styles.saveButtonText}>Add Records</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backButton: {
    backgroundColor: "white",
    width: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    position: "absolute",
    top: 50,
    left: 2,
    zIndex: 100,
  },
  title: {
    fontSize: 25,
    color: "black",
    fontWeight: "bold",
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 50,
  },
  input: {
    borderWidth: 2,
    borderColor: "#616161",
    padding: 8,
    marginHorizontal: 10,
    width: 100,
    borderRadius: 15,
  },
  chart: {
    alignItems: "center",
    marginTop: 50,
  },
  saveButton: {
    width: "60%",
    height: 50,
    borderWidth: 1.5,
    borderRadius: 15,
    position: "absolute",
    alignSelf: "center",
    marginTop: 690,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#009272",
    borderColor: "white",
  },
  saveButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default BarChartScreen;
