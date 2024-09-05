import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Timer = ({ initialTime, isActive }) => {
  const [time, setTime] = useState(initialTime);
  
  useEffect(() => {
    let interval;
    
    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      setTime(0); // Ensure the timer stops at zero
    }
    
    return () => clearInterval(interval);
  }, [isActive, time]);
  
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <View style={styles.timerContainer}>
      {isActive ? (
        <Text style={styles.timerText}>Please wait {formatTime(time)} before resending</Text>
      ) : (
        <Text style={styles.timerText}>You can resend OTP now</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  timerContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  timerText: {
    fontSize: 16,
    color: '#fff',
  },
});

export default Timer;
