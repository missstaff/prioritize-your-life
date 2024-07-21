// Purpose: Contains utility functions for the auth module.
import Toast from "react-native-toast-message";

/**
 * Validates an email address.
 * @param email The email address to validate.
 * @returns True if the email is valid, false otherwise.
 */
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

/**
 * Validates a password.
 * @param password The password to validate.
 * @returns True if the password is valid, false otherwise.
 */
export const isValidPassword = (password: string) => {
  const isValid =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/.test(
      password
    );
  if (!isValid) {
    Toast.show({
      type: "error",
      text1: "Invalid password.",
      text2: "Please try again.",
    });
  }
  return isValid;
};

/**
 * Validates an email and password.
 * @param email The email to validate.
 * @param password The password to validate.
 * @returns True if the email and password are valid, false otherwise.
 */
export const isEmailAndPasswordValid = (email: string, password: string) => {
  if (!isValidEmail(email) && !isValidPassword(password)) {
    Toast.show({
      type: "error",
      text1: "Invalid email and password.",
      text2: "Please try again.",
    });
    return false;
  }
  return true;
};

/**
 * Validates the form input.
 * @param email The email to validate.
 * @param password The password to validate.
 * @param confirmPassword The password confirmation to validate.
 * @returns True if the form input is valid, false otherwise.
  */
export const validateFormInput = (
  email: string,
  password: string,
  confirmPassword: string = ""
) => {
  if (!isEmailAndPasswordValid(email, password)) return false;
  if (!isValidEmail(email)) return false;
  if (!isValidPassword(password)) return false;
  if (confirmPassword != "" && password != "" && confirmPassword !== password) {
    Toast.show({
      type: "error",
      text1: "Passwords do not match.",
      text2: "Please try again.",
    });
    return false;
  }
  return true;
};
