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
    <SafeAreaView style={styles.safeArea}>
      <ScrollView>
        <View
          style={[
            styles.container,
            { minHeight: Dimensions.get("window").height - 100 },
          ]}
        >
          <Image
            source={images.logo}
            resizeMode="contain"
            style={styles.logo}
          />

          <Text style={styles.title}>
            Log in to PharwaX
          </Text>

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles={styles.fieldMarginTop7}
            keyboardType="email-address"
          />

          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles={styles.fieldMarginTop7}
          />

          <CustomButton
            title="Sign In"
            handlePress={submit}
            containerStyles={styles.buttonMarginTop7}
            isLoading={isSubmitting}
          />

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Don't have an account?
            </Text>
            <Link
              href="/sign-up"
              style={styles.footerLink}
            >
              Signup
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#0384fc",
    height: "100%",
  },
  container: {
    width: "100%",
    justifyContent: "center",
    height: "100%",
    paddingHorizontal: 16,
    marginVertical: 24,
  },
  logo: {
    width: 115,
    height: 34,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#FFFFFF",
    marginTop: 40,
    fontFamily: "psemibold",
  },
  fieldMarginTop7: {
    marginTop: 28,
  },
  buttonMarginTop7: {
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
    color: "#B0B0B0",
    fontFamily: "pregular",
  },
  footerLink: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FF6F61",
    fontFamily: "psemibold",
  },
});

export default SignIn();
