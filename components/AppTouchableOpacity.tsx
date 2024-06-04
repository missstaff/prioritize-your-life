import React from "react";
import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  StyleSheet,
} from "react-native";

const AppTouchableOpacity = (props: TouchableOpacityProps) => {
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.button}>
      <Text style={styles.buttonText}>Sign In</Text>
    </TouchableOpacity>
  );
};

export default AppTouchableOpacity;

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: "blue",
    borderRadius: 5,
    marginBottom: 10,
    padding: 10,
    width: "80%",
  },
  buttonText: {
    color: "white",
  },
});
