import React from 'react';
import { StyleSheet } from 'react-native';
import { ThemedView } from '../../components/ThemedView';
import { ThemedText } from '../../components/ThemedText';
import { useTheme } from '../../ThemeContext';

const VerseListScreen = () => {
  const { theme } = useTheme();
  const styles = getStyles(theme);

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Verse List</ThemedText>
      <ThemedText>Display all saved verses with filter/sort/search options.</ThemedText>
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

export default VerseListScreen;
