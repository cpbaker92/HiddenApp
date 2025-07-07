import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, SegmentedControlIOS } from 'react-native';
import { useTheme } from '../../ThemeContext';
import { useNavigation } from '@react-navigation/native';
import { useVerseSettings } from '../../VerseSettingsContext';

const ReviewScreen = () => {
  const [selectedMode, setSelectedMode] = useState('Flashcard');
  const navigation = useNavigation();

  const renderModeComponent = () => {
    switch (selectedMode) {
      case 'Flashcard':
        return <FlashcardMode />;
      case 'Typing':
        return <TypingMode />;
      case 'Quiz':
        return <QuizMode />;
      case 'Prompt':
        return <PromptModes />;
      default:
        return null;
    }
  };

  const handleModeChange = (event) => {
    setSelectedMode(event.nativeEvent.value);
  };
  const { theme, mode } = useTheme();
  const { chunkSize } = useVerseSettings();

  const verses = [
    { reference: 'John 3:16', text: 'For God so loved the world...' },
    // Add more verses here as needed
  ];

  const styles = getStyles(theme);

  const handlePress = (reference, text) => {
    navigation.navigate('ReviewVerse', { reference, text });
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <SegmentedControlIOS
        values={['Flashcard', 'Typing', 'Quiz', 'Prompt']}
        selectedIndex={0}
        onChange={handleModeChange}
        style={styles.segmentedControl}
      />

      {renderModeComponent()}

      <Text style={[styles.subtitle, { color: theme.textColor }]}>
        Tap a verse below to review or test your memory.
      </Text>

      {verses.map((verse, index) => (
        <Pressable
          key={index}
          onPress={() => handlePress(verse.reference, verse.text)}
          style={styles.pressable}
        >
          <Text style={[styles.verseItem, { color: theme.textColor }]}>
            {verse.reference}
          </Text>
        </Pressable>
      ))}
    </View>
  );
};

const FlashcardMode = () => (
  <View>
    <Text>Flashcard Mode - Step-by-step reveal logic here</Text>
  </View>
);

const TypingMode = () => (
  <View>
    <Text>Typing Mode - Input verse from memory here</Text>
  </View>
);

const QuizMode = () => (
  <View>
    <Text>Quiz Mode - MCQ or word order logic here</Text>
  </View>
);

const PromptModes = () => (
  <View>
    <Text>Prompt Modes - First-letter, two-letter, etc.</Text>
  </View>
);

const ProgressTracker = () => (
  <View style={styles.progressTracker}>
    <Text>Progress Tracker - Updates based on correct answers or time spent</Text>
  </View>
);

  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-start',
      padding: 20,
    },
    segmentedControl: {
      marginVertical: 20,
      width: '90%',
    },
    progressTracker: {
      marginVertical: 10,
      width: '100%',
      alignItems: 'center',
    },
    title: {
      fontSize: 26,
      fontWeight: 'bold',
      marginBottom: 10,
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
