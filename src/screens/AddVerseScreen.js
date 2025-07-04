import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../ThemeContext';

const AddVerseScreen = () => {
  const { theme } = useTheme();
  const styles = getStyles(theme);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to Hidden!</Text>
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
    text: {
      color: theme.textColor,
      fontSize: 24,
      fontWeight: 'bold',
    },
  });

export default AddVerseScreen;
