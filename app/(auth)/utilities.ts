// Purpose: Contains utility functions for the auth module.
import Toast from "react-native-toast-message";

export const isValidEmail = (email: string) => {
  const isValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
    email
  );
  if (!isValid) {
    Toast.show({
      type: "error",
      text1: "Invalid email address",
    });
  }
  return isValid;
};

export const isValidPassword = (password: string) => {
  const isValid =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/.test(
      password
    );
  if (!isValid) {
    Toast.show({
      type: "error",
      text1: "Invalid password.",
      text2:"Please try again.",
    });
  }
  return isValid;
};

export const validateFormInput = (
  email: string,
  password: string,
  confirmPassword: string = ""
) => {
  if (!isValidEmail(email)) return false;
  if (!isValidPassword(password)) return false;
  if (confirmPassword != "" && password != "" && confirmPassword !== password) {
    Toast.show({
      type: "error",
      text1: "Passwords do not match.",
      text2:"Please try again.",
    });
    return false;
  }
  return true;
};
