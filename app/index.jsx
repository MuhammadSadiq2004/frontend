import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router'; // Ensure this is correctly imported
import * as Font from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { Loader } from "../components";

const SplashScreen = () => {
  const [fontLoaded, setFontLoaded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        'mvboli': require('../assets/fonts/mvboli.ttf'),
      });
      setFontLoaded(true);
    };

    loadFonts();

    const timer = setTimeout(() => {
      router.replace('/sign-in'); // Use the router to navigate
    }, 10000); // Display splash screen for 10 seconds

    return () => clearTimeout(timer); // Clear the timer on component unmount
  }, [router]);

  if (!fontLoaded) {
    return null; // Render a loading indicator or fallback
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={[styles.text, styles.inclinedText]}>Cure At</Text>
        <Text style={[styles.text, styles.inclinedText]}>Your</Text>
        <Text style={[styles.text, styles.inclinedText]}>DoorStep</Text>
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'blue', // Replace with your desired color
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    alignItems: 'center',
  },
  text: {
    fontSize: 36, // Increased font size
    fontFamily: 'mvboli', // Use the loaded font family
    textAlign: 'center',
    marginVertical: 5,
    color: 'black',
  },
  inclinedText: {
    transform: [{ rotate: '-12deg' }], // Angle of inclination
  },
});
