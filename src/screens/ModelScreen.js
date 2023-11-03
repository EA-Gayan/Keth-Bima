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
      setSelectedImage(result.assets[0].uri);
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
        {selectedImage ? (
          // Display the selected image
          <View>
            <Text style={styles.title}>You are all set</Text>
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: selectedImage }}
                style={{ width: 200, height: 200 }}
              />
            </View>
            <View style={styles.loc}>
              <Pressable
                style={styles.button}
                onPress={() => setSelectedImage(null)}
              >
                <Text style={styles.text1}>Cancel</Text>
              </Pressable>
              <Pressable
                style={styles.button}
                onPress={() => classifyImage(selectedImage)}
              >
                <Text style={styles.text}>Confirm</Text>
              </Pressable>
            </View>
          </View>
        ) : (
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
        )}
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
  title: {
    textAlign: "center",
    fontSize: 25,
    fontWeight: "bold",
    color: "#C84831",
    marginTop: 170,
  },
  imageContainer: {
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    marginTop: 200,
  },
  des: {
    marginLeft: "40%",
    marginTop: 70,
    fontWeight: "bold",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 15,
    elevation: 3,
    backgroundColor: "#98DE5B",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    letterSpacing: 0.25,
    color: "black",
  },
  text1: {
    fontSize: 16,
    lineHeight: 21,
    letterSpacing: 0.25,
    color: "red",
  },
  loc: {
    alignItems: "center",
    marginTop: 180,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});

export default ModelScreen;
