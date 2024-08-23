import React from "react";
import AppThemedTouchableOpacity from "./app_components/AppThemedTouchableOpacity";
import Toast from "react-native-toast-message";

export interface ToasterProps {
  type: "success" | "error" | "info" | "warning"; 
  text1: string;
  text2?: string;
  title: string;
  onPress?: () => void;
}

/**
 * Toaster component.
 * @param {ToasterProps} props - The props for the Toaster component.
 * @returns {JSX.Element} The rendered Toaster component.
 * @component
 * @example
 */
const Toaster: React.FC<ToasterProps> = ({
  onPress,
  type,
  text1,
  text2,
  title,
}) => {
  const showToast = () => {
    Toast.show({
      type,
      text1,
      text2,
    });
  };

  const handleOnPress = () => {
    showToast();
    if (onPress) {
      onPress();
    }
  };

  return (
    <AppThemedTouchableOpacity onPress={handleOnPress} accessibilityLabel={title}>
      {title}
    </AppThemedTouchableOpacity>
  );
};

export default Toaster;
