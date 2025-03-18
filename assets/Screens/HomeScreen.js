import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";

const HomeScreen = () => {
  const [archivo, setArchivo] = useState(null);

  const seleccionarArchivo = async () => {
    try {
      const resultado = await DocumentPicker.getDocumentAsync({ type: "*/*" });
      if (resultado.canceled) return;

      const file = resultado.assets[0];
      const fileInfo = await FileSystem.getInfoAsync(file.uri);
      if (!fileInfo.exists) {
        Alert.alert("Error", "No se pudo cargar el archivo.");
        return;
      }

      setArchivo({
        uri: file.uri,
        name: file.name,
        size: file.size,
        type: file.mimeType,
      });
    } catch (error) {
      Alert.alert("Error", "Ocurrió un problema al seleccionar el archivo.");
    }
  };

  const eliminarArchivo = () => setArchivo(null);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hi User</Text>

      <View style={styles.fileContainer}>
        {archivo ? (
          <>
            <TouchableOpacity style={styles.closeButton} onPress={eliminarArchivo}>
              <Feather name="x" size={24} color="black" />
            </TouchableOpacity>
            <Image source={{ uri: archivo.uri }} style={styles.thumbnail} />
            <Text style={styles.fileInfo}>📄 {archivo.name}</Text>
            <Text style={styles.fileInfo}>📏 {archivo.size} bytes</Text>
            <Text style={styles.fileInfo}>📂 {archivo.type}</Text>
          </>
        ) : (
          <TouchableOpacity style={styles.addButton} onPress={seleccionarArchivo}>
            <Text style={styles.addButtonText}>Añadir Archivo</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Barra de navegación */}
      <View style={styles.navBar}>
        <TouchableOpacity style={styles.navButton}>
          <MaterialIcons name="home" size={30} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <MaterialIcons name="settings" size={30} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 50,
  },
  fileContainer: {
    flex: 1,
    width: "90%",
    backgroundColor: "#ededed",
    marginTop: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    position: "relative",
  },
  addButton: {
    backgroundColor: "#6200ea",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  thumbnail: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    marginBottom: 10,
  },
  fileInfo: {
    fontSize: 16,
    color: "#333",
  },
  navBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    backgroundColor: "#ddd",
    paddingVertical: 10,
    position: "absolute",
    bottom: 0,
  },
  navButton: {
    padding: 10,
  },
});

export default HomeScreen;
