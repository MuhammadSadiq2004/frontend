import React, { useRef, useState, useContext, useEffect } from 'react';
import { View, TextInput, StyleSheet, ScrollView, Alert, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import { CustomButton } from "../../components";
import { UserContext } from "../../context/Usercontext";
import { router } from 'expo-router';

const OTPInputScreen = () => {
  const { userData } = useContext(UserContext);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isSubmitting, setSubmitting] = useState(false);
  const [isOtpSending, setOtpSending] = useState(false);
  const [timer, setTimer] = useState(0); // Timer state in seconds
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const inputs = useRef([]);

  useEffect(() => {
    let interval;

    if (timer > 0) {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      setButtonDisabled(false);
    }

    return () => clearInterval(interval);
  }, [timer]);

  const handleInputChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputs.current[index + 1].focus();
    }
  };

  const handleOtpSend = async () => {
    if (isButtonDisabled) return; // Prevent sending OTP if button is disabled

    setOtpSending(true);
    setButtonDisabled(true); // Disable the button
    setTimer(120); // Set timer for 2 minutes

    try {
      await axios.post('http://192.168.100.4:3000/api/otp/generateOtp', {
        email: userData.email,
        password: userData.password,
      });

      Alert.alert("Success", "OTP sent successfully");
    } catch (error) {
      Alert.alert("Error", error.response?.data?.message || error.message);
    } finally {
      setOtpSending(false);
    }
  };

  const handleSubmit = async () => {
    const otpCode = otp.join('');

    if (otpCode.length < 6) {
      Alert.alert("Error", "Please enter the complete OTP");
      return;
    }

    setSubmitting(true);

    try {
      const response = await axios.post('http://192.168.100.4:3000/api/otp/verifyOtp', {
        email: userData.email,
        password: userData.password,
        otp: otpCode
      });

      Alert.alert("Success", "OTP verified successfully");
      router.replace('/home');
    } catch (error) {
      Alert.alert("Error", error.response?.data?.message || error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <CustomButton
          title={`Send OTP${isButtonDisabled ? ` (${formatTime(timer)})` : ''}`}
          handlePress={handleOtpSend}
          containerStyles="mb-4"
          isLoading={isOtpSending}
          disabled={isButtonDisabled}
          buttonStyles={isButtonDisabled ? styles.buttonDisabled : {}}
        />

        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              style={styles.input}
              maxLength={1}
              keyboardType="default"
              onChangeText={(value) => handleInputChange(value, index)}
              value={digit}
              ref={(ref) => (inputs.current[index] = ref)}
            />
          ))}
        </View>

        <CustomButton
          title="Verify OTP"
          handlePress={handleSubmit}
          containerStyles="mt-7"
          isLoading={isSubmitting}
        />
      </ScrollView>

      <View style={styles.timerContainer}>
        <Text style={styles.timerText}>
          {isButtonDisabled ? `Please wait ${formatTime(timer)} before resending` : ''}
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#161622',
    justifyContent: 'center',
  },
  contentContainer: {
    alignItems: 'center',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  input: {
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: '#fff',
    textAlign: 'center',
    fontSize: 24,
    marginHorizontal: 5,
  },
  buttonDisabled: {
    backgroundColor: '#d3d3d3', // Dimmed color for disabled button
    opacity: 0.6,
  },
  timerContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  timerText: {
    fontSize: 16,
    color: '#fff',
  },
});

export default OTPInputScreen;
