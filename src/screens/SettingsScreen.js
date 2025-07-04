import React from 'react';
import { useTheme } from '../../ThemeContext';
import { View, Text, Switch, StyleSheet } from 'react-native';

const SettingsScreen = () => {
  const { theme, mode, toggleTheme } = useTheme();

  const styles = getStyles(theme);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <View style={styles.switchContainer}>
        <Text style={styles.label}>Dark Mode</Text>
        <Switch
          trackColor={{ false: '#d3d3d3', true: '#ffffff' }}
          thumbColor={mode === 'dark' ? '#000000' : '#ffffff'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleTheme}
          value={mode === 'dark'}
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
