import Toast from "react-native-toast-message";
import AppThemedTouchableOpacity from "./app_components/AppThemedTouchableOpacity";

export interface ToasterProps {
  type: string;
  text1: string;
  text2?: string;
  title: string;
  onPress?: () => void;
}

const Toaster: React.FC<ToasterProps> = ({
  onPress,
  type,
  text1,
  text2,
  title,
}) => {
  const showToast = () => {
    Toast.show({
      type: type,
      text1: text1,
      text2: text2,
    });
  };

  const handleOnPress = () => {
    showToast();
    if (onPress) {
      onPress();
    }
  };

  return (
    <AppThemedTouchableOpacity onPress={handleOnPress}>
      {title}
    </AppThemedTouchableOpacity>
  );
};

export default Toaster;
