import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const LeafBlight = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
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
            source={require("../../../assets/images/green-field.jpg")}
            resizeMode="contain"
            style={styles.image}
          />
          <View style={styles.al}>
            <View style={styles.rect}>
              <View style={styles.amarylissColumnRow}>
                <View style={styles.amarylissColumn}>
                  <Text style={styles.amarylissTitle}>Disease Management</Text>
                </View>
              </View>
              <View>
                <Text style={styles.diseaseTitle}>Disease Name: <Text style={{color:"red"}}>{route.params.class}</Text></Text>
                </View>
              <View style={styles.rect2}>
                <Text style={styles.amarylissTitle2}>
                  <Text style={styles.heading}>Within the crop season</Text>
                  <Text style={styles.need}>
                    {"\n"}
                    {"\n"} ✅ Application of urea in recommended dosages or
                    application of urea based on leaf colour chart.
                    {"\n"}
                    {"\n"} ✅ Ensure good drainage of fields.
                  </Text>
                </Text>
              </View>
              <View style={styles.rect3}>
                <Text style={styles.amarylissTitle2}>
                  <Text style={styles.heading}>
                    Immediately after the disease is observed,
                  </Text>
                  <Text style={styles.need}>
                    {"\n"}
                    {"\n"} ✅ stop water supply, and let the field dry.
                    {"\n"}
                    {"\n"} ✅ When total removal of water is, not possible, try
                    to out-flow water through drainage ditches or water courses
                    (wakkada).
                    {"\n"}
                    {"\n"} ✅ Water drained from the fields infected with
                    disease should not be diverted through disease free fields
                    as much as possible.
                    {"\n"}
                    {"\n"} ✅ Once the disease is observed, application of
                    potassium fertilizer could manage further spread of the
                    disease.
                  </Text>
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
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
  },
  rect: {
    top: 249,
    width: 363,
    height: 569,
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 27,
  },
  diseaseTitle: {
    color: "#121212",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 15,

  },
  amarylissTitle: {
    color: "#121212",
    fontSize: 20,
    fontWeight: "bold",
  },
  heading: {
    color: "#121212",
    fontSize: 16,
    fontWeight: "bold",
  },
  amarylissColumn: {
    width: 200,
  },
  image2: {
    width: 59,
    height: 46,
    marginLeft: 111,
  },
  amarylissColumnRow: {
    height: 54,
    flexDirection: "row",
    marginTop: 20,
    marginLeft: 16,
    marginRight: 15,
  },
  rect2: {
    width: 345,
    height: 130,
    backgroundColor: "white",
    borderRadius: 16,
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 30,
    marginLeft: 5,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    elevation: 5,
    shadowOpacity: 0.16,
    shadowRadius: 10,
  },

  need: {
    color: "#141414",
    marginTop: 2,
    fontSize: 14,
  },

  rect3: {
    width: 345,
    height: 280,
    backgroundColor: "white",
    borderRadius: 16,
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 30,
    marginLeft: 5,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    elevation: 5,
    shadowOpacity: 0.16,
    shadowRadius: 10,
  },
  imageStack: {
    width: 482,
    height: 850,
    marginTop: -16,
  },
});
export default LeafBlight;
