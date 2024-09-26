import React from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MainButton from "./buttons/MainButton";

const ModalAllThemes = ({ modalVisible, onClose }) => {
  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>Tu possède déjà tous les thèmes!</Text>
          <MainButton onPress={onClose} buttonTitle="OK" />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 22,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    borderColor: "rgba(0, 0, 0, 0.1)",
    marginHorizontal: 5,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 12,
    fontFamily: "LeagueSpartan",
  },
  closeButton: {
    backgroundColor: "#1582F8",
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 8,
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
  },
});

export default ModalAllThemes;
