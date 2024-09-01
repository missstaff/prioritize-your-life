import { Timestamp } from "@react-native-firebase/firestore";


export const convertToTimestamp = (dateString: string): Timestamp => {
    const normalizedDate = dateString.replace(/[-/]/g, "");

    if (normalizedDate.length !== 8) {
        throw new Error('Invalid date format. Expected formats: MMDDYYYY, MM/DD/YYYY, or MM-DD-YYYY');
    }

    const month = Number(normalizedDate.substring(0, 2));
    const day = Number(normalizedDate.substring(2, 4));
    const year = Number(normalizedDate.substring(4, 8));

    const parsedDate = new Date(year, month - 1, day);

    const firestoreTimestamp = Timestamp.fromDate(parsedDate);

    return firestoreTimestamp;
};