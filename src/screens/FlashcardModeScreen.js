import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../../ThemeContext';
import { useRoute, useNavigation } from '@react-navigation/native';

const FlashcardModeScreen = () => {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const route = useRoute();
  const { reference, text } = route.params || {};

  const styles = getStyles(theme);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.backButton}>Back</Text>
      </TouchableOpacity>
      <Text style={styles.header}>{reference}</Text>
      <Text style={styles.placeholder}>Flashcard Mode goes here...</Text>
    </View>
  );
};

const getStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: theme.backgroundColor,
  },
  backButton: {
    fontSize: 16,
    color: '#007bff',
    position: 'absolute',
    top: 40,
    left: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  placeholder: {
    fontSize: 18,
    color: theme.textColor,
  },
});

export default FlashcardModeScreen;
