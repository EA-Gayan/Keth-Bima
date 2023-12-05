import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { translation } from "../../lang_model/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Healthy = ({ navigation }) => {
  const route = useRoute();
  const [selectedLang, setSelectedLang] = useState(0);

  useEffect(() => {
    getLang();
  }, []);
  const getLang = async () => {
    setSelectedLang(parseInt(await AsyncStorage.getItem("LANG")));
  };
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
            source={require("../../../assets/images/aug_0_52.jpg")}
            resizeMode="contain"
            style={styles.image}
          />
          <View style={styles.al}>
            <View style={styles.rect}>
              <View style={styles.amarylissColumnRow}>
                <View style={styles.amarylissColumn}>
                  <Text style={styles.amarylissTitle}>
                    {selectedLang == 0
                      ? translation[47].English
                      : selectedLang == 1
                      ? translation[47].Sinhala
                      : null}
                  </Text>
                </View>
              </View>
              <View style={styles.rect2}>
                <Text style={styles.heading}>
                  <Text style={styles.heading}>
                    {selectedLang == 0
                      ? translation[48].English
                      : selectedLang == 1
                      ? translation[48].Sinhala
                      : null}
                  </Text>
                </Text>
                <Text style={styles.heading}>
                  <Text style={styles.heading}>
                    {selectedLang == 0
                      ? translation[49].English
                      : selectedLang == 1
                      ? translation[49].Sinhala
                      : null}
                  </Text>
                </Text>

                <Text style={styles.heading}>
                  <Text style={styles.heading}>
                    {selectedLang == 0
                      ? translation[50].English
                      : selectedLang == 1
                      ? translation[50].Sinhala
                      : null}{" "}
                    <Text style={{ color: "green" }}>
                      {route.params.confidence}
                    </Text>
                  </Text>
                </Text>
                <Image
                  source={require("../../../assets/images/check.jpg")}
                  resizeMode="contain"
                  style={styles.imagecheck}
                />
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
    top: 100,
    width: 150,
    height: 150,
    position: "absolute",
    left: 160,
  },
  al: {
    alignItems: "center",
    alignContent: "center",
  },
  rect: {
    top: 249,
    width: 363,
    height: 420,
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 27,
    marginTop: 20,
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
    marginLeft: 15,
    padding: 10,
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
    height: 150,
    backgroundColor: "white",
    borderRadius: 16,
    flexDirection: "column",
    marginTop: 10,
    marginBottom: 30,
    marginLeft: 8,
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
  imagecheck: {
    height: 150,
    width: 150,
    marginTop: 50,
    marginLeft: 80,
  },
});
export default Healthy;
