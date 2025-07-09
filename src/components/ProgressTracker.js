import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ProgressTracker = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Progress Tracker</Text>
      <View style={styles.progressBar}>
        <View style={styles.progress} />
      </View>
      <Text style={styles.percentage}>50% Complete</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  progressBar: {
    width: '100%',
    height: 20,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    overflow: 'hidden',
  },
  progress: {
    width: '50%',
    height: '100%',
    backgroundColor: '#76c7c0',
  },
  percentage: {
    marginTop: 10,
    fontSize: 16,
  },
});

export default ProgressTracker;
