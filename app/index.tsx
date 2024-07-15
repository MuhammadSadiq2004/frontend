import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Link } from '@react-navigation/native'; // Import Link from @react-navigation/native

const App = () => {
  return (
    <View>
      <Text>App</Text>
      <StatusBar style="auto"/>
      <Link to="/home">Go to Home</Link> 
    </View>
  )
}

export default App;

const styles = StyleSheet.create({});
