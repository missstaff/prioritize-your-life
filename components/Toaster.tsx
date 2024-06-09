import React from "react";
import Toast from "react-native-toast-message";
import { Button } from "react-native";
import { type ToasterProps } from "../app/types";

/**
 * A component that renders a toast message.
 */
const Toaster: React.FC<ToasterProps> = ({ type, text1, text2, title }) => {
  const showToast = () => {
    Toast.show({
      type: type,
      text1: text1,
      text2: text2
    });
  };

  {/*#TODO: Implement a styled component for the button.*/ }
  return (
    <Button
      title={title}
      onPress={showToast}
    />
  )
};

export default Toaster;
