import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { translation } from "../../lang_model/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LeafBlight = ({ navigation }) => {
  const [selectedLang, setSelectedLang] = useState(0);

  useEffect(() => {
    getLang();
  }, []);
  const getLang = async () => {
    setSelectedLang(parseInt(await AsyncStorage.getItem("LANG")));
  };

  const route = useRoute();
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
            source={require("../../../assets/images/aug_0_1203.jpg")}
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
              <View>
                <Text style={styles.diseaseTitle}>
                  {selectedLang == 0
                    ? translation[62].English
                    : selectedLang == 1
                    ? translation[62].Sinhala
                    : null}
                  <Text style={{ color: "red" }}>{route.params.class}</Text>
                </Text>
              </View>
              <View style={styles.rect2}>
                <Text style={styles.amarylissTitle2}>
                  <Text style={styles.heading}>
                    {selectedLang == 0
                      ? translation[63].English
                      : selectedLang == 1
                      ? translation[63].Sinhala
                      : null}
                  </Text>
                  <Text style={styles.need}>
                    {"\n"}
                    {"\n"}
                    {selectedLang == 0
                      ? translation[64].English
                      : selectedLang == 1
                      ? translation[64].Sinhala
                      : null}
                    {"\n"}
                    {"\n"}
                    {selectedLang == 0
                      ? translation[65].English
                      : selectedLang == 1
                      ? translation[65].Sinhala
                      : null}
                  </Text>
                </Text>
              </View>
              <View style={styles.rect3}>
                <Text style={styles.amarylissTitle2}>
                  <Text style={styles.heading}>
                    {selectedLang == 0
                      ? translation[66].English
                      : selectedLang == 1
                      ? translation[66].Sinhala
                      : null}
                  </Text>
                  <Text style={styles.need}>
                    {"\n"}
                    {"\n"}
                    {selectedLang == 0
                      ? translation[67].English
                      : selectedLang == 1
                      ? translation[67].Sinhala
                      : null}
                    {"\n"}
                    {"\n"}
                    {selectedLang == 0
                      ? translation[68].English
                      : selectedLang == 1
                      ? translation[68].Sinhala
                      : null}
                    {"\n"}
                    {"\n"}
                    {selectedLang == 0
                      ? translation[69].English
                      : selectedLang == 1
                      ? translation[69].Sinhala
                      : null}
                    {"\n"}
                    {"\n"}
                    {selectedLang == 0
                      ? translation[70].English
                      : selectedLang == 1
                      ? translation[70].Sinhala
                      : null}
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
    height: 569,
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 27,
  },
  diseaseTitle: {
    color: "#121212",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 8,
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
    height: 320,
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
    height: 900,
    marginTop: -16,
  },
});
export default LeafBlight;
