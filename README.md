# Personal Budgeting and Finance App

A mobile application for managing personal budgets and finances, built with React Native and TypeScript. Backend services are powered by Firebase and Node.js.

## Table of Contents 🔍

1. [Features](#features)
2. [Installation](#installation)
3. [Usage](#usage)
4. [Contributing](#contributing)
5. [License](#license)
6. [Contact](#contact)

## Features 🎬

- Track income and expenses
- Set and monitor budget goals
- Visualize financial data with charts and graphs
- Sync data across devices with Firebase

## Installation ⚙

### Prerequisites ✔

- Node.js and npm installed
- Expo free dev account
- Expo CLI installed
- Firebase account
- Firebase CLI installed
- Android Studio installed for Android
- Xcode installed for iOS
- Java JDK 17 installed
- Test device with Expo Go installed

### Steps 👟

1. **Clone the repository**

   ```sh
   git clone https://github.com/missstaff/prioritize-your-life
   cd prioritize-your-life
   ```

2. **Install dependencies**

   ```sh
   npm install
   ```

3. **Set up Firebase**

   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).
   - Enable Firestore and Authentication.
   - Download the `google-services.json` file and place it in your `android/app` directory.
   - Download the `GoogleService-Info.plist` file and place it in your `ios` directory.

4. **Configure Firebase**

   Add your Firebase configuration to your project. Typically, this would be in a file like `getFireApp.ts`.

   ```typescript
   // getFireApp.ts
   import "@react-native-firebase/auth";
   import "@react-native-firebase/database";
   import "@react-native-firebase/dynamic-links";
   import "@react-native-firebase/firestore";
   import "@react-native-firebase/functions";
   import "@react-native-firebase/in-app-messaging";
   import "@react-native-firebase/messaging";
   import "@react-native-firebase/storage";

   import firebase from "@react-native-firebase/app";
   import { Platform } from "react-native";

   /**
    * Gets the firebase app.
    * @returns The firebase app.
    */
   export function getFireApp() {
     const firebaseConfig = {
       apiKey: process.env.EXPO_PUBLIC_API_KEY || "",
       appName: process.env.EXPO_PUBLIC_APP_NAME || "",
       authDomain: process.env.EXPO_PUBLIC_AUTH_DOMAIN || "",
       databaseURL: process.env.EXPO_PUBLIC_DATABASE_URL || "",
       projectId: process.env.EXPO_PUBLIC_PROJECT_ID || "",
       storageBucket: process.env.EXPO_PUBLIC_STORAGE_BUCKET || "",
       messagingSenderId: process.env.EXPO_PUBLIC_MESSAGING_SENDER_ID || "",
       measurementId: process.env.EXPO_PUBLIC_MEASUREMENT_ID || "",
       appId: "",
     };

     try {
       if (Platform.OS === "ios") {
         firebaseConfig.appId = process.env.EXPO_PUBLIC_IOS_APP_ID || "";
       } else if (Platform.OS === "android") {
         firebaseConfig.appId = process.env.EXPO_PUBLIC_ANDROID_APP_ID || "";
       } else if (Platform.OS === "web") {
         firebaseConfig.appId = process.env.EXPO_PUBLIC_WEB_APP_ID || "";
       } else {
         throw new Error("Platform not supported");
       }

       if (!firebase.apps.find((app) => app.name === firebaseConfig.appName)) {
         return firebase.initializeApp(firebaseConfig, firebaseConfig.appName);
       }
       return firebase.app(firebaseConfig.appName);
     } catch (e) {
       console.error("Failed to instantiate firebase app", e);
     }
   }
   ```

5. **Run the app** 🚀

   - Create a development build using expo

   ```sh
   eas build --platform android --profile development
   # or
   eas build --platform ios --profile development
   ```

   - Start the server

   ```sh
   npx expo start
   ```

   - Using Expo Go

   * Scan the QR code
   * Follow terminal prompts

## Usage ▶

1. **Sign Up / Log In**

   - Create an account or log in using your credentials.

2. **Add Transactions**

   - Record your income and expenses.

3. **Set Budgets**

   - Define budget limits for different categories.

4. **Monitor Finances**

   - View charts and graphs to analyze your financial data.

5. **Set Savings Goals**

   - Set specific savings goals and track your progress towards achieving them.

6. **Promote Financial Literacy**
   - Access links to informative media to educate yourself about money management.


## Contributing ➕

Contributions are welcome! If you have any improvements, bug fixes, or new features to add, follow these steps:

1. **Fork the repository**

   Click on the "Fork" button at the top right of the repository page.

2. **Clone your forked repository**

   ```sh
   git clone https://github.com/your-username/prioritize-your-life
   cd prioritize-your-life
   ```
````

3. **Create a new branch**

   ```sh
   git checkout -b my-feature-branch
   ```

4. **Make your changes**

   Implement your changes in the new branch.

5. **Commit your changes**

   ```sh
   git commit -m "Description of the feature or fix"
   ```

6. **Push your changes to your fork**

   ```sh
   git push origin my-feature-branch
   ```

7. **Submit a pull request**

   Go to the original repository and create a pull request from your forked repository and branch.

```

## License ⚖

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact 📧

For any questions or suggestions, feel free to open an issue or contact us at [shawnastaff@gmail.com].

### Special note at this time the iOS build has not been built. Building iOS will require some basic knowledge of native iOS development.
```
