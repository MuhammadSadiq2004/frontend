import React, { useState } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Alert, Image, StyleSheet } from "react-native";

import { images } from "../../constants";
import { CustomButton, FormField } from "../../components";
import { Client, Account } from "appwrite"; // Ensure you import Client and Account
import { useGlobalContext } from "../../context/GlobalProvider";

const test = () => {
  const { setUser, setIsLogged } = useGlobalContext();
  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // Initialize Appwrite client and account
  const client = new Client();
  client
    .setEndpoint('https://cloud.appwrite.io/v1') // Replace with your Appwrite endpoint
    .setProject('669966b6002f7a8c058b'); // Replace with your Appwrite project ID

  const account = new Account(client);

  const submit = async () => {
    if (form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setSubmitting(true);

    try {
      await account.createEmailSession(form.email, form.password); // Use createEmailSession method
      const result = await account.get(); // Get the current user after sign in
      setUser(result);
      setIsLogged(true);

      Alert.alert("Success", "User signed in successfully");
      router.replace("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.splitContainer}>
          <View style={styles.leftContainer}>
            <Image source={images.logo} resizeMode="contain" style={styles.logo} />
            <Text style={styles.title}>Log in to PharwaX</Text>
          </View>
          <View style={styles.rightContainer}>
            <FormField
              title="Email"
              value={form.email}
              handleChangeText={(e) => setForm({ ...form, email: e })}
              otherStyles={styles.field}
              keyboardType="email-address"
            />

            <FormField
              title="Password"
              value={form.password}
              handleChangeText={(e) => setForm({ ...form, password: e })}
              otherStyles={styles.field}
              secureTextEntry // Ensuring password field is secure
            />

            <CustomButton
              title="Sign In"
              handlePress={submit}
              containerStyles={styles.button}
              isLoading={isSubmitting}
            />

            <View style={styles.footer}>
              <Text style={styles.footerText}>Don't have an account?</Text>
              <Link href="/sign-up" style={styles.footerLink}>Signup</Link>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
  splitContainer: {
    flexDirection: "column", // Change to row to make side-by-side layout
    height: "100%",
  },
  leftContainer: {
    flex: 1,
    backgroundColor: "blue",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  rightContainer: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  logo: {
    width: 115,
    height: 34,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#fff",
    marginTop: 40,
  },
  field: {
    marginTop: 28,
    width: "100%",
  },
  button: {
    marginTop: 28,
    width: "100%",
  },
  footer: {
    justifyContent: "center",
    paddingTop: 20,
    flexDirection: "row",
    gap: 8,
  },
  footerText: {
    fontSize: 18,
    color: "black",
  },
  footerLink: {
    fontSize: 18,
    fontWeight: "600",
    color: "black",
  },
});

export default test;
