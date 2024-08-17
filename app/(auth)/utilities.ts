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
 * Validates the input for the authentication form.
 * @param email The email address to validate.
 * @param password The password to validate.
 * @param confirmPassword The password confirmation to validate.
 * @returns An object with the validation result.
 */
export const validateAuthFormInput = (
  email: string,
  password: string,
  confirmPassword: string = ""
) => {
  if (!isValidEmail(email)) {
    throw new Error("Invalid email");
  }
  if (!isValidPassword(password)) {
    throw new Error("Invalid password");
  }
  if (confirmPassword !== "" && !isValidPassword(confirmPassword)) {
    throw new Error("Invalid password confirmation");
  }
  return {
    isValid: true,
  };
};
