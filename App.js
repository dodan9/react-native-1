import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Sta } from "react-native";

export default function App() {
  return (
    <View style={{ flex: 1, flexDirection: "row" }}>
      {/* <Text style={styles.text1}>My first app</Text>
      <StatusBar style='auto' /> */}
      <View style={{ flex: 1, backgroundColor: "tomato" }}></View>
      <View style={{ flex: 8, backgroundColor: "teal" }}></View>
      <View style={{ flex: 1, backgroundColor: "orange" }}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text1: {
    fontSize: 40,
    color: "green",
  },
});
