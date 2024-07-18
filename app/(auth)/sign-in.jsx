import React, { useState } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Dimensions, Alert, Image, StyleSheet } from "react-native";

import { images } from "../../constants";
import { CustomButton, FormField } from "../../components";
import { getCurrentUser, signIn } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";

const SignIn = () => {
  const { setUser, setIsLogged } = useGlobalContext();
  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const submit = async () => {
    if (form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setSubmitting(true);

    try {
      await signIn(form.email, form.password);
      const result = await getCurrentUser();
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
        <View style={[styles.innerContainer, { minHeight: Dimensions.get("window").height - 100 }]}>
          <Image source={images.logo} resizeMode="contain" style={styles.logo} />

          <Text style={styles.title}>Log in to PharwaX</Text>

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
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "blue",
    height: "100%",
  },
  innerContainer: {
    width: "100%",
    justifyContent: "center",
    paddingHorizontal: 16,
    marginTop: 24,
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
  },
  button: {
    marginTop: 28,
  },
  footer: {
    justifyContent: "center",
    paddingTop: 20,
    flexDirection: "row",
    gap: 8,
  },
  footerText: {
    fontSize: 18,
    color: "#7B7B8B",
  },
  footerLink: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FF6F61",
  },
});

export default SignIn;
