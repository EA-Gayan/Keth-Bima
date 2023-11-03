import {
  Image,
  Text,
  SafeAreaView,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  View,
  ImageBackground,
} from "react-native";
import React, { useState, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import DropDownPicker from "react-native-dropdown-picker";
import { Ionicons } from "@expo/vector-icons";
import { DB } from "../../firebaseInit";
import { collection, addDoc } from "firebase/firestore";
import { Alert } from "react-native";
import { translation } from "../lang_model/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HarvestScreen = ({ navigation }) => {
  const [selectedLang, setSelectedLang] = useState(0);
  useEffect(() => {
    getLang();
  }, []);
  const getLang = async () => {
    setSelectedLang(parseInt(await AsyncStorage.getItem("LANG")));
  };

  const handleSubmit = async () => {
    if (year && qty && value) {
      try {
        const docRef = await addDoc(collection(DB, "harvesting"), {
          year,
          quantity: Number(qty),
          season: value,
        });

        setYear("");
        setQty("");
        setValue(null);

        // Show a success alert
        Alert.alert("Success", "Data saved successfully", [
          {
            text: "OK",
            onPress: () => navigation.navigate("BarChart"),
          },
        ]);
      } catch (error) {
        console.error("Error saving data: ", error);
        Alert.alert("Error", "An error occurred while saving data");
      }
    } else {
      console.error("Please fill in all fields before saving.");
    }
  };

  const [year, setYear] = useState("");
  const [qty, setQty] = useState("");
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Yala", value: "yala" },
    { label: "Maha", value: "maha" },
  ]);

  return (
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
      <View style={{ alignItems: "center" }}>
        <Image
          source={require("../../assets/images/records.png")}
          style={{ width: 250, height: 250, marginTop: 50, marginRight: 20 }}
        />
        <View style={styles.inputContainer}>
          <TextInput
            placeholder={
              selectedLang == 0
                ? translation[14].English
                : selectedLang == 1
                ? translation[14].Sinhala
                : null
            }
            value={year}
            onChangeText={(text) => setYear(text)}
            style={styles.yearinput}
          />
          <DropDownPicker
            placeholder={
              selectedLang == 0
                ? translation[15].English
                : selectedLang == 1
                ? translation[15].Sinhala
                : null
            }
            style={styles.dropDownStyle}
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            dropDownContainerStyle={styles.dropDownStyle}
          />
          <TextInput
            placeholder={
              selectedLang == 0
                ? translation[16].English
                : selectedLang == 1
                ? translation[16].Sinhala
                : null
            }
            value={qty}
            onChangeText={(text) => setQty(text)}
            style={styles.qtyInput}
          />
        </View>
        <TouchableOpacity
          style={styles.saveButton}
          onPress={() => navigation.navigate("Harvest")}
        >
          <Text style={styles.saveButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 20,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    width: 320,
  },
  yearinput: {
    paddingVertical: 8.5,
    paddingHorizontal: 20,
    fontSize: 14,
    color: "#000000",
    borderRadius: 20,
    backgroundColor: "#ffffff",
    borderColor: "black",
    borderWidth: 1,
    marginBottom: 20,
    width: 250,
    marginTop: 20,
  },

  dropDownStyle: {
    paddingVertical: 8.5,
    paddingHorizontal: 20,
    backgroundColor: "#ffffff",
    borderColor: "black",
    borderRadius: 20,
    width: 250,
    marginLeft: 22,
  },
  qtyInput: {
    paddingVertical: 8.5,
    paddingHorizontal: 20,
    fontSize: 14,
    color: "#000000",
    borderRadius: 20,
    backgroundColor: "#ffffff",
    borderColor: "black",
    borderWidth: 0.5,
    marginBottom: 20,
    width: 250,
    marginTop: 20,
  },
  saveButton: {
    width: "50%",
    height: 50,
    borderWidth: 0.5,
    borderRadius: 15,
    position: "absolute",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#009272",
    borderColor: "white",
    marginTop: 680,
  },
  saveButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default HarvestScreen;
