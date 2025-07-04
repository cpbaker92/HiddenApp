import React from 'react';
import { useTheme } from '../../ThemeContext';
import { View, Text, Switch, StyleSheet } from 'react-native';

const SettingsScreen = () => {
  const { theme: currentTheme, toggleTheme } = useTheme();

  const styles = getStyles(currentTheme);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <View style={styles.switchContainer}>
        <Text style={styles.label}>Dark Mode</Text>
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={currentTheme.mode === 'dark' ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleTheme}
          value={currentTheme.mode === 'dark'}
        />
      </View>
    </View>
  );
};

const getStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.backgroundColor,
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      fontSize: 24,
      color: theme.textColor,
      marginBottom: 20,
    },
    label: {
      color: theme.textColor,
      marginRight: 10,
      fontSize: 16,
    },
    switchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '60%',
    },
  });

export default SettingsScreen;
