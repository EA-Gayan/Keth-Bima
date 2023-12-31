import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Image,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { collection, addDoc } from "firebase/firestore";
import { DB } from "../../firebaseInit";
import { translation } from "../lang_model/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HarvestScreen = ({ navigation }) => {
  const [year, setYear] = useState("");
  const [yala, setYala] = useState("");
  const [maha, setMaha] = useState("");
  const [selectedLang, setSelectedLang] = useState(0);

  useEffect(() => {
    getLang();
  }, []);
  const getLang = async () => {
    setSelectedLang(parseInt(await AsyncStorage.getItem("LANG")));
  };

  const handleFormSubmit = async () => {
    addDoc(collection(DB, "harvesting"), {
      year: year,
      yala: yala,
      maha: maha,
    })
      .then(() => {
        Alert.alert("Data submitted Successfully", "", [
          {
            text: "OK",
            onPress: () => {
              setYear("");
              setYala("");
              setMaha("");

              // Navigate to another page
              navigation.goBack();
            },
          },
        ]);
      })
      .catch((error) => {
        Alert.alert(error);
      });
  };

  return (
    <ImageBackground
      style={{ resizeMode: "cover", width: "100%", height: "100%" }}
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
      <View style={{ alignItems: "center" }}>
        <Image
          source={require("../../assets/images/records.png")}
          style={{ width: 250, height: 250, marginTop: 50, marginRight: 20 }}
        />
      </View>
      <View style={styles.container}>
        <Text style={styles.label}>
          {selectedLang == 0
            ? translation[46].English
            : selectedLang == 1
            ? translation[46].Sinhala
            : null}
          :
        </Text>
        <TextInput
          style={styles.input}
          value={year}
          onChangeText={(year) => setYear(year)}
          keyboardType="numeric"
        />

        <Text style={styles.label}>
          {selectedLang == 0
            ? translation[43].English
            : selectedLang == 1
            ? translation[43].Sinhala
            : null}
          :
        </Text>
        <TextInput
          style={styles.input}
          value={yala}
          onChangeText={(yala) => setYala(yala)}
          keyboardType="numeric"
        />

        <Text style={styles.label}>
          {selectedLang == 0
            ? translation[44].English
            : selectedLang == 1
            ? translation[44].Sinhala
            : null}
          :
        </Text>
        <TextInput
          style={styles.input}
          value={maha}
          onChangeText={(maha) => setMaha(maha)}
          keyboardType="numeric"
        />
        <TouchableOpacity style={styles.saveButton} onPress={handleFormSubmit}>
          <Text style={styles.saveButtonText}>
            {selectedLang == 0
              ? translation[45].English
              : selectedLang == 1
              ? translation[45].Sinhala
              : null}
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 5,
  },
  input: {
    width: "80%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
    borderRadius: 20,
  },
  error: {
    color: "red",
  },

  saveButton: {
    width: "60%",
    height: 50,
    borderWidth: 1.5,
    borderRadius: 15,
    position: "absolute",
    alignSelf: "center",
    marginTop: 320,
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

export default HarvestScreen;
