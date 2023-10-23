import { View, Text, SafeAreaView, TextInput, StyleSheet } from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import DropDownPicker from "react-native-dropdown-picker";

const HarvestScreen = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Yala", value: "yala" },
    { label: "Maha", value: "maha" },
  ]);

  return (
    <SafeAreaView>
      {/* <LinearGradient
        colors={["#FFFEFE", "#FFFEFE", "#99ff99"]}
        style={{ width: "100%", height: "100%" }}
      /> */}
      <TextInput
        placeholder="Year"
        // value={}
        // onChangeText={(text) => setEmail(text)}
        style={styles.yearinput}
      />
      <DropDownPicker
        placeholder="Select the Season"
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  yearinput: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    fontSize: 14,
    color: "#000000",
    borderRadius: 20,
    backgroundColor: "#ffffff",
    borderColor: "black",
    borderWidth: 2,
  },
});
export default HarvestScreen;
