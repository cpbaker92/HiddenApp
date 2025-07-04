import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';
import { useTheme } from '../../ThemeContext';
import { useVerseSettings } from '../../VerseSettingsContext';

const SettingsScreen = () => {
  const { theme, mode, toggleTheme } = useTheme();
  const { chunkSize, setChunkSize } = useVerseSettings();

  const styles = getStyles(theme, mode);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Dark Mode</Text>
        <Switch
          trackColor={{ false: '#d3d3d3', true: '#ffffff' }}
          thumbColor={mode === 'dark' ? '#000000' : '#ffffff'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleTheme}
          value={mode === 'dark'}
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Letters per Line: {chunkSize}</Text>
        <Slider
          style={{ width: 250, height: 40 }}
          minimumValue={4}
          maximumValue={20}
          step={1}
          value={chunkSize}
          onValueChange={setChunkSize}
          minimumTrackTintColor={theme.textColor}
          maximumTrackTintColor={theme.textColor}
          thumbTintColor={theme.textColor}
        />
        <Text style={styles.helperText}>
          Adjust how many letters appear per line in First Letter Mode.
        </Text>
      </View>
    </View>
  );
};

const getStyles = (theme, mode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.backgroundColor,
      alignItems: 'center',
      paddingTop: 40,
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      color: theme.textColor,
      marginBottom: 24,
    },
    label: {
      color: theme.textColor,
      fontSize: 16,
      marginBottom: 12,
    },
    helperText: {
      marginTop: 8,
      fontSize: 13,
      color: theme.textColor,
      opacity: 0.6,
      textAlign: 'center',
    },
    card: {
      backgroundColor: mode === 'dark' ? '#2c2c2e' : '#f0f0f0',
      borderRadius: 20,
      padding: 20,
      marginBottom: 20,
      width: '90%',
      alignItems: 'center',
    },
  });

export default SettingsScreen;
