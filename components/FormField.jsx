import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { icons } from "../constants";

const FormField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={[styles.container, otherStyles]}>
      <Text style={styles.title}>{title}</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7B7B8B"
          onChangeText={handleChangeText}
          secureTextEntry={title === "Password" && !showPassword}
          {...props}
        />

        {title === "Password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={!showPassword ? icons.eye : icons.eyeHide}
              style={styles.icon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  title: {
    fontSize: 16,
    color: "#FFFFFF",
    fontFamily: "pmedium",
  },
  inputContainer: {
    width: "100%",
    height: 64,
    paddingHorizontal: 16,
    backgroundColor: "#CCE4FF",
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#E0E0E0",
    flexDirection: "row",
    alignItems: "center",
  },
  textInput: {
    flex: 1,
    color: "#000000",
    fontFamily: "psemibold",
    fontSize: 16,
  },
  icon: {
    width: 24,
    height: 24,
  },
});

export default FormField;
