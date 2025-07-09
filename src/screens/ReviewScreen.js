import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useTheme } from '../../ThemeContext';
import { useNavigation } from '@react-navigation/native';
import { useVerseSettings } from '../../VerseSettingsContext';

const ReviewScreen = () => {
  const [selectedMode, setSelectedMode] = useState('Flashcard');
  const navigation = useNavigation();
  const { theme, mode } = useTheme();
  const { chunkSize } = useVerseSettings();

  const styles = getStyles(theme, mode, selectedMode);

  const modes = ['Flashcard', 'Typing', 'Quiz', 'Prompt'];

  const verses = [
    { reference: 'John 3:16', text: 'For God so loved the world...' },
    // Add more verses here as needed
  ];

  const handlePress = (reference, text) => {
    if (reference && text) {
      let screen;
      switch (selectedMode) {
        case 'Flashcard':
          screen = 'FlashcardMode';
          break;
        case 'Typing':
          screen = 'TypingMode';
          break;
        case 'Quiz':
          screen = 'QuizMode';
          break;
        case 'Prompt':
          screen = 'PromptMode';
          break;
        default:
          screen = 'ReviewVerse';
      }
      navigation.navigate(screen, { reference, text });
    } else {
      console.error('Selected verse is missing reference or text');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <View style={styles.modeSelector}>
        {modes.map((modeName) => (
          <TouchableOpacity
            key={modeName}
            onPress={() => setSelectedMode(modeName)}
            style={[styles.modeButton, selectedMode === modeName && styles.selectedModeButton]}
          >
            <Text style={[styles.modeButtonText, selectedMode === modeName && styles.selectedModeText]}>
              {modeName}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={[styles.subtitle, { color: theme.textColor }]}>Tap a verse below to review or test your memory.</Text>

      {verses.map((verse, index) => (
        <Animatable.View animation="bounceIn" duration={1500} key={index}>
          <Pressable
            onPress={() => handlePress(verse.reference, verse.text)}
            style={styles.pressable}
          >
            <Text style={[styles.verseItem, { color: theme.textColor }]}>
              {verse.reference}
            </Text>
          </Pressable>
        </Animatable.View>
      ))}
    </View>
  );
};

const getStyles = (theme, mode, selectedMode) => StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 20,
    paddingTop: 80,
  },
  modeSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 20,
  },
  modeButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#eee',
    marginHorizontal: 5,
  },
  selectedModeButton: {
    backgroundColor: '#596487',
  },
  modeButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  selectedModeText: {
    color: '#fff',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  pressable: {
    padding: 14,
    marginVertical: 6,
    borderRadius: 10,
    backgroundColor: mode === 'dark' ? '#2a2a2a' : '#f0f0f0',
    width: '100%',
    alignItems: 'center',
  },
  verseItem: {
    fontSize: 18,
    fontFamily: 'Rasa-Bold',
  },
});

export default ReviewScreen;
