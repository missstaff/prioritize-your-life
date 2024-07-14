import React from "react";
import { Modal, StyleSheet } from "react-native";
import { AppThemedView } from "./app_components/AppThemedView";

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const SettingsModal = ({ visible, onClose, children }: ModalProps) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <AppThemedView style={styles.modalOverlay}>
        <AppThemedView style={styles.modalContent}>{children}</AppThemedView>
      </AppThemedView>
    </Modal>
  );
};

export default SettingsModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    // backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
});
