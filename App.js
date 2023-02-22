import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ScrollView, Dimensions } from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>Seoul</Text>
      </View>
      <ScrollView
        horizontal //가로 정렬
        pagingEnabled //페이지네이션으로 하나씩 스크롤
        showsHorizontalScrollIndicator={false} //스크롤바 숨김
        contentContainerStyle={styles.weather} //scrollview는 style로는 작동하지 않음
      >
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sun</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sun</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sun</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sun</Text>
        </View>
      </ScrollView>

      <StatusBar style='light' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#487242",
  },
  city: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cityName: {
    fontSize: 68,
    fontWeight: "600",
    color: "white",
  },
  weather: {},
  day: {
    width: SCREEN_WIDTH,
    alignItems: "center",
  },
  temp: {
    marginTop: 50,
    color: "white",
    fontSize: 178,
  },
  description: {
    marginTop: -30,
    fontSize: 60,
    color: "white",
  },
});
