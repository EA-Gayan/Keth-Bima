import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/FontAwesome";
import LanguageModal from "../lang_model/LanguageModal";
import { translation } from "../lang_model/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";

const YourScreen = ({ navigation }) => {
  const handleButtonPress = () => {
    navigation.navigate("Login");
  };

  const [langModalVisible, setLangModalVisible] = useState(false);
  const [selectedLang, setSelectedLang] = useState(0);
  const saveSelectedLang = async (index) => {
    await AsyncStorage.setItem("LANG", index + "");
  };

  return (
    <SafeAreaView>
      <LinearGradient
        colors={["#FFFEFE", "#FFFEFE", "#99ff99"]}
        style={{ width: "100%", height: "100%" }}
      >
        <View style={styles.container}>
          <Image
            source={require("../../assets/images/on1.png")}
            style={styles.image}
          />
          <Text style={styles.title}>
            {selectedLang == 0
              ? translation[0].English
              : selectedLang == 1
              ? translation[0].Sinhala
              : null}
          </Text>
          <Text style={styles.subtitle}>
            {selectedLang == 0
              ? translation[1].English
              : selectedLang == 1
              ? translation[1].Sinhala
              : null}
          </Text>

          <TouchableOpacity
            style={styles.selectLangaugeBtn}
            onPress={() => {
              setLangModalVisible(!langModalVisible);
            }}
          >
            <Text>
              {selectedLang == 0
                ? translation[2].English
                : selectedLang == 1
                ? translation[2].Sinhala
                : null}
            </Text>
          </TouchableOpacity>
          <LanguageModal
            langModalVisible={langModalVisible}
            setLangModalVisible={setLangModalVisible}
            onSelectLang={(x) => {
              setSelectedLang(x);
              saveSelectedLang(x);
            }}
          />

          <TouchableOpacity
            style={styles.arrowButton}
            onPress={handleButtonPress}
          >
            <Icon name="arrow-right" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 350,
    height: 250,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
    marginTop: 40,
  },
  subtitle: {
    fontSize: 18,
    marginVertical: 10,
  },
  selectLangaugeBtn: {
    width: "50%",
    height: 50,
    borderWidth: 1.5,
    borderRadius: 15,
    position: "absolute",
    alignSelf: "center",
    bottom: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 100,
    backgroundColor: "#f3d69a",
  },
  arrowButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 50,
  },
});

export default YourScreen;
