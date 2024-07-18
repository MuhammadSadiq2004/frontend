import React, { useState } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Dimensions, Alert, Image, StyleSheet } from "react-native";

import { images } from "../../constants";
import { createUser } from "../../lib/appwrite";
import { CustomButton, FormField } from "../../components";
import { useGlobalContext } from "../../context/GlobalProvider";

const SignUp = () => {
  const { setUser, setIsLogged } = useGlobalContext();

  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const submit = async () => {
    if (form.username === "" || form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
    }

    setSubmitting(true);
    try {
      const result = await createUser(form.email, form.password, form.username);
      setUser(result);
      setIsLogged(true);

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
            Sign Up to PharwaX
          </Text>

          <FormField
            title="Username"
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e })}
            otherStyles={styles.fieldMarginTop10}
          />

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
            title="Sign Up"
            handlePress={submit}
            containerStyles={styles.buttonMarginTop7}
            isLoading={isSubmitting}
          />

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Have an account already?
            </Text>
            <Link
              href="/sign-in"
              style={styles.footerLink}
            >
              Login
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#161622",
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
  fieldMarginTop10: {
    marginTop: 40,
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
    color: "#FFFFFF",
    fontFamily: "psemibold",
  },
});

export default SignUp;
