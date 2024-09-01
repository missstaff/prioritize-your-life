import { Modal } from "react-native";
import { ScaledSheet, s } from "react-native-size-matters";
import AppThemedView  from "../app_components/AppThemedView";

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
  visible: boolean;
}

/**
 * AppModal component.
 * @param {Object} props - The component props.
 * @param {ReactNode} props.children - The content of the modal.
 * @param {Function} props.onClose - The function to be called when the modal is closed.
 * @param {boolean} props.visible - Determines whether the modal is visible or not.
 * @returns {JSX.Element} The rendered AppModal component.
 */
const AppModal = ({ children, onClose, visible }: ModalProps) => {
  return (
    <Modal
      animationType="slide"
      aria-label="Settings Modal"
      onRequestClose={() => onClose()}
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
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    flex: 1,
    justifyContent: "center",
  },
  modalContent: {
    alignItems: "center",
    borderRadius: s(10),
    padding: s(20),
    width: "90%",
  },
});
