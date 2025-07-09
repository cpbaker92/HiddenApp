import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import { useTheme } from '../../ThemeContext';
import { useNavigation } from '@react-navigation/native';
import { useVerseSettings } from '../../VerseSettingsContext';

const ReviewScreen = () => {
  const [selectedMode, setSelectedMode] = useState('Flashcard');
  const navigation = useNavigation();
  const { theme, mode } = useTheme();
  const { chunkSize } = useVerseSettings();

  const styles = getStyles(theme, mode);

  const verses = [
    { reference: 'John 3:16', text: 'For God so loved the world...' },
    // Add more verses here as needed
  ];

  const handleModeChange = (event) => {
    setSelectedMode(event.nativeEvent.value);
  };

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
      <Text style={[styles.subtitle, { color: theme.textColor }]}>
        Choose a review mode:
      </Text>

      <SegmentedControl
        values={['Flashcard', 'Typing', 'Quiz', 'Prompt']}
        selectedIndex={0}
        onChange={handleModeChange}
        style={styles.segmentedControl}
      />

      <Text style={[styles.subtitle, { color: theme.textColor }]}>
        Tap a verse below to review or test your memory.
      </Text>

      {verses.map((verse, index) => (
        <Animatable.View key={index} animation="fadeInUp" duration={600} delay={index * 150}>
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

const getStyles = (theme, mode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-start',
      padding: 20,
    },
    segmentedControl: {
      marginBottom: 24,
      width: '90%',
    },
    subtitle: {
      fontSize: 16,
      marginVertical: 8,
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
