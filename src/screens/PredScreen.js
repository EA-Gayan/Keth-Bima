import React, { Component, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  Button,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import Loader from "../../assets/constants/Loader";
import axios from "axios";

const PredScreen = ({ navigation }) => {
  const route = useRoute();
  const [imageUri, setImageUri] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    //console.log("route.params: ",route.params.imgUri);
    if (route.params) {
      setImageUri(route.params.imgUri);
      //setBase64Image(route.params.base64Img);
    }
  }, [route.params, imageUri]);

  const CallPredictionAPI = async () => {
    //console.log("CallPredictionAPI");
    setIsLoading(true);
    try {
      // Convert the image file to a FormData object
      const formData = new FormData();
      formData.append("file", {
        name: "image.jpg",
        type: "image/jpg",
        uri: route.params.imgUri,
      });

      // Make the API call
      const response = await axios
        .post(
          "https://us-central1-kethbima-406316.cloudfunctions.net/predict34",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .catch((error) => {
          console.error(error.message);
          console.log(error.response.data);
          setIsLoading(false);
        })
        .finally(() => {
          setIsLoading(false);
        });

      // Process the response data her
      console.log(response.data);
      setResult(response.data);
    } catch (error) {
      // Handle errors
      //console.error(error);
    }
  };
  if (result != null) {
    if (result.class === "Healthy") {
      navigation.navigate("Healthy", {
        confidence: result.confidence,
        class: result.class,
      });
    } else if (result.class === "Brown Spot") {
      navigation.navigate("BrownSpot", {
        confidence: result.confidence,
        class: result.class,
      });
    } else if (result.class === "Rice Hispa") {
      navigation.navigate("Hispa", {
        confidence: result.confidence,
        class: result.class,
      });
    } else if (result.class === "Leaf Blast") {
      navigation.navigate("LeafBlast", {
        confidence: result.confidence,
        class: result.class,
      });
    } else if (result.class === "Bacterial Leaf Blight") {
      navigation.navigate("LeafBlight", {
        confidence: result.confidence,
        class: result.class,
      });
    } else if (result.class === "Leaf scald") {
      navigation.navigate("LeafScald", {
        confidence: result.confidence,
        class: result.class,
      });
    }
  }
  // } else {
  //   navigation.navigate("Healthy");
  // }

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
              {imageUri ? (
                <View style={styles.rect4}>
                  <Text style={styles.healYourCrop}>Image Preview</Text>
                  <Image source={{ uri: imageUri }} style={styles.image4} />

                  <TouchableOpacity
                    style={styles.buttonUpload}
                    onPress={CallPredictionAPI}
                  >
                    <Text style={{ color: "white" }}>Predict Disease</Text>
                    <Loader isLoading={isLoading} />
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={styles.rect4}>
                  <Text style={styles.healYourCrop}>
                    No Image Preview Availble
                  </Text>
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
                </View>
              )}
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
    height: 290,
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 27,
    marginTop: 25,
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
    fontSize: 20,
    marginTop: 14,
    marginBottom: 18,
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
    width: 175,
    height: 150,
    marginLeft: 7,
    marginBottom: 20,
  },
  image3Row: {
    height: 53,
    flexDirection: "row",
    marginTop: 27,
    marginLeft: 31,
    marginRight: 20,
  },
  buttonUpload: {
    width: 150,
    height: 40,
    backgroundColor: "#195F57",
    borderRadius: 56,
    alignItems: "center",
    justifyContent: "center",
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
    marginTop: 50,
    right: 20,
  },
});
export default PredScreen;
