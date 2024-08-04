import React from "react";
import { Modal } from "react-native";
import { AppThemedView } from "../app_components/AppThemedView";
import { s, ScaledSheet } from "react-native-size-matters";

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
  visible: boolean;
}

const AppModal = ({ children, onClose, visible }: ModalProps) => {
  return (
    <Modal
      animationType="slide"
      aria-label="Settings Modal"
      onRequestClose={onClose}
      transparent={true}
      visible={visible}
      role="dialog"
    >
      <AppThemedView style={styles.modalOverlay}>
        <AppThemedView style={styles.modalContent}>{children}</AppThemedView>
      </AppThemedView>
    </Modal>
  );
};

export default AppModal;

const styles = ScaledSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "90%",
    padding: s(20),
    borderRadius: s(10),
    alignItems: "center",
  },
});
