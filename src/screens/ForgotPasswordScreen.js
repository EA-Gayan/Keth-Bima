import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../assets/constants/Colors";
import { FIREBASE_AUTH } from "../../firebaseInit";
import { sendPasswordResetEmail } from "@firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ForgotPasswordScreen = ({ navigation }) => {
  const [resetEmail, setResetEmail] = useState("");

  const resetPassword = async () => {
    try {
      await sendPasswordResetEmail(FIREBASE_AUTH, resetEmail);
      alert("Password reset email sent. Check your inbox.");
      navigation.goBack(); // Navigate back to the login screen
    } catch (error) {
      console.log(error);
      alert("Password reset failed");
    }
  };

  return (
    <LinearGradient
      colors={["#FFFEFE", "#FFFEFE", "#99ff99"]}
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    >
      <Text style={{ fontSize: 24, marginBottom: 20 }}>
        Forgot Password Screen
      </Text>
      <TextInput
        placeholder="Enter your email"
        value={resetEmail}
        onChangeText={(text) => setResetEmail(text)}
        style={{
          width: 300,
          paddingVertical: 10,
          paddingHorizontal: 20,
          fontSize: 16,
          color: "#000000",
          borderRadius: 20,
          backgroundColor: Colors.white,
          borderColor: "darkgray",
          borderWidth: 2,
          marginBottom: 20,
        }}
      />
      <TouchableOpacity
        onPress={() => resetPassword()}
        activeOpacity={0.8}
        style={{
          width: 300,
          paddingVertical: 14,
          paddingHorizontal: 20,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f3d69a",
          borderRadius: 10,
        }}
      >
        <Text>Reset Password</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default ForgotPasswordScreen;
