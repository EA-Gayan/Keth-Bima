import {
  View,
  Text,
  Image,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { translation } from "../lang_model/utils";

const HomeScreen = ({ navigation }) => {
  const takePhoto = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status === "granted") {
      const photo = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!photo.canceled) {
        console.log("Taken photo:", photo);
      }
    } else {
      console.log("Camera permission denied");
    }
  };

  const chooseImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status === "granted") {
      const image = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!image.canceled) {
        console.log("Selected image:", image);
      }
    } else {
      console.log("Media library permission denied");
    }
  };

  const [selectedLang, setSelectedLang] = useState(0);
  useEffect(() => {
    getLang();
  }, []);
  const getLang = async () => {
    setSelectedLang(parseInt(await AsyncStorage.getItem("LANG")));
  };

  const LogInWithIcon = ({ iconName, onPress, buttonTitle }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={{
          width: "40%",
          paddingHorizontal: 12,
          paddingVertical: 24,
          backgroundColor: "white",
          borderWidth: 1.5,
          borderColor: "#c1c1c1",
          borderRadius: 10,
          alignItems: "center",
          justifyContent: "center",
        }}
        onPress={onPress}
      >
        <Ionicons
          name={iconName}
          style={{
            fontSize: 26,
            color: "#079470",
            marginBottom: 4,
          }}
        />
        <Text
          style={{
            fontSize: 14,
            color: "#079470",
            marginBottom: 4,
            fontWeight: "bold",
          }}
        >
          {buttonTitle}
        </Text>
      </TouchableOpacity>
    );
  };

  const actions = [
    {
      text: "Take Image",
      icon: require("../../assets/images/camera.png"),
      name: "takeImage",
      position: 1,
    },
    {
      text: "Choose Image",
      icon: require("../../assets/images/gallery.png"),
      name: "chooseImage",
      position: 2,
    },
  ];

  return (
    <View style={styles.container}>
      <ImageBackground
        style={{ width: "100%", height: "100%" }}
        source={require("../../assets/images/bg3.jpg")}
      >
        <View style={{ alignItems: "center", marginTop: 120 }}>
          <Text style={{ fontSize: 25, color: "black", fontWeight: "bold" }}>
            {selectedLang == 0
              ? translation[10].English
              : selectedLang == 1
              ? translation[10].Sinhala
              : null}
          </Text>
          <Image
            source={require("../../assets/images/farmer.png")}
            style={{ width: 300, height: 300 }}
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-evenly",
            marginTop: 40,
          }}
        >
          <LogInWithIcon
            iconName="leaf"
            onPress={() => navigation.navigate("Model")}
            buttonTitle={
              selectedLang == 0
                ? translation[14].English
                : selectedLang == 1
                ? translation[14].Sinhala
                : null
            }
          />
          <LogInWithIcon
            iconName="rainy"
            onPress={() => navigation.navigate("Weather")}
            buttonTitle={
              selectedLang == 0
                ? translation[12].English
                : selectedLang == 1
                ? translation[12].Sinhala
                : null
            }
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-evenly",
            marginTop: 15,
          }}
        >
          <LogInWithIcon
            iconName="chatbox-ellipses"
            onPress={() => navigation.navigate("UserSelection")}
            buttonTitle={
              selectedLang == 0
                ? translation[13].English
                : selectedLang == 1
                ? translation[13].Sinhala
                : null
            }
          />
          <LogInWithIcon
            iconName="podium-sharp"
            onPress={() => navigation.navigate("BarChart")}
            buttonTitle={
              selectedLang == 0
                ? translation[11].English
                : selectedLang == 1
                ? translation[11].Sinhala
                : null
            }
          />
        </View>
      </ImageBackground>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 20,
    color: "#333333",
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: "white",
  },
  floating: {
    marginRight: 100,
  },
});
