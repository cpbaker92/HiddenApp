import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useTheme } from '../../ThemeContext';
import { useRoute, useNavigation } from '@react-navigation/native';

const shuffleArray = (array) => {
  return [...array].sort(() => Math.random() - 0.5);
};

const QuizModeScreen = () => {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const route = useRoute();
  const { reference, text } = route.params || {};

  const originalWords = text?.trim().split(/\s+/) || [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [options, setOptions] = useState([]);
  const [userProgress, setUserProgress] = useState([]);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    if (currentIndex < originalWords.length) {
      const correctWord = originalWords[currentIndex];
      const incorrectWords = originalWords
        .filter((word, i) => i !== currentIndex)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);
      const allOptions = shuffleArray([correctWord, ...incorrectWords]);
      setOptions(allOptions);
    }
  }, [currentIndex]);

  const handleWordPress = (word) => {
    const correctWord = originalWords[currentIndex];
    if (word === correctWord) {
      setUserProgress([...userProgress, word]);
      setCurrentIndex(currentIndex + 1);
      setFeedback('');
    } else {
      setFeedback('Try again!');
    }
  };

  const getPrompt = () => {
    return currentIndex === 0 ? 'Choose the first word:' : 'Choose the next word:';
  };

  const styles = getStyles(theme);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.reference}>{reference}</Text>
      <Text style={styles.prompt}>{getPrompt()}</Text>

      <View style={styles.optionsContainer}>
        {options.map((word, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleWordPress(word)}
            style={styles.optionButton}
          >
            <Text style={styles.optionText}>{word}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.progressText}>
        Progress: {currentIndex} / {originalWords.length}
      </Text>

      {userProgress.length > 0 && (
        <Text style={styles.builtVerse}>
          Verse so far: {userProgress.join(' ')}
        </Text>
      )}

      {feedback ? <Text style={styles.feedback}>{feedback}</Text> : null}

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.backButton}>Back</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const getStyles = (theme) =>
  StyleSheet.create({
    container: {
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 24,
      backgroundColor: theme.backgroundColor,
    },
    reference: {
      fontSize: 22,
      fontWeight: 'bold',
      marginBottom: 12,
      color: theme.textColor,
    },
    prompt: {
      fontSize: 18,
      marginBottom: 16,
      color: theme.textColor,
    },
    optionsContainer: {
      width: '100%',
      flexDirection: 'column',
      gap: 10,
      alignItems: 'center',
      marginBottom: 24,
    },
    optionButton: {
      width: '90%',
      padding: 12,
      backgroundColor: '#e0e0e0',
      borderRadius: 8,
      alignItems: 'center',
    },
    optionText: {
      fontSize: 16,
      fontWeight: '600',
      color: '#000',
    },
    progressText: {
      fontSize: 14,
      color: '#888',
      marginBottom: 10,
    },
    builtVerse: {
      fontSize: 16,
      color: theme.textColor,
      textAlign: 'center',
      marginTop: 10,
    },
    feedback: {
      fontSize: 16,
      color: '#d32f2f',
      marginTop: 8,
    },
    backButton: {
      fontSize: 16,
      color: '#007bff',
      marginTop: 20,
    },
  });

export default QuizModeScreen;
