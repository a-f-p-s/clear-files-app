import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

const LoadScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("Home"); // Cambia a la pantalla Home después de 3 segundos
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Free medata, privacy user</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
  },
});

export default LoadScreen;
