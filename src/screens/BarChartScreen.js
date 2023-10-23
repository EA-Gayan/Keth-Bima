import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { DB } from "../../firebaseInit";
import { collection, doc, getDocs } from "firebase/firestore";

const BarChartScreen = () => {
  const [harvData, setHarvData] = useState("");

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    console.log(harvData);
  }, [harvData]);

  const getData = () => {
    const harvDataCollectionRef = collection(DB, "harvesting");
    getDocs(harvDataCollectionRef)
      .then((response) => {
        const harData = response.docs.map((doc) => ({
          data: doc.data(),
          id: doc.id,
        }));
        setHarvData(harData);
      })
      .catch((error) => console.log(error));
  };
  return (
    <View>
      <Text>BarChartScreen</Text>
    </View>
  );
};

export default BarChartScreen;
