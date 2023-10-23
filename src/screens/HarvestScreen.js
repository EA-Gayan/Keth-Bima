import {
  Image,
  Text,
  SafeAreaView,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import DropDownPicker from "react-native-dropdown-picker";
import { Ionicons } from "@expo/vector-icons";
import { DB } from "../../firebaseInit";
import { collection, addDoc } from "firebase/firestore";
import { Alert } from "react-native";

const HarvestScreen = ({ navigation }) => {
  const handleSubmit = async () => {
    if (year && qty && value) {
      try {
        // Create a new document in the "harvests" collection with the entered data
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
    <SafeAreaView>
      <LinearGradient
        colors={["#FFFEFE", "#FFFEFE", "#99ff99"]}
        style={{
          width: "100%",
          height: "100%",
          alignItems: "center",
        }}
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
            left: 10,
            zIndex: 100,
          }}
        >
          <Ionicons name="arrow-back-outline" size={32} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate("BarChart")}
          style={{
            backgroundColor: "white",
            width: 40,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 100,
            position: "absolute",
            top: 50,
            right: 10,
            zIndex: 100,
          }}
        >
          <Ionicons name="arrow-forward-outline" size={32} color="black" />
        </TouchableOpacity>
        <Image
          source={require("../../assets/images/records.png")}
          style={{ width: 220, height: 220, marginTop: 120, marginRight: 40 }}
        />
        <TextInput
          placeholder="Enter the Year"
          value={year}
          onChangeText={(text) => setYear(text)}
          style={styles.yearinput}
        />
        <DropDownPicker
          placeholder="Select the Season"
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
          placeholder="Quantity"
          value={qty}
          onChangeText={(text) => setQty(text)}
          style={styles.qtyInput}
        />
        <TouchableOpacity style={styles.saveButton} onPress={handleSubmit}>
          <Text style={styles.saveButtonText}>Submit</Text>
        </TouchableOpacity>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  yearinput: {
    paddingVertical: 8.5,
    paddingHorizontal: 20,
    fontSize: 14,
    color: "#000000",
    borderRadius: 20,
    backgroundColor: "#ffffff",
    borderColor: "black",
    borderWidth: 2,
    marginBottom: 20,
    marginTop: 80,
    width: 300,
  },

  dropDownStyle: {
    paddingVertical: 8.5,
    paddingHorizontal: 20,
    backgroundColor: "#ffffff",
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 20,
    width: 300,
    marginLeft: 45,
  },
  qtyInput: {
    paddingVertical: 8.5,
    paddingHorizontal: 20,
    fontSize: 14,
    color: "#000000",
    borderRadius: 20,
    backgroundColor: "#ffffff",
    borderColor: "black",
    borderWidth: 2,
    marginBottom: 20,
    width: 300,
    marginTop: 20,
  },
  saveButton: {
    backgroundColor: "#007BFF",
    borderRadius: 20,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    width: 300,
    height: 48,
  },
  saveButtonText: {
    color: "white",
    fontSize: 16,
  },
});

export default HarvestScreen;
