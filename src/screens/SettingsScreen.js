import React from 'react';
import { View, Text, Switch, StyleSheet, Platform } from 'react-native';
import Slider from '@react-native-community/slider';
import { Picker } from '@react-native-picker/picker';
import { useTheme } from '../../ThemeContext';
import { useVerseSettings } from '../../VerseSettingsContext';

const SettingsScreen = () => {
  const { theme, mode, toggleTheme } = useTheme();
  const { chunkSize, setChunkSize, translation, setTranslation } = useVerseSettings();

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

      <View style={styles.card}>
        <Text style={styles.label}>Translation</Text>
        <Picker
          selectedValue={translation}
          onValueChange={setTranslation}
          style={Platform.OS === 'ios' ? styles.pickerIOS : styles.pickerAndroid}
          dropdownIconColor={theme.textColor}
        >
          <Picker.Item label="English Standard Version (ESV)" value="de4e12af7f28f599-02" />
          <Picker.Item label="King James Version (KJV)" value="06125adad2d5898a-01" />
          <Picker.Item label="New International Version (NIV)" value="bba9f40183526463-01" />
          <Picker.Item label="Christian Standard Bible (CSB)" value="46eecb412d56dfb7-02" />
          <Picker.Item label="New Living Translation (NLT)" value="fa0eeb8af176a5c0-01" />
        </Picker>
        <Text style={styles.helperText}>
          This will affect all loaded verses across the app.
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
      paddingTop: 60,
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      color: theme.textColor,
      textAlign: 'center',
      marginBottom: 30,
    },
    label: {
      color: theme.textColor,
      fontSize: 16,
      marginBottom: 12,
      textAlign: 'center',
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
      alignSelf: 'center',
    },
    pickerIOS: {
      height: 180,
      color: theme.textColor,
    },
    pickerAndroid: {
      height: 50,
      width: '100%',
      color: theme.textColor,
    },
  });

export default SettingsScreen;
