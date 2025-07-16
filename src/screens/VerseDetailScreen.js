import React from 'react';
import { StyleSheet } from 'react-native';
import { ThemedView } from '../../components/ThemedView';
import { ThemedText } from '../../components/ThemedText';
import { useTheme } from '../../ThemeContext';
import { useVerseSettings } from '../../VerseSettingsContext';

const VerseDetailScreen = () => {
  const { theme } = useTheme();
  const { translation } = useVerseSettings();
  const styles = getStyles(theme);

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Verse Detail</ThemedText>
      <ThemedText>Show full verse, mode previews, and edit/delete options here. Translation: {translation}</ThemedText>
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

export default VerseDetailScreen;
