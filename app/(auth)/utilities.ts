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
      text2: "Please try again.",
    });
  }
  return isValid;
};

export const validateAuthFormInputs = (
  email: string,
  password: string,
  confirmPassword: string
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
