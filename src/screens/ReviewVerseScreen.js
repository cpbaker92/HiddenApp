// src/screens/ReviewVerseScreen.js

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ReviewVerseScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Review Verse Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ReviewVerseScreen;
