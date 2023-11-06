import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const DATA = [
  {
    id: 1,
    name: "Rice Blast",
    species: "Fungus, Magnaporthe grisea<",
    image: require("../../assets/images/RiceBlast.jpg"),
  },
  {
    id: 2,
    name: "Brown Spot",
    species: "Fungus Cochliobolus miyabeanus",
    image: require("../../assets/images/BrownSpot.jpg"),
  },
  {
    id: 3,
    name: "Leaf scald",
    species: "ungus, – Monographella albescens",
    image: require("../../assets/images/LeafScald.jpg"),
  },
  {
    id: 4,
    name: "Narrow brown leaf spot",
    species: "Fungus, Sphaerulina oryzina",
    image: require("../../assets/images/NarrowBrownSpot.jpg"),
  },
  {
    id: 5,
    name: "Bacterial Leaf Blight",
    species: "Bacteria, Xanthomonas oryzae pv. oryzae.",
    image: require("../../assets/images/blb.jpg"),
  },
];

const DiseaseListScreen = ({ navigation }) => {
  const renderPlantDisease = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.rect3}
        onPress={() => {
          navigation.navigate("DetailedScreen");
        }}
      >
        <View style={styles.rect6Row}>
          <View style={styles.rect6}>
            <Image
              source={item.image}
              resizeMode="cover"
              style={styles.plantImage}
            />
          </View>
          <View style={styles.diseaseColumn}>
            <Text style={styles.disease}>{item.name}</Text>
            <Text style={styles.agent}>{item.species}</Text>
          </View>
          <Image
            source={require("../../assets/images/next.png")}
            resizeMode="contain"
            style={styles.image4}
          />
        </View>
      </TouchableOpacity>
    );
  };

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
        <View style={styles.align}>
          <View style={styles.rect2Stack}>
            <View style={styles.rect2}></View>

            <FlatList
              data={DATA}
              contentContainerStyle={{
                paddingBottom: 100,
              }}
              renderItem={renderPlantDisease}
              keyExtractor={(item) => item.id.toString()}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </View>
        <View style={styles.align}>
          <View style={styles.image3Stack}>
            <View style={styles.rect}>
              <View style={styles.otherColumnRow}>
                <Image
                  source={require("../../assets/images/agriculture.png")}
                  resizeMode="contain"
                  style={styles.image2}
                />
              </View>
              <Text style={styles.loremIpsum}>Browse through diseases.</Text>
            </View>
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
  align: {
    alignItems: "center",
  },
  rect: {
    top: 200,
    width: 230,
    height: 114,
    position: "absolute",
    backgroundColor: "white",
    borderRadius: 15,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    elevation: 5,
    shadowOpacity: 0.16,
    shadowRadius: 10,
  },
  rect2: {
    top: 0,
    left: 0,
    width: 230,
    height: 453,
    position: "absolute",
    borderRadius: 27,
  },
  rect3: {
    top: 100,
    left: 120,
    width: 323,
    height: 99,
    backgroundColor: "white",
    borderRadius: 27,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    elevation: 5,
    shadowOpacity: 0.16,
    marginTop: 20,
    shadowRadius: 10,
  },
  rect6: {
    width: 97,
    height: 76,
    backgroundColor: "green",
    borderRadius: 12,
    marginLeft: 15,
  },
  plantImage: {
    borderRadius: 12,
    width: 97,
    height: 76,
  },
  disease: {
    color: "#0f3833",
    bottom: 7,
    fontWeight: "bold",
  },
  agent: {
    color: "#195F57",
    bottom: 3,
    marginLeft: 1,
  },

  diseaseColumn: {
    width: 137,
    marginLeft: 17,
    marginTop: 10,
    marginBottom: 2,
  },
  image4: {
    width: 29,
    height: 58,
    marginLeft: 17,
    marginTop: 10,
  },
  rect6Row: {
    height: 76,
    flexDirection: "row",
    marginTop: 11,
  },
  rect4: {
    top: 143,
    left: 135,
    width: 308,
    height: 99,
    position: "absolute",
    backgroundColor: "white",
    borderRadius: 27,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    elevation: 5,
    shadowOpacity: 0.16,
    shadowRadius: 10,
  },
  rect5: {
    top: 268,
    left: 135,
    width: 308,
    height: 99,
    position: "absolute",
    backgroundColor: "white",
    borderRadius: 27,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    elevation: 5,
    shadowOpacity: 0.16,
    shadowRadius: 10,
  },
  rect2Stack: {
    width: 450,
    height: 453,
    marginTop: 230,
    marginRight: 120,
  },

  other: {
    color: "#195F57",
    fontSize: 18,
    marginTop: -1,
    right: 25,
  },

  image2: {
    width: 71,
    height: 63,
    marginLeft: 47,
    marginTop: 1,
  },
  otherColumnRow: {
    height: 64,
    flexDirection: "row",
    marginTop: 16,
    marginLeft: 44,
    marginRight: 24,
  },
  loremIpsum: {
    color: "#195F57",
    marginTop: 4,
    marginLeft: 40,
  },
  image3Stack: {
    width: 507,
    height: 287,
    marginTop: -754,
    marginRight: -260,
  },
});
export default DiseaseListScreen;
