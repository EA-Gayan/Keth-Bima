import react, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import axios from 'axios';
import Loader from './Loader'
import Modal from 'react-native-modal';

const Camera = (props) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const pickFromGallery = async () => {
    setIsVisible(false);
    const { granted } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (granted) {
      let data = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1 // 1 means high quality
      });
      if (!data.canceled) {
        let newFile = {
          uri: data.uri,
          type: `test/${data.uri.split('.')[1]}`,
          name: `test.${data.uri.split('.')[1]}`
        };
        onUpload(newFile);
      }
    } else {
      Alert.alert('You need to give permissions');
    }
  };

  const pickFromCamera = async () => {
    setIsVisible(false);
    const { granted } = await Permissions.askAsync(Permissions.CAMERA);
    if (granted) {
      let data = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1 
      });
      if (!data.canceled) {
        let newFile = {
          uri: data.uri,
          type: `test/${data.uri.split('.')[1]}`,
          name: `test.${data.uri.split('.')[1]}`
        };
        onUpload(newFile);
      }
    } else {
      Alert.alert('You need to give permissions');
    }
  };

  const onUpload = async (image) => {
    const data = new FormData();
    data.append('file', image);
    data.append('upload_preset', 'plantsApp');
    data.append('cloud_name', 'dark123');

    try {
      setIsLoading(true);
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/dark123/image/upload`,
        data
      );
      if (response) {
        setIsLoading(false);
        console.log(response.data);
        props.navigation.navigate('PredictionScreen');
      }
    } catch (err) {
      console.log(err.message);
    }
  };

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
          source={require('../../assets/images/photography.png')}
          resizeMode='contain'
          style={styles.image8}
        ></Image>
      <Modal
        isVisible={isVisible}
        onBackdropPress={() => setIsVisible(false)}
      >
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              alignContent: 'center'
            }}
          >
            <View style={styles.modalView}>
              <Text style={styles.modalHeader}>Choose</Text>
              <View style={styles.modalBody}>
                <TouchableOpacity onPress={pickFromCamera}>
                  <Image
                    source={require('../../assets/images/photo.png')}
                    resizeMode='contain'
                    style={styles.modalImage1}
                  ></Image>
                </TouchableOpacity>
                <TouchableOpacity onPress={pickFromGallery}>
                  <Image
                    source={require('../../assets/images/memories.png')}
                    resizeMode='contain'
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
}

const styles = StyleSheet.create({
  rect5Stack: {
    width: 201,
    height: 44,
    marginTop: 40,
    marginLeft: 19
  },
  rect5: {
    top: 8 ,
    left: 0,
    width: 201,
    height: 43,
    position: 'absolute',
    backgroundColor: '#195F57',
    borderRadius: 56
  },
  takeAPicture: {
    color: 'rgba(255,255,255,1)',
    fontSize: 14,
    marginTop: 13,
    marginLeft: 84
  },
  image8: {
    top: 8,
    left: 25,
    width: 35,
    height: 42,
    position: 'absolute'
  },
  modalView: {
    width: 239,
    height: 157,
    backgroundColor: 'white',
    borderRadius: 17,

    alignSelf: 'center'
  },
  modalHeader: {
    color: '#121212',
    fontSize: 18,
    marginTop: 12,
    marginLeft: 14
  },
  modalBody: {
    height: 30,
    flexDirection: 'row',
    marginTop: 21,
    marginLeft: 55,
    marginRight: 54
  },
  modalImage1: {
    width: 50,
    height: 50,
    bottom: 9,
    right: 10
  },
  modalImage2: {
    width: 50,
    height: 50,
    marginLeft: 40,
    bottom: 10
  },
  cameraRow: {
    height: 17,
    flexDirection: 'row',
    marginTop: 7,
    marginLeft: 45,
    marginRight: 48
  },
  camera: {
    color: '#121212',
    top: 5,
    left: 2
  },
  gallery: {
    color: '#121212',
    marginLeft: 59,
    top: 5
  },
  modalCancel: {
    color: 'red',
    marginTop: 20,
    marginLeft: 180
  }
});
export default Camera;
