import React from 'react';
import { StyleSheet } from 'react-native';
import { ThemedView } from '../../components/ThemedView';
import { ThemedText } from '../../components/ThemedText';
import { useTheme } from '../../ThemeContext';

const ProgressScreen = () => {
  const { theme } = useTheme();
  const styles = getStyles(theme);

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Your Progress</ThemedText>
      <ThemedText>Track memorization streaks, quiz results, and verse completion stats here.</ThemedText>
    </ThemedView>
  );
};

const getStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export default ProgressScreen;
