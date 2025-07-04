import React, { useState } from 'react';
import { useTheme } from '../ThemeContext';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const ReviewScreen = () => {
  const { theme } = useTheme();
  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);

  const verse = "Therefore go and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit.";
  const firstLetterOnly = "TGAMDOANBTITNOTFSAHS.";

  const checkAnswer = () => {
    const normalizedInput = userInput.toLowerCase().replace(/[^a-z]/g, '');
    const normalizedVerse = verse.toLowerCase().replace(/[^a-z]/g, '');
    if (normalizedInput === normalizedVerse) {
      setFeedback('✅ Great job!');
    } else {
      setFeedback('❌ Not quite. Try again.');
    }
    setUserInput('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.referenceText}>Matthew 28:19</Text>
      {showAnswer && <Text style={styles.hintText}>{verse}</Text>}
      <Text style={styles.hintText}>{firstLetterOnly}</Text>
      <TextInput
        style={styles.input}
        value={userInput}
        onChangeText={setUserInput}
        placeholder="Type the verse here"
      />
      <Button title="Check Answer" onPress={checkAnswer} />
      {feedback && <Text style={styles.feedbackText}>{feedback}</Text>}
      {feedback.includes('❌') && (
        <Button title="Show Answer" onPress={() => setShowAnswer(true)} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: theme.backgroundColor,
  },
  referenceText: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 10,
    color: theme.textColor,
  },
  hintText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
    color: theme.textColor,
  },
  input: {
    height: 40,
    borderColor: theme.textColor,
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: theme.textColor,
    width: '80%',
  },
  feedbackText: {
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 10,
    color: theme.textColor,
  },
});

export default ReviewScreen;
