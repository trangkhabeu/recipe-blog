import { View, Text, SafeAreaView, StyleSheet, ScrollView } from "react-native";
export default function discover() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.headingText}>Explore the food world !</Text>
        <View></View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  headingText: {
    fontSize: 28,
    fontWeight: "800",
    marginTop: 30,
  },
});
