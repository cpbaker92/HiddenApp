// src/screens/TypingModeScreen.js

import React, { useState } from 'react';
import { View, TextInput, Text, Button, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useTheme } from '../../ThemeContext';
import { ThemedView } from '../../components/ThemedView';
import { ThemedText } from '../../components/ThemedText';

const TypingModeScreen = () => {
  const { theme } = useTheme();
  const route = useRoute();
  const navigation = useNavigation();
  const { reference, text } = route.params || {};

  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);

  const normalize = (str) =>
    str.toLowerCase().replace(/[^a-z0-9]/gi, '');

  const checkAnswer = () => {
    const correct = normalize(text) === normalize(input);
    setResult(correct ? 'Correct! 🎉' : 'Try Again ❌');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={[styles.container, { backgroundColor: theme.backgroundColor }]}
    >
      <ThemedText type="title" style={styles.reference}>
        {reference}
      </ThemedText>

      <TextInput
        placeholder="Type the verse from memory..."
        placeholderTextColor={theme.textColor}
        multiline
        style={[styles.input, { color: theme.textColor, borderColor: theme.textColor }]}
        value={input}
        onChangeText={setInput}
      />

      <Button title="Check Answer" onPress={checkAnswer} color={theme.primaryColor} />

      {result && <ThemedText style={styles.result}>{result}</ThemedText>}

      <Button title="Back" onPress={() => navigation.goBack()} />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  reference: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    fontSize: 18,
    padding: 12,
    height: 180,
    marginBottom: 20,
    textAlignVertical: 'top',
  },
  result: {
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 12,
  },
});

export default TypingModeScreen;
