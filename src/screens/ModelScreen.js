import React, { useState, useRef } from "react";
import {
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
  View,
  StyleSheet,
  Pressable,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import LottieView from "lottie-react-native";

const ModelScreen = ({ navigation }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const animation = useRef(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.uri);
      classifyImage(result.uri);
    }
  };

  return (
    <LinearGradient
      colors={["#FFFEFE", "#FFFEFE", "#99ff99"]}
      style={{ flex: 1 }}
    >
      <SafeAreaView>
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
        <TouchableOpacity onPress={pickImage}>
          <View style={styles.animationContainer}>
            <LottieView
              autoPlay
              ref={animation}
              style={{
                width: 200,
                height: 200,
              }}
              source={require("../../assets/animation/searching.json")}
            />
          </View>
          <Text style={styles.des}>Choose image</Text>
        </TouchableOpacity>
        <View style={styles.loc}>
          <Pressable colors="#33A036" style={styles.button} onPress={""}>
            <Text style={styles.text}>Confirm</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  animationContainer: {
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    marginTop: 400,
  },

  des: {
    marginLeft: "38%",
    marginTop: 100,
    fontWeight: "bold",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    borderRadius: 2,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "black",
  },
  loc: {
    alignItems: "center",
  },
});

export default ModelScreen;
