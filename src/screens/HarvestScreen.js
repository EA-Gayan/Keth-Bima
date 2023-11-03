import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { firestore, collection, addDoc } from "../../firebaseInit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { number, object } from 'yup';
import { DB } from "../../firebaseInit";

const HarvestScreen = ({ navigation }) => {
  const [selectedLang, setSelectedLang] = useState(0);
  const [formData, setFormData] = useState({
    year: '',
    yala: '',
    maha: '',
  });

  const [formErrors, setFormErrors] = useState({
    year: '',
    yala: '',
    maha: '',
  });

  useEffect(() => {
    getLang();
  }, []);

  const getLang = async () => {
    setSelectedLang(parseInt(await AsyncStorage.getItem("LANG")));
  };

  const handleFormChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const validateForm = () => {
    let errors = {};
    const schema = object({
      year: number().required('Year is required'),
      yala: number().required('Yala quantity is required'),
      maha: number().required('Maha quantity is required'),
    });

    schema.validate(formData, { abortEarly: false })
      .then(() => {
        setFormErrors({});
      })
      .catch((error) => {
        const newErrors = {};
        error.inner.forEach((err) => {
          newErrors[err.path] = err.message;
        });
        setFormErrors(newErrors);
      });
  };

  const handleFormSubmit = async () => {
    // Validate the form before submitting
    validateForm();
  
    // Check if there are any errors in the form
    if (Object.keys(formErrors).length === 0) {
      try {
        // Submit the form data to Firestore
        const dataRef = collection(firestore, 'harvesting');
        await addDoc(dataRef, formData);
  
        // Clear the form
        setFormData({
          year: '',
          yala: '',
          maha: '',
        });
  
        // Optionally show a success message or navigate to another screen
      } catch (error) {
        console.error("Firestore Error:", error);
      }
    }
  };
  

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
          style={{ width: 250, height: 250, marginTop: 50, marginRight: 20 }} />
      </View>
      <View style={styles.container}>
        <Text style={styles.label}>Year:</Text>
        <TextInput
          style={styles.input}
          value={formData.year}
          onChangeText={(value) => handleFormChange("year", value)}
        />
        <Text style={styles.error}>{formErrors.year}</Text>

        <Text style={styles.label}>Yala Quantity:</Text>
        <TextInput
          style={styles.input}
          value={formData.yala}
          onChangeText={(value) => handleFormChange("yala", value)}
        />
        <Text style={styles.error}>{formErrors.yala}</Text>

        <Text style={styles.label}>Maha Quantity:</Text>
        <TextInput
          style={styles.input}
          value={formData.maha}
          onChangeText={(value) => handleFormChange("maha", value)}
        />
        <Text style={styles.error}>{formErrors.maha}</Text>

        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleFormSubmit}>
          <Text style={styles.saveButtonText}>Submit</Text>
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
    borderRadius: 20
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
    marginTop: 350,
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
