export const isValidEmail = (email: string) => {
  const isValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
    email
  );
  if (!isValid) {
    alert("Invalid email address");
  }
  return isValid;
};

export const isValidPassword = (password: string) => {
  const isValid =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/.test(
      password
    );
  if (!isValid) {
    alert(
      "Password must contain at least 12 characters, one uppercase, one lowercase, one number, and one special character"
    );
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
  if (confirmPassword != "" && confirmPassword !== password) {
    alert("Passwords do not match");
  }
  return true;
};
