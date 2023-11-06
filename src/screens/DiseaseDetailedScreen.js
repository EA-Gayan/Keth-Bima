import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const DiseaseDetailedScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.goBack()}
        style={{
          backgroundColor: "white",
          width: 35,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 100,
          position: "absolute",
          top: 50,
          left: 10,
          zIndex: 100,
        }}
      >
        <Ionicons name="chevron-back" size={32} color="black" />
      </TouchableOpacity>
      <View style={styles.imageStack}>
        <Image
          source={require("../../assets/images/green-field.jpg")}
          resizeMode="contain"
          style={styles.image}
        />
        <View style={styles.al}>
          <View style={styles.rect}>
            <View style={styles.amarylissPotatoColumnRow}>
              <View style={styles.amarylissPotatoColumn}>
                <Text style={styles.amarylissPotato}>Rice blast</Text>
                <View style={styles.image3Row}>
                  <Image
                    source={require("../../assets/images/check.png")}
                    resizeMode="contain"
                    style={styles.image3}
                  />
                  <Text style={styles.maimoSweden}>
                    Fungus, Magnaporthe grisea
                  </Text>
                </View>
              </View>
              <Image
                source={require("../../assets/images/green.png")}
                resizeMode="contain"
                style={styles.image2}
              />
            </View>
            <View style={styles.rect2}>
              <View style={styles.image4Row}>
                <Image
                  // source={require("../assets/images/summer.png")}
                  resizeMode="contain"
                  style={styles.image4}
                />
                <Text style={styles.needSunlight}>Need Sunlight</Text>
                <Image
                  // source={require("../assets/images/watering.png")}
                  resizeMode="contain"
                  style={styles.image5}
                />
                <Text style={styles.waterWeekly}>Water Weekly</Text>
              </View>
            </View>
            <View style={styles.rect3}>
              <Text style={styles.loremIpsum2}>Disease Management </Text>
              <Text style={styles.loremIpsum1}>
                Within the crop season Application of urea in recommended
                dosages or application of urea based on leaf colour chart.
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  image: {
    top: 0,
    width: 482,
    height: 315,
    position: "absolute",
    left: 0,
  },
  al: {
    alignItems: "center",
    alignContent: "center",
    marginLeft: 10,
  },
  rect: {
    top: 249,
    width: 360,
    height: 469,
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 27,
  },
  amarylissPotato: {
    color: "#121212",
    fontSize: 20,
    marginLeft: 2,
  },

  image3: {
    width: 21,
    height: 15,
    marginTop: 1,
  },
  maimoSweden: {
    color: "#121212",
    marginLeft: 3,
  },
  image3Row: {
    height: 17,
    flexDirection: "row",
    marginTop: 9,
    marginRight: 35,
  },
  amarylissPotatoColumn: {
    width: 159,
  },
  image2: {
    width: 59,
    height: 46,
    marginLeft: 111,
  },
  amarylissPotatoColumnRow: {
    height: 54,
    flexDirection: "row",
    marginTop: 20,
    marginLeft: 16,
    marginRight: 15,
  },
  rect2: {
    width: 326,
    height: 50,
    backgroundColor: "white",
    borderRadius: 16,
    flexDirection: "row",
    marginTop: 13,
    marginLeft: 18,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    elevation: 5,
    shadowOpacity: 0.16,
    shadowRadius: 10,
  },
  image4: {
    width: 20,
    height: 20,
  },
  needSunlight: {
    color: "#121212",
    marginLeft: 7,
    marginTop: 2,
  },
  image5: {
    width: 25,
    height: 20,
    marginLeft: 69,
  },
  waterWeekly: {
    color: "#121212",
    marginLeft: 2,
    marginTop: 2,
  },
  image4Row: {
    height: 20,
    flexDirection: "row",
    flex: 1,
    marginRight: 20,
    marginLeft: 12,
    marginTop: 15,
  },
  rect3: {
    width: 326,
    height: 202,
    backgroundColor: "white",
    borderRadius: 12,
    marginTop: 30,
    marginLeft: 18,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    elevation: 5,
    shadowOpacity: 0.16,
    shadowRadius: 10,
  },
  loremIpsum1: {
    color: "#121212",
    width: 315,
    height: 176,
    textAlign: "justify",
    marginTop: 30,
    marginLeft: 6,
  },
  loremIpsum2: {
    color: "#121212",
    textAlign: "justify",
    fontSize: 15,
    top: 10,
    marginLeft: 6,
  },
  imageStack: {
    width: 482,
    height: 718,
    marginTop: -16,
  },
});
export default DiseaseDetailedScreen;
