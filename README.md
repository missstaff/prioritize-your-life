# Personal Budgeting and Finance App

A mobile application for managing personal budgets and finances, built with React Native and TypeScript. Backend services are powered by Firebase and Node.js.

## Table of Contents

1. [Features](#features)
2. [Installation](#installation)
3. [Usage](#usage)
4. [License](#license)
5. [Contact](#contact)

## Features

- Track income and expenses
- Set and monitor budget goals
- Visualize financial data with charts and graphs
- Sync data across devices with Firebase

## Installation

### Prerequisites

- Node.js and npm installed
- Firebase account

### Steps

1. **Clone the repository**

    ```sh
    git clone https://github.com/your-username/your-repo-name.git
    cd your-repo-name
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

    Add your Firebase configuration to your project. Typically, this would be in a file like `firebaseConfig.js`.

    ```javascript
    // firebaseConfig.js
    import firebase from 'firebase/app';
    import 'firebase/auth';
    import 'firebase/firestore';

    const firebaseConfig = {
      apiKey: "YOUR_API_KEY",
      authDomain: "YOUR_AUTH_DOMAIN",
      projectId: "YOUR_PROJECT_ID",
      storageBucket: "YOUR_STORAGE_BUCKET",
      messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
      appId: "YOUR_APP_ID"
    };

    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    export { firebase };
    ```

5. **Run the app**

    ```sh
    npm run android  # for Android
    npm run ios      # for iOS
    ```

## Usage

1. **Sign Up / Log In**
   - Create an account or log in using your credentials.

2. **Add Transactions**
   - Record your income and expenses.

3. **Set Budgets**
   - Define budget limits for different categories.

4. **Monitor Finances**
   - View charts and graphs to analyze your financial data.


## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For any questions or suggestions, feel free to open an issue or contact us at [your-email@example.com].
