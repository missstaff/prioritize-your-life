import {
  handleResetPassword,
  handleSignIn,
  handleSignUp,
  logout,
} from "../../apis/api";
import { getFirebase } from "@/app/common/get-firebase";
import { isValidEmail, isValidPassword } from "../../utilities";
import { router } from "expo-router";

jest.mock("@/app/common/get-firebase", () => ({
  getFirebase: jest.fn(),
}));

jest.mock("../../utilities", () => ({
  isValidEmail: jest.fn(),
  isValidPassword: jest.fn(),
}));

jest.mock("expo-router", () => ({
  router: {
    push: jest.fn(),
  },
}));

describe("Authentication Functions", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("handleResetPassword", () => {
    it("throws an error if email is empty", async () => {
      await expect(handleResetPassword({ email: "" })).rejects.toThrow(
        "Email is required."
      );
    });

    it("throws an error if email is invalid", async () => {
      (isValidEmail as jest.Mock).mockReturnValue(false);
      await expect(
        handleResetPassword({ email: "invalid-email" })
      ).rejects.toThrow("Invalid email address.");
    });

    it("calls sendPasswordResetEmail with the correct email", async () => {
      const mockFirebase = {
        auth: jest.fn().mockReturnValue({
          sendPasswordResetEmail: jest.fn(),
        }),
      };
      (getFirebase as jest.Mock).mockResolvedValue(mockFirebase);
      (isValidEmail as jest.Mock).mockReturnValue(true);

      await handleResetPassword({ email: "test@example.com" });

      expect(mockFirebase.auth().sendPasswordResetEmail).toHaveBeenCalledWith(
        "test@example.com"
      );
    });

    // it("throws an error if there is an issue resetting the password", async () => {
    //    #TODO: Write this test
  });

  describe("handleSignIn", () => {
    it("throws an error if email is missing", async () => {
      await expect(
        handleSignIn({ email: "", password: "password" })
      ).rejects.toThrow("Email is required.");
    });

    it("throws an error if password is missing", async () => {
      await expect(
        handleSignIn({ email: "test@example.com", password: "" })
      ).rejects.toThrow("Password is required.");
    });

    it("returns user UID on successful sign in", async () => {
      const mockFirebase = {
        auth: jest.fn().mockReturnValue({
          signInWithEmailAndPassword: jest
            .fn()
            .mockResolvedValue({ user: { uid: "user123" } }),
        }),
      };
      (getFirebase as jest.Mock).mockResolvedValue(mockFirebase);

      const uid = await handleSignIn({
        email: "test@example.com",
        password: "password",
      });

      expect(uid).toBe("user123");
    });

    it("throws an error if there is an issue signing in", async () => {
      const mockFirebase = {
        auth: jest.fn().mockReturnValue({
          signInWithEmailAndPassword: jest
            .fn()
            .mockRejectedValue(new Error("Auth error")),
        }),
      };
      (getFirebase as jest.Mock).mockResolvedValue(mockFirebase);

      await expect(
        handleSignIn({ email: "test@example.com", password: "password" })
      ).rejects.toThrow("Error signing in.Auth error");
    });
  });

  describe("handleSignUp", () => {
    it("throws an error if email is missing", async () => {
      await expect(
        handleSignUp({
          email: "",
          password: "password",
          confirmPassword: "password",
        })
      ).rejects.toThrow("Email is required.");
    });

    it("throws an error if email is invalid", async () => {
      (isValidEmail as jest.Mock).mockReturnValue(false);
      await expect(
        handleSignUp({
          email: "invalid-email",
          password: "password",
          confirmPassword: "password",
        })
      ).rejects.toThrow("Invalid email address.");
    });

    // it("throws an error if password is missing", async () => {
    //     #TODO: Write this test
    // });

    // it("throws an error if passwords do not match", async () => {
    //    #TODO: Write this test
    // });

    // it("throws an error if password is invalid", async () => {
    //    #TODO: Write this test
    // });

    it("returns user UID on successful sign up", async () => {
      const mockFirebase = {
        auth: jest.fn().mockReturnValue({
          createUserWithEmailAndPassword: jest
            .fn()
            .mockResolvedValue({ user: { uid: "user123" } }),
        }),
      };
      (getFirebase as jest.Mock).mockResolvedValue(mockFirebase);
      (isValidEmail as jest.Mock).mockReturnValue(true);
      (isValidPassword as jest.Mock).mockReturnValue(true);

      const uid = await handleSignUp({
        email: "test@example.com",
        password: "password",
        confirmPassword: "password",
      });

      expect(uid).toBe("user123");
    });

    it("throws an error if there is an issue signing up", async () => {
      const mockFirebase = {
        auth: jest.fn().mockReturnValue({
          createUserWithEmailAndPassword: jest
            .fn()
            .mockRejectedValue(new Error("Auth error")),
        }),
      };
      (getFirebase as jest.Mock).mockResolvedValue(mockFirebase);
      (isValidEmail as jest.Mock).mockReturnValue(true);
      (isValidPassword as jest.Mock).mockReturnValue(true);

      await expect(
        handleSignUp({
          email: "test@example.com",
          password: "password",
          confirmPassword: "password",
        })
      ).rejects.toThrow("Error signing up.Auth error");
    });
  });

  describe("logout", () => {
    it("calls signOut and resets state", async () => {
      const mockSetIsVisible = jest.fn();
      const mockSetIsAuthenticated = jest.fn();
      const mockSetUid = jest.fn();
      const mockFirebase = {
        auth: jest.fn().mockReturnValue({
          signOut: jest.fn(),
        }),
      };
      (getFirebase as jest.Mock).mockResolvedValue(mockFirebase);

      await logout(mockSetIsVisible, mockSetIsAuthenticated, mockSetUid);

      expect(mockFirebase.auth().signOut).toHaveBeenCalled();
      expect(mockSetIsVisible).toHaveBeenCalledWith(false);
      expect(mockSetIsAuthenticated).toHaveBeenCalledWith(false);
      expect(mockSetUid).toHaveBeenCalledWith("");
      expect(router.push).toHaveBeenCalledWith("/");
    });

    it("throws an error if firebase is not initialized", async () => {
      (getFirebase as jest.Mock).mockResolvedValue(null);

      await expect(logout(jest.fn(), jest.fn(), jest.fn())).rejects.toThrow(
        "Firebase app not initialized"
      );
    });

    it("throws an error if there is an issue logging out", async () => {
      const mockSetIsVisible = jest.fn();
      const mockSetIsAuthenticated = jest.fn();
      const mockSetUid = jest.fn();
      const mockFirebase = {
        auth: jest.fn().mockReturnValue({
          signOut: jest.fn().mockRejectedValue(new Error("Logout error")),
        }),
      };
      (getFirebase as jest.Mock).mockResolvedValue(mockFirebase);

      await expect(
        logout(mockSetIsVisible, mockSetIsAuthenticated, mockSetUid)
      ).rejects.toThrow("Error logging outLogout error");
    });
  });
});
