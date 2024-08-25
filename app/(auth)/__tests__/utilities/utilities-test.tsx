import {
  isValidEmail,
  isValidPassword,
  validateAuthFormInput,
} from "../../utilities";

describe("isValidEmail", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  it("should return true for a valid email address", () => {
    expect(isValidEmail("test@example.com")).toBe(true);
  });

  it("should return false for an invalid email address", () => {
    expect(isValidEmail("invalid_email")).toBe(false);
  });
});

describe("isValidPassword", () => {
  it("should return true for a valid password", () => {
    expect(isValidPassword("Password123!")).toBe(true);
  });

  it("should return false for an invalid password", () => {
    expect(isValidPassword("weakpassword")).toBe(false);
  });
});

describe("validateAuthFormInput", () => {
  it("should throw an error for an invalid email", () => {
    expect(() => {
      validateAuthFormInput("invalid_email", "Password123!");
    }).toThrow("Invalid email");
  });

  it("should throw an error for an invalid password", () => {
    expect(() => {
      validateAuthFormInput("test@example.com", "weakpassword");
    }).toThrow("Invalid password");
  });

  it("should throw an error for an invalid password confirmation", () => {
    expect(() => {
      validateAuthFormInput("test@example.com", "Password123!", "weakpassword");
    }).toThrow("Invalid password confirmation");
  });

  it("should return an object with isValid set to true for valid input", () => {
    expect(validateAuthFormInput("test@example.com", "Password123!")).toEqual({
      isValid: true,
    });
  });
});
