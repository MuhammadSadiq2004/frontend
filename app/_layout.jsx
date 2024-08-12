import { StyleSheet, Text, View } from 'react-native';
import { Stack } from 'expo-router';
import React from 'react';
import 'react-native-url-polyfill/auto';

import { SplashScreen } from "expo-router";

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  return (
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="search/[query]" options={{ headerShown: false }} />
      </Stack>

  );
}

export default RootLayout;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
