import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import ConfettiCannon from 'react-native-confetti-cannon';
import { useTheme } from '../../ThemeContext';

const getShuffledChoices = (correctWord, verseWords) => {
  const decoys = verseWords.filter(word => word.toLowerCase() !== correctWord.toLowerCase());
  const shuffled = [...decoys.sort(() => 0.5 - Math.random()).slice(0, 3), correctWord];
  return shuffled.sort(() => 0.5 - Math.random());
};

const QuizModeScreen = () => {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const route = useRoute();
  const { reference, text: verse } = route.params || {};

  const words = verse?.trim().split(/\s+/) || [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selected, setSelected] = useState(null);
  const [choices, setChoices] = useState([]);

  useEffect(() => {
    if (currentIndex < words.length) {
      const newChoices = getShuffledChoices(words[currentIndex], words);
      setChoices(newChoices);
      setSelected(null);
    }
  }, [currentIndex]);

  const handleAnswer = (choice) => {
    if (selected !== null) return; // prevent double tap
    setSelected(choice);
    if (choice === words[currentIndex]) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentIndex + 1 < words.length) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setShowResult(true);
      }
    }, 700);
  };

  const resetQuiz = () => {
    setCurrentIndex(0);
    setScore(0);
    setShowResult(false);
    setSelected(null);
  };

  const styles = getStyles(theme);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.backButton}>Back</Text>
      </TouchableOpacity>

      <Text style={styles.header}>{reference}</Text>

      {showResult ? (
        <View style={styles.centered}>
          <Text style={styles.resultText}>You got {score} out of {words.length} correct!</Text>
          {score === words.length && (
            <ConfettiCannon count={80} origin={{ x: 200, y: 0 }} fadeOut />
          )}
          <TouchableOpacity style={styles.button} onPress={resetQuiz}>
            <Text style={styles.buttonText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View>
          <Text style={styles.prompt}>Choose the next word:</Text>
          <View style={styles.choicesContainer}>
            {choices.map((choice, idx) => {
              const isCorrect = choice === words[currentIndex];
              const bgColor = selected
                ? isCorrect
                  ? '#28a745'
                  : choice === selected
                    ? '#dc3545'
                    : '#ccc'
                : theme.cardColor;

              return (
                <TouchableOpacity
                  key={idx}
                  style={[styles.choiceButton, { backgroundColor: bgColor }]}
                  onPress={() => handleAnswer(choice)}
                >
                  <Text style={styles.choiceText}>{choice}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
          <Text style={styles.scoreDisplay}>Progress: {currentIndex + 1} / {words.length}</Text>
        </View>
      )}
    </ScrollView>
  );
};

const getStyles = (theme) =>
  StyleSheet.create({
    container: {
      flexGrow: 1,
      padding: 20,
      justifyContent: 'center',
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
      textAlign: 'center',
      color: theme.textColor,
    },
    prompt: {
      fontSize: 18,
      fontWeight: '600',
      textAlign: 'center',
      marginBottom: 20,
      color: theme.textColor,
    },
    choicesContainer: {
      flexDirection: 'column',
      gap: 10,
      marginBottom: 20,
    },
    choiceButton: {
      paddingVertical: 12,
      borderRadius: 10,
      marginVertical: 6,
      alignItems: 'center',
    },
    choiceText: {
      fontSize: 16,
      fontWeight: '600',
      color: '#000',
    },
    scoreDisplay: {
      textAlign: 'center',
      fontSize: 14,
      color: theme.textColor,
    },
    resultText: {
      fontSize: 22,
      fontWeight: '600',
      textAlign: 'center',
      marginVertical: 20,
      color: theme.textColor,
    },
    button: {
      backgroundColor: '#596487',
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderRadius: 10,
      alignSelf: 'center',
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: '600',
    },
    centered: {
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export default QuizModeScreen;
