// src/screens/FlashcardModeScreen.js

import React, { useState } from 'react';
import {
  View,
  Text,
  Pressable,
  Animated,
  ToastAndroid,
  StyleSheet,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useTheme } from '../../ThemeContext';
import { useVerseSettings } from '../../VerseSettingsContext';
import { ThemedText } from '../../components/ThemedText';
import { ThemedView } from '../../components/ThemedView';

const FlashcardModeScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { reference, text } = route.params || {};
  const { theme } = useTheme();
  const { chunkSize } = useVerseSettings();

  const [showFull, setShowFull] = useState(false);
  const [scale] = useState(new Animated.Value(1));

  const toggleCard = () => {
    setShowFull(prev => !prev);
    Animated.sequence([
      Animated.timing(scale, { toValue: 1.1, duration: 100, useNativeDriver: true }),
      Animated.timing(scale, { toValue: 1, duration: 100, useNativeDriver: true }),
    ]).start();

    ToastAndroid.show(showFull ? 'First Letter Mode' : 'Full Verse', ToastAndroid.SHORT);
  };

  const toFirstLetters = (text, size) => {
    const letters = text
      .split(' ')
      .map(word => word[0])
      .join('');
    const chunks = [];
    for (let i = 0; i < letters.length; i += size) {
      chunks.push(letters.slice(i, i + size));
    }
    return chunks.join('\n');
  };

  const styles = getStyles(theme);

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <ThemedText style={styles.back}>Back</ThemedText>
        </Pressable>
        <ThemedText style={styles.title}>Flashcard Mode</ThemedText>
      </View>

      <ThemedText style={styles.reference}>{reference}</ThemedText>

      <Pressable onPress={toggleCard} style={styles.card}>
        <Animated.Text style={[styles.text, { transform: [{ scale }] }]}>
          {showFull ? text : toFirstLetters(text, chunkSize)}
        </Animated.Text>
      </Pressable>
    </ThemedView>
  );
};

const getStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
    },
    header: {
      position: 'absolute',
      top: 50,
      left: 20,
      right: 20,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    back: {
      color: '#007bff',
      fontSize: 16,
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    reference: {
      marginTop: 100,
      fontSize: 22,
      fontFamily: 'Rasa-Bold',
    },
    card: {
      marginTop: 20,
      padding: 30,
      borderRadius: 10,
      backgroundColor: theme.cardColor || '#eee',
      elevation: 4,
    },
    text: {
      fontSize: 24,
      textAlign: 'center',
      fontFamily: 'Rasa-Regular',
    },
  });

export default FlashcardModeScreen;
