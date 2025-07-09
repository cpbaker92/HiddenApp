import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  useColorScheme,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import ConfettiCannon from 'react-native-confetti-cannon';

const TypingModeScreen = ({ route }) => {
  const { verse = '', reference = '' } = route.params || {};
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  const [userInput, setUserInput] = useState('');
  const [wordResults, setWordResults] = useState([]);
  const [verseWords, setVerseWords] = useState([]);
  const [isCorrect, setIsCorrect] = useState(null);
  const [showFullVerse, setShowFullVerse] = useState(false);
  const inputRef = useRef(null);

  const correctCount = wordResults.filter((r) => r === true).length;

  const checkInput = () => {
    const normalizedInput = userInput.trim().replace(/\s+/g, ' ');
    const normalizedVerse = verse.trim().replace(/\s+/g, ' ');

    if (!normalizedInput || !normalizedVerse) {
      setIsCorrect(false);
      setWordResults([]);
      setVerseWords([]);
      return;
    }

    const inputWords = normalizedInput.split(' ');
    const actualWords = normalizedVerse.split(' ');

    const results = actualWords.map((word, i) => {
      return inputWords[i]?.toLowerCase() === word.toLowerCase();
    });

    const isPerfect =
      inputWords.length === actualWords.length &&
      results.every((r) => r === true);

    setVerseWords(actualWords);
    setWordResults(results);
    setIsCorrect(isPerfect);
  };

  const reset = () => {
    setUserInput('');
    setWordResults([]);
    setVerseWords([]);
    setIsCorrect(null);
  };

  const Button = ({ title, onPress, bgColor }) => (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.button,
        { backgroundColor: bgColor || (isDarkMode ? '#333' : '#596487') },
      ]}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <ScrollView
        contentContainerStyle={[
          styles.container,
          { backgroundColor: isDarkMode ? '#1c1c1e' : '#fff' },
        ]}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={[styles.reference, { color: isDarkMode ? '#fff' : '#000' }]}>
          {reference}
        </Text>

        <TextInput
          ref={inputRef}
          style={[
            styles.input,
            {
              backgroundColor: isDarkMode ? '#2c2c2e' : '#f2f2f7',
              color: isDarkMode ? '#fff' : '#000',
              borderColor: isCorrect === false ? 'red' : '#ccc',
            },
          ]}
          placeholder="Start typing the verse..."
          placeholderTextColor={isDarkMode ? '#999' : '#888'}
          multiline
          value={userInput}
          onChangeText={setUserInput}
          autoCapitalize="none"
          autoCorrect={false}
        />

        {isCorrect !== null && verseWords.length > 0 && (
          <View style={styles.feedbackBox}>
            {verseWords.map((word, i) => {
              const result = wordResults[i];
              let color = isDarkMode ? '#888' : '#aaa';

              if (result === true) color = '#28a745'; // green
              else if (result === false) color = '#dc3545'; // red

              return (
                <Text key={i} style={[styles.word, { color }]}>
                  {word}{' '}
                </Text>
              );
            })}
          </View>
        )}

        <View style={styles.buttonRow}>
          <Button title="Check" onPress={checkInput} />
          <Button title="Try Again" onPress={reset} bgColor={isDarkMode ? '#444' : '#aaa'} />
        </View>

        <View style={styles.extraRow}>
          <TouchableOpacity onPress={() => setShowFullVerse(!showFullVerse)}>
            <Text style={styles.link}>
              {showFullVerse ? 'Hide Full Verse' : 'Show Full Verse'}
            </Text>
          </TouchableOpacity>

          {isCorrect !== null && verseWords.length > 0 && (
            <Text style={styles.scoreText}>
              {correctCount} of {verseWords.length} correct
            </Text>
          )}
        </View>

        {showFullVerse && (
          <Text style={[styles.fullVerse, { color: isDarkMode ? '#ccc' : '#444' }]}>
            {verse}
          </Text>
        )}

        {isCorrect !== null && (
          <Text
            style={[
              styles.resultText,
              { color: isCorrect ? '#28a745' : '#dc3545' },
            ]}
          >
            {isCorrect ? '✅ Perfect match!' : '❌ Not quite — try again'}
          </Text>
        )}

        {isCorrect && <ConfettiCannon count={80} origin={{ x: 200, y: 0 }} fadeOut />}
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

export default TypingModeScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexGrow: 1,
    justifyContent: 'center',
  },
  reference: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    minHeight: 100,
    borderWidth: 1,
    padding: 12,
    fontSize: 16,
    marginBottom: 20,
    borderRadius: 8,
    textAlignVertical: 'top',
  },
  feedbackBox: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  word: {
    fontSize: 16,
    marginRight: 4,
    fontWeight: '500',
  },
  resultText: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 15,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  extraRow: {
    marginTop: 12,
    flexDirection: 'column',
    gap: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  link: {
    color: '#596487',
    fontWeight: '600',
    fontSize: 14,
  },
  scoreText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#888',
    marginTop: 4,
  },
  fullVerse: {
    marginTop: 12,
    textAlign: 'center',
    fontSize: 16,
    fontStyle: 'italic',
  },
});
