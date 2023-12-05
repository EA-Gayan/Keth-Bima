import React, { Component, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CameraSet from "../../assets/constants/Camera";
import { useRoute } from "@react-navigation/native";

const ModelScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
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
        <View style={{ alignItems: "center", marginTop: 100 }}>
          <Text style={styles.title}>Identification</Text>
        </View>
        <View style={styles.rect2StackStack}>
          <View style={styles.rect2Stack}>
            <View style={styles.rect}>
              <Text style={styles.loremIpsum}>Its very Simple!</Text>
              <View style={styles.rect7}>
                <View style={styles.pointColumnRow}>
                  <View style={styles.pointColumn}>
                    <Text style={styles.point}>✓ Open camera</Text>
                    <Text style={styles.point}>✓ Capture affcted leaf</Text>
                    <Text style={styles.point}>✓ Upload it</Text>
                    <Text style={styles.point}>✓ You get it</Text>
                  </View>
                </View>
              </View>
              <View style={styles.rect4}>
                <Text style={styles.healYourCrop}>Identify Disease Here!</Text>
                <View style={styles.image3Row}>
                  <Image
                    source={require("../../assets/images/qr.png")}
                    resizeMode="contain"
                    style={styles.image3}
                  ></Image>
                  <Image
                    source={require("../../assets/images/next.png")}
                    resizeMode="contain"
                    style={styles.image6}
                  ></Image>
                  <Image
                    source={require("../../assets/images/paper.png")}
                    resizeMode="contain"
                    style={styles.image4}
                  ></Image>
                </View>
                <CameraSet navigation={navigation} />
              </View>
            </View>
            <Image
              source={require("../../assets/animation/Animation.gif")}
              resizeMode="contain"
              style={styles.image2}
            ></Image>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 25,
    color: "black",
    fontWeight: "bold",
  },
  rect2: {
    top: -40,
    left: 110,
    height: 350,
    position: "absolute",
  },

  rect: {
    top: 90,
    width: 278,
    height: 550,
    position: "absolute",
    backgroundColor: "#ffffff",
    borderRadius: 35,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    elevation: 7,
    shadowOpacity: 1,
    shadowRadius: 4,
    left: 28,
  },
  loremIpsum: {
    color: "#195F57",
    fontSize: 20,
    marginTop: 19,
    marginLeft: 24,
  },
  rect4: {
    width: 238,
    height: 250,
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 27,
    marginTop: 45,
    marginLeft: 20,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    elevation: 5,
    shadowOpacity: 0.16,
    shadowRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  healYourCrop: {
    color: "#195F57",
    fontSize: 18,
    marginTop: 14,
  },
  point: {
    fontSize: 15,
    lineHeight: 30,
  },
  image3: {
    width: 38,
    height: 39,
    marginTop: 11,
  },
  image6: {
    width: 16,
    height: 34,
    marginLeft: 12,
    marginTop: 14,
  },
  image4: {
    width: 48,
    height: 48,
    marginLeft: 7,
    marginTop: 3,
  },
  image3Row: {
    height: 53,
    flexDirection: "row",
    marginTop: 27,
    marginLeft: 31,
    marginRight: 20,
  },

  rect7: {
    width: 238,
    height: 160,
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 27,
    marginTop: 17,
    marginLeft: 22,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    elevation: 5,
    shadowOpacity: 0.16,
    shadowRadius: 10,
  },

  pointColumn: {
    width: "100%",
    marginTop: 4,
  },
  image9: {
    width: 78,
    height: 71,
    marginLeft: 46,
  },
  pointColumnRow: {
    height: 72,
    flexDirection: "row",
    marginTop: 14,
    marginLeft: 14,
    marginRight: 16,
  },

  image2: {
    marginTop: 600,
    left: 240,
    width: 131,
    height: 155,
    position: "absolute",
  },

  rect2Stack: {
    top: 0,
    left: 57,
    width: 502,
    height: 647,
    position: "absolute",
  },
  rect3: {
    top: 447,
    left: 0,
    width: 273,
    height: 245,
    position: "absolute",
  },
  rect2StackStack: {
    width: 659,
    height: 692,
    right: 20,
    marginTop: -40,
  },
});
export default ModelScreen;
