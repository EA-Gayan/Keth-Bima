import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import React, { useEffect, useState } from "react";
import { DB } from "../../firebaseInit";
import { collection, getDocs } from "firebase/firestore";
import { StackedBarChart } from "react-native-chart-kit";
import { Ionicons } from "@expo/vector-icons";

const BarChartScreen = ({ navigation }) => {
  const [harvData, setHarvData] = useState([]);
  const [startYear, setStartYear] = useState(2022);
  const [endYear, setEndYear] = useState(2023);

  function ChartComponent() {
    const [data, setData] = useState([]);
  
    useEffect(() => {
      const fetchData = async () => {
        const dataRef = firestore().collection('yourCollectionName');
        const snapshot = await dataRef.get();
  
        const chartData = snapshot.docs.map((doc) => {
          const year = doc.data().year;
          const yala = doc.data().yala;
          const maha = doc.data().maha;
  
          return { year, yala, maha };
        });
  
        setData(chartData);
      };
  
      fetchData();
    }, []);
  
    // Render your chart using 'data' state
  }
  useEffect(() => {
    getData(startYear, endYear);
  }, [startYear, endYear]);

  const getData = async (startYear, endYear) => {
    try {
      const harvDataCollectionRef = collection(DB, "harvesting");
      const response = await getDocs(harvDataCollectionRef);

      const harData = response.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .filter((item) => item.season === "yala" || item.season === "maha")
        .filter((item) => item.year >= startYear && item.year <= endYear);

      setHarvData(harData);
    } catch (error) {
      console.error(error);
    }
  };

  const yalaData = harvData.filter((item) => item.season === "yala");
  const mahaData = harvData.filter((item) => item.season === "maha");

  const chartData = {
    labels: harvData.map((item) => item.year),
    legend: ["Yala", "Maha"],
    data: [
      yalaData.map((item) => item.quantity),
      mahaData.map((item) => item.quantity),
    ],
    barColors: ["#9F71D8", "#36BC15"],
  };

  const chartConfig = {
    backgroundGradientFrom: "#f5f5f5",
    backgroundGradientTo: "#f5f5f5",
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
  };

  function StackedBarChartComponent({ data }) {
    const chartData = {
      labels: data.map((item) => item.year),
      datasets: [
        {
          data: data.map((item) => item.yala),
          color: (opacity = 1) => `rgba(0, 128, 0, ${opacity})`, // Yala color
          legend: 'Yala',
        },
        {
          data: data.map((item) => item.maha),
          color: (opacity = 1) => `rgba(0, 0, 128, ${opacity})`, // Maha color
          legend: 'Maha',
        },
      ],
    };
  }
  return (
    <View style={styles.container}>
      <ImageBackground
        style={{ width: "100%", height: "100%" }}
        source={require("../../assets/images/bg3.jpg")}
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

        <View style={{ alignItems: "center", marginTop: 100 }}>
          <Text style={{ fontSize: 25, color: "black", fontWeight: "bold" }}>
            Previous Records
          </Text>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Start Year"
            onChangeText={(text) => setStartYear(parseInt(text))}
          />
          <TextInput
            style={styles.input}
            placeholder="End Year"
            onChangeText={(text) => setEndYear(parseInt(text))}
          />
        </View>

        <View style={styles.chart}>
        <StackedBarChart
            data={chartData}
            width={300}
            height={220}
            yAxisLabel="Quantity"
            chartConfig={{
              backgroundGradientFrom: '#f0f0f0',
              backgroundGradientTo: '#f0f0f0',
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            }}
          />
        </View>
        <TouchableOpacity
          style={styles.saveButton}
          onPress={() => navigation.navigate("Harvest")}
        >
          <Text style={styles.saveButtonText}>Add records</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chart: {
    alignItems: "center",
    marginTop: 50,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 80,
  },
  input: {
    borderWidth: 2,
    borderColor: "#616161",
    padding: 8,
    marginHorizontal: 30,
    width: 100,
    borderRadius: 15,
  },
  saveButton: {
    width: "50%",
    height: 50,
    borderWidth: 1.5,
    borderRadius: 15,
    position: "absolute",
    alignSelf: "center",
    marginTop: 630,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#009272",
    borderColor: "white",
  },
  saveButtonText: {
    color: "black",
    fontSize: 16,
  },
});

export default BarChartScreen;
