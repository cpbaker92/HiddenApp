import React from 'react';
import { useTheme } from '../../ThemeContext';
import { View, Text, Switch, StyleSheet } from 'react-native';

const SettingsScreen = () => {
  const { theme, toggleTheme } = useTheme();

  const toggleSwitch = () => toggleTheme();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <View style={styles.switchContainer}>
        <Text>Dark Mode</Text>
        <Text>{theme === 'dark' ? 'Dark Mode' : 'Light Mode'}</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={theme === 'dark' ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={theme === 'dark'}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '80%',
  },
});

export default SettingsScreen;
