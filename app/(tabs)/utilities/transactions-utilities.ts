import { IsValidProps } from "@/app/types";
import Toast from "react-native-toast-message";


/**
 * Formats a Firebase timestamp into a string representing a formatted date.
 * @param timestamp - The timestamp to format.
 * @returns The formatted date string in the format "MM/DD/YY".
 */
export const formatDate = (timestamp: any): string => {
  const date = timestamp.toDate();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const year = String(date.getFullYear()).slice(2);
  return `${month}/${day}/${year}`;
};


/**
 * Checks if a given date is valid.
 * @param date - The date to be validated.
 * @returns An object containing the validation result and an optional error message.
 */
export const isValidDate = (date: string): IsValidProps => {
  if (date.length === 0) {
    Toast.show({
      type: "error",
      text1: "A date is required.",
      text2: "Please try again.",
    });
    return { isValid: false, message: "A date is required." };
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
      text1: "Date must be in MM/DD/YY format.",
      text2: "Please try again.",
    });
    return { isValid: false, message: "Date must be in MM/DD/YY format.", };
  }

  const [month, day, year] = date.split("/").map(Number);
  const currentYear = new Date().getFullYear();
  const formattedYear = Number(`${currentYear.toString().slice(0, 2)}${year}`);

  if (formattedYear < currentYear) {
    Toast.show({
      type: "error",
      text1: "Year cannot be less than the current year.",
      text2: "Please try again.",
    });
    return { isValid: false, message: "Year cannot be less than the current year." };
  }

  return { isValid: true, message: "" };
};

/**
 * Checks if a description is valid.
 * @param description - The description to validate.
 * @returns An object indicating whether the description is valid and a corresponding message.
 */
export const isValidDescription = (description: string): IsValidProps => {
  const isValid = description.length > 0
  if (!isValid) {
    Toast.show({
      type: "error",
      text1: "A description is required.",
      text2: "Please try again.",
    });
    return { isValid: false, message: "A description is required." };
  }
  return { isValid: true, message: "" };
};

/**
 * Checks if the given amount is valid.
 * 
 * @param amount - The amount to be validated.
 * @returns An object indicating whether the amount is valid and a corresponding message.
 */
export const isValidAmount = (amount: string): IsValidProps => {
  const regex = /^-?\d+(\.\d+)?$/;
  const isValid = regex.test(amount);
  if (!isValid) {
    Toast.show({
      type: "error",
      text1: "Amount must be a number.",
      text2: "Please try again.",  
    });
    return { isValid: false, message: "Amount must be a number." };
  }
  return { isValid: true, message: "" };
};

/**
 * Validates the form inputs for a transaction.
 * @param amount - The amount of the transaction.
 * @param date - The date of the transaction.
 * @param description - The description of the transaction.
 * @returns A boolean indicating whether the form inputs are valid.
 */
export const validateFormInputs = (
  date: string,
  amount: string,
  description: string
): boolean => {
  const dateValidation = isValidDate(date);
  const amountValidation = isValidAmount(amount);
  const descriptionValidation = isValidDescription(description);

  if (!dateValidation.isValid) {
    Toast.show({
      type: "error",
      text1: dateValidation.message,
      text2: "Please try again.",
    });
  } else if (!amountValidation.isValid) {
    Toast.show({
      type: "error",
      text1: amountValidation.message,
      text2: "Please try again.",
    });
  } else if (!descriptionValidation.isValid) {
    Toast.show({
      type: "error",
      text1: descriptionValidation.message,
      text2: "Please try again.",
    });
  }

  return amountValidation.isValid && dateValidation.isValid && descriptionValidation.isValid;
};

/**
 * Parses a date string and returns a Date object.
 * @param dateStr - The date string to parse.
 * @returns The parsed Date object.
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
 * @param str - The string to truncate.
 * @param maxLength - The maximum length of the truncated string.
 * @returns The truncated string.
 */
export const truncateString = (str: string, maxLength: number = 20) => {
  if (str.length > maxLength) {
    return str.substring(0, maxLength) + '...';
  }
  return str;
};

