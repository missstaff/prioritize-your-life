import { IsValidProps } from "@/app/types";
import Toast from "react-native-toast-message";


/**
 * Formats a Firestore Timestamp to a short date string (MM/DD).
 * @param timestamp The Firestore Timestamp to format.
 * @returns A formatted date string in MM/DD/YY format.
 */
export const formatDate = (timestamp: any): string => {
  const date = timestamp.toDate();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const year = String(date.getFullYear()).slice(2);
  return `${month}/${day}/${year}`;
};

/**
 * Validates the date to ensure it is in the format MM-DD-YY.
 * @param date The date string to validate.
 * @returns `true` if the date is valid, otherwise `false`.
 */
export const isValidDate = (date: string): IsValidProps => {
  if (date.length === 0) {
    Toast.show({
      type: "error",
      text1: "Please enter a date.",
    });
    return { isValid: false, message: "Please enter a date." };
  }
  if (date.includes("-")) {
    date = date.replace(/-/g, "/");
  } else if (date.length === 6) {

    date = `${date.slice(0, 2)}/${date.slice(2, 4)}/${date.slice(4)}`;
  }

  const regex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{2}$/;
  const isValid = regex.test(date);

  if (!isValid) {
    Toast.show({
      type: "error",
      text1: "Invalid date.",
      text2: "Date must be in MM/DD/YY format.",
    });
    return { isValid: false, message: "Date must be in MM/DD/YY format.", };
  }

  const [month, day, year] = date.split("/").map(Number);
  const currentYear = new Date().getFullYear();
  const formattedYear = Number(`${currentYear.toString().slice(0, 2)}${year}`);

  if (formattedYear < currentYear) {
    Toast.show({
      type: "error",
      text1: "Invalid year.",
      text2: "Year cannot be less than the current year.",
    });
    return { isValid: false, message: "Year cannot be less than the current year." };
  }

  return { isValid: true, message: "" };
};
/**
 * Validates the description to ensure it is a string with no more than 50 characters.
 * @param description The description string to validate.
 * @returns `true` if the description is valid, otherwise `false`.
 */
export const isValidDescription = (description: string): IsValidProps => {
  const isValid = description.length > 0
  if (!isValid) {
      Toast.show({
        type: "error",
        text1: "A description is required",
        text2: "Please try again.",
      });
    return { isValid: false, message: "A description is required" };
  }
  return { isValid: true, message: "" };
};

/**
 * Validates the amount to ensure it is a string representing a number greater than 0.
 * @param amount The amount string to validate.
 * @returns `true` if the amount is valid, otherwise `false`.
 */
export const isValidAmount = (amount: string): IsValidProps => {
  const regex = /^-?\d+(\.\d+)?$/;
  const isValid = regex.test(amount);
  if (!isValid) {
    Toast.show({
      type: "error",
      text1: "Invalid entry.",
      text2: "Please enter a valid number.",
    });
    return { isValid: false, message: "Please enter a valid number." };
  }
  return { isValid: true, message: "" };
};


/**
 * Validates the form inputs to ensure they are valid.
 * @param amount The amount string to validate.
 * @param date The date string to validate.
 * @param description The description string to validate.
 * @returns `true` if the inputs are valid, otherwise `false`.
 */
export const validateFormInputs = (
  amount: string,
  date: string,
  description: string
): boolean => {
  const amountValidation = isValidAmount(amount);
  const dateValidation = isValidDate(date);
  const descriptionValidation = isValidDescription(description);

  if (!amountValidation.isValid) {
    Toast.show({
      type: "error",
      text1: "Invalid entry.",
      text2: amountValidation.message,
    });
  } else if (!dateValidation.isValid) {
    Toast.show({
      type: "error",
      text1: "Invalid entry.",
      text2: dateValidation.message,
    });
  } else if (!descriptionValidation.isValid) {
    Toast.show({
      type: "error",
      text1: "Invalid entry.",
      text2: descriptionValidation.message,
    });
  }

  return amountValidation.isValid && dateValidation.isValid && descriptionValidation.isValid;
};

/**
 * Parses a date string in the formats MM/DD/YY, MM-DD-YY, MMDDYY to a Date object.
 * @param dateStr The date string to parse.
 * @returns A Date object representing the parsed date.
 */
export const parseDate = (dateStr: string): Date => {
  let month, day, year;
  if (dateStr.includes("/")) {
    [month, day, year] = dateStr.split("/").map(Number);
  } else if (dateStr.includes("-")) {
    [month, day, year] = dateStr.split("-").map(Number);
  } else {
    if (dateStr.length !== 6) {
      return new Date();
    }
    month = Number(dateStr.slice(0, 2));
    day = Number(dateStr.slice(2, 4));
    year = Number(dateStr.slice(4, 8));
  }

  const parsedDate = new Date(year, month - 1, day);

  return isNaN(parsedDate.getTime()) ? new Date() : parsedDate;
};


/**
 * Truncates a string to a specified length.
 * @param str 
 * @param maxLength 
 * @returns A string truncated to the specified length.
 */
export const truncateString = (str: string, maxLength: number = 20) => {
  if (str.length > maxLength) {
    return str.substring(0, maxLength) + '...';
  }
  return str;
};

