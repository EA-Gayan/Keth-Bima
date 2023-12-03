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

const LeafScald = ({ navigation }) => {
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
          <View style={styles.al}>
            <View style={styles.rect}>
              <View style={styles.amarylissColumnRow}>
                <View style={styles.amarylissColumn}>
                  <Text style={styles.amarylissTitle}>Disease Management</Text>
                </View>
              </View>
              <View style={styles.rect2}>
                <Text style={styles.amarylissTitle2}>
                  <Text style={styles.heading}>If the disease spread fast</Text>
                  <Text style={styles.need}>
                    {"\n"}
                    {"\n"} ✅ Tebuconazole 250g/l EC – dissolve 10 ml in 16 l of
                    water (8-10 tanks per acre)
                    {"\n"}
                    {"\n"} ✅ Isoprothiolane 400g/l EC – dissolve 20 ml in 16 l
                    of water (8-10 tanks per acre)
                    {"\n"}
                    {"\n"} ✅ Carbendazim 50% WP/WG – dissolve 11 g/ 11 ml in 16
                    l of water (8-10 tanks per acre)
                    {"\n"}
                    {"\n"} ✅ Tricyclazole 75 %WP – dissolve 10 g in 16 l of
                    water (8-10 tanks per acre)
                  </Text>
                </Text>
              </View>
              <View style={styles.rect3}>
                <Text style={styles.amarylissTitle2}>
                  <Text style={styles.heading}>If the crop is infected,</Text>
                  <Text style={styles.need}>
                    {"\n"}
                    {"\n"} ✅ Use of resistant varieties (Bg 403, Bg 406, Bg
                    366, Bg 359, Bw 361, Bg 250)
                    {"\n"}
                    {"\n"} ✅ Use of certified seed paddy free from the disease
                    {"\n"}
                    {"\n"} ✅ Addition of burnt paddy husk (250 kg per acre) to
                    the soil during land preparation.
                    {"\n"}
                    {"\n"} ✅ Abstain addition of disease infected straw.
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
    height: 769,
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 27,
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
    height: 250,
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
    height: 210,
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
export default LeafScald;
