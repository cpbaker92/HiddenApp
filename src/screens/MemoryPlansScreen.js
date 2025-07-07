import React from 'react';
import { StyleSheet } from 'react-native';
import { ThemedView } from '../../components/ThemedView';
import { ThemedText } from '../../components/ThemedText';
import { useTheme } from '../../ThemeContext';

const MemoryPlansScreen = () => {
  const { theme } = useTheme();
  const styles = getStyles(theme);

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Memory Plans</ThemedText>
      <ThemedText>List available curated plans like “Faith,” “Kids,” “Anxiety,” etc.</ThemedText>
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

export default MemoryPlansScreen;
