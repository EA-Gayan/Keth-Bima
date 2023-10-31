import React, { useState, useRef } from "react";
import {
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
  View,
  StyleSheet,
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

        <TouchableOpacity style={styles.pickButton} onPress={pickImage}>
          <Ionicons name={"cloud-upload-outline"} size={50} />
          <Text style={styles.pickButtonText}>Choose Image</Text>
        </TouchableOpacity>

        {selectedImage && (
          <Image
            source={{ uri: selectedImage }}
            style={{
              width: 200,
              height: 200,
              alignSelf: "center",
              marginTop: 20,
            }}
          />
        )}
        {predictions.length > 0 && (
          <View>
            <Text>Predictions:</Text>
            <Text>{JSON.stringify(predictions, null, 2)}</Text>
          </View>
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
    marginTop: 300,
  },
  pickButton: {
    width: "70%",
    height: "60%",
    borderWidth: 2,
    borderRadius: 15,
    position: "absolute",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fcfcfc",
    borderColor: "blue",
    marginTop: 450,
  },
  pickButtonText: {
    color: "blue",
    fontSize: 16,
  },
});

export default ModelScreen;
