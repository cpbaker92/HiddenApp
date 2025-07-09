import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import ConfettiCannon from 'react-native-confetti-cannon';
import { useRoute, useNavigation } from '@react-navigation/native';

const QuizModeScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { reference, text } = route.params || {};
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [verseWords, setVerseWords] = useState([]);
  const [shuffledChoices, setShuffledChoices] = useState([]);
  const [userWords, setUserWords] = useState([]);
  const [feedback, setFeedback] = useState('');
  const [selectedIncorrectWord, setSelectedIncorrectWord] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (text) {
      const words = text.trim().split(/\s+/);
      setVerseWords(words);
      setNextChoices(words, 0);
    }
  }, [text]);

  const setNextChoices = (words, index) => {
    if (index < words.length) {
      const correctWord = words[index];
      const otherWords = words.filter((_, i) => i !== index);
      const shuffled = shuffleArray([
        correctWord,
        ...getRandomWords(otherWords, 3),
      ]);
      setShuffledChoices(shuffled);
    }
  };

  const getRandomWords = (words, count) => {
    const shuffled = [...words].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const shuffleArray = (array) => {
    return [...array].sort(() => Math.random() - 0.5);
  };

  const handleWordPress = (word) => {
    if (word === verseWords[currentWordIndex]) {
      const newUserWords = [...userWords, word];
      setUserWords(newUserWords);
      setCurrentWordIndex(currentWordIndex + 1);
      setFeedback('');
      setSelectedIncorrectWord(null);

      if (currentWordIndex + 1 === verseWords.length) {
        setFeedback('Great job!');
        setShowConfetti(true);
      } else {
        setNextChoices(verseWords, currentWordIndex + 1);
      }
    } else {
      setFeedback('Try again!');
      setSelectedIncorrectWord(word);
    }
  };

  const renderButton = (word, index) => {
    const isIncorrect = feedback === 'Try again!' && selectedIncorrectWord === word;
    return (
      <TouchableOpacity
        key={index}
        style={[
          styles.optionButton,
          isIncorrect && styles.incorrectButton,
        ]}
        onPress={() => handleWordPress(word)}
        disabled={feedback === 'Great job!'}
      >
        <Text style={styles.optionText}>{word}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? '#000' : '#fff' },
      ]}
    >
      <View style={styles.quizBox}>
        <Text style={styles.reference}>{reference}</Text>
        <Text style={styles.instruction}>
          {currentWordIndex === 0
            ? 'Choose the first word:'
            : 'Choose the next word:'}
        </Text>

        <View style={styles.choicesContainer}>
          {shuffledChoices.map((word, index) => renderButton(word, index))}
        </View>

        <Text style={styles.progressText}>
          Progress: {userWords.length} / {verseWords.length}
        </Text>

        {userWords.length > 0 && (
          <Text style={styles.verseSoFar}>{userWords.join(' ')}</Text>
        )}

        {feedback !== '' && (
          <Text
            style={[
              styles.feedbackText,
              { color: feedback === 'Try again!' ? 'red' : 'green' },
            ]}
          >
            {feedback}
          </Text>
        )}

        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
      </View>

      {showConfetti && (
        <ConfettiCannon count={80} origin={{ x: 200, y: 0 }} fadeOut />
      )}
    </View>
  );
};

export default QuizModeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  quizBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  reference: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  instruction: {
    fontSize: 16,
    marginBottom: 20,
  },
  choicesContainer: {
    width: '100%',
    marginBottom: 20,
  },
  optionButton: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    marginVertical: 6,
    alignItems: 'center',
  },
  incorrectButton: {
    backgroundColor: '#ffdddd',
    borderColor: 'red',
    borderWidth: 1,
  },
  optionText: {
    fontSize: 16,
    fontWeight: '600',
  },
  progressText: {
    fontSize: 14,
    marginBottom: 8,
  },
  verseSoFar: {
    fontSize: 16,
    fontStyle: 'italic',
    marginBottom: 10,
    textAlign: 'center',
  },
  feedbackText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  backText: {
    fontSize: 16,
    color: '#007bff',
    marginTop: 10,
  },
});
