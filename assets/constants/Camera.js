import React, { useState,useEffect,useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import * as MediaLibrary from "expo-media-library";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import Loader from "./Loader";
import Modal from "react-native-modal";
import { manipulateAsync, resize } from "expo-image-manipulator";
import { Camera } from "expo-camera";

const CameraSet = ({ navigation }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [image, setImage] = useState(null);
  const type = Camera.Constants.back;
  const cameraRef = useRef(null);

  // Handle checking permissions for both camera and gallery
  useEffect(() => {
    (async () => {
      MediaLibrary.requestPermissionsAsync();
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === "granted");
    })();
  }, []);

  if (hasCameraPermission === false) {
    return <Text>No Camera Access</Text>;
  }

  const handlePermissions = async () => {
    const { status } = await MediaLibrary.getPermissionsAsync();
    if (status !== "granted") {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Camera and Gallery Permissions Required",
          "Please grant camera and gallery permissions to access your photos and take pictures."
        );
        return;
      }
    }
  };

  // Handle taking a picture from the camera
  const pickFromCamera = async () => {
    setIsVisible(false);
    await handlePermissions();
    try {
      const result = await ImagePicker.launchCameraAsync({
              allowsEditing: true,
              aspect: [4, 3],
              quality: 1,
            });
            if (!result.canceled && result.assets && result.assets.length > 0) {
              const manipResult = await manipulateAsync(result.assets[0].uri, [
                { resize: { width: 1024, height: 768 } },
              ]);
        
    
            setImage(manipResult.uri);
            navigation.navigate("PredScreen", {
              imgUri: manipResult.uri,
            });
          }}
           catch (error) {
            console.log("error ", error);
          }
  };
 

  const getGalleryImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
      });

      const img = result.assets[0].uri;

      if (!result.canceled) {
        const manipResult = await manipulateAsync(img, [
          {
            resize: { width: 224, height: 224 },
          },
        ]);

        setImage(manipResult.uri);

        navigation.navigate("PredScreen", {
          imgUri: manipResult.uri,
          //base64Img: base64Image,
        });
      }
    } catch (error) {
      console.log("error ", error);
    }
  };

  // Handle uploading the selected image to Cloudinary
  const onUpload = async (image) => {
    setIsLoading(true);
    const data = new FormData();
    data.append("file", image);
    // data.append("upload_preset", "plantsApp");
    // data.append("cloud_name", "dark123");

    try {
      const response = await axios.post(
        `https://us-central1-kethbima-406316.cloudfunctions.net/predict34`,
        data
      );
      if (response) {
        setIsLoading(false);
        console.log(response.data);
        //props.navigation.navigate("PredictionScreen");
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  // Show the modal to choose between camera or gallery
  const onShowModal = () => {
    setIsVisible(true);
  };
  return (
    <View style={styles.rect5Stack}>
      <Loader isLoading={isLoading} />
      <TouchableOpacity
        style={styles.rect5}
        onPress={() => {
          // this.props.navigation.navigate('PredictionScreen');
          onShowModal();
        }}
      >
        <Text style={styles.takeAPicture}>Take a Picture</Text>
      </TouchableOpacity>

      <Image
        source={require("../../assets/images/photography.png")}
        resizeMode="contain"
        style={styles.image8}
      ></Image>
      <Modal isVisible={isVisible} onBackdropPress={() => setIsVisible(false)}>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <View style={styles.modalView}>
            <Text style={styles.modalHeader}>Choose</Text>
            <View style={styles.modalBody}>
              <TouchableOpacity onPress={pickFromCamera}>
                <Image
                  source={require("../../assets/images/photo.png")}
                  resizeMode="contain"
                  style={styles.modalImage1}
                ></Image>
              </TouchableOpacity>
              <TouchableOpacity onPress={getGalleryImage}>
                <Image
                  source={require("../../assets/images/memories.png")}
                  resizeMode="contain"
                  style={styles.modalImage2}
                ></Image>
              </TouchableOpacity>
            </View>
            <View style={styles.cameraRow}>
              <Text style={styles.camera}>Camera</Text>
              <Text style={styles.gallery}>Gallery</Text>
            </View>
            <TouchableOpacity
              onPress={() => this.setState({ isVisible: false })}
            >
              <Text style={styles.modalCancel}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  rect5Stack: {
    width: 201,
    height: 44,
    marginTop: 40,
    marginLeft: 19,
  },
  rect5: {
    top: 8,
    left: 0,
    width: 201,
    height: 43,
    position: "absolute",
    backgroundColor: "#195F57",
    borderRadius: 56,
  },
  takeAPicture: {
    color: "rgba(255,255,255,1)",
    fontSize: 14,
    marginTop: 13,
    marginLeft: 84,
  },
  image8: {
    top: 8,
    left: 25,
    width: 35,
    height: 42,
    position: "absolute",
  },
  modalView: {
    width: 239,
    height: 157,
    backgroundColor: "white",
    borderRadius: 17,

    alignSelf: "center",
  },
  modalHeader: {
    color: "#121212",
    fontSize: 18,
    marginTop: 12,
    marginLeft: 14,
  },
  modalBody: {
    height: 30,
    flexDirection: "row",
    marginTop: 21,
    marginLeft: 55,
    marginRight: 54,
  },
  modalImage1: {
    width: 50,
    height: 50,
    bottom: 9,
    right: 10,
  },
  modalImage2: {
    width: 50,
    height: 50,
    marginLeft: 40,
    bottom: 10,
  },
  cameraRow: {
    height: 17,
    flexDirection: "row",
    marginTop: 7,
    marginLeft: 45,
    marginRight: 48,
  },
  camera: {
    color: "#121212",
    top: 5,
    left: 2,
  },
  gallery: {
    color: "#121212",
    marginLeft: 59,
    top: 5,
  },
  modalCancel: {
    color: "red",
    marginTop: 20,
    marginLeft: 180,
  },
  container: {
    flex: 1,
    justifyContent: "center",
  },
  camera: {
    flex: 1,
  },
});
export default CameraSet;
