import React, { useState } from 'react';
import { useTheme } from '../../ThemeContext';
import { View, Text, TextInput, Button, Pressable, StyleSheet, Animated, ToastAndroid } from 'react-native';

const WeeklyVerseScreen = () => {
  const themeContext = useTheme();
console.log('Theme context:', themeContext);
console.log('useTheme():', useTheme());
const { theme } = themeContext || {};
  const [showFullVerse, setShowFullVerse] = useState(true);
  const [scale] = useState(new Animated.Value(1));
  const [showAnswer, setShowAnswer] = useState(false);

  const verse = "Therefore go and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit.";
  const firstLetterOnly = "TGAMDOANBTITNOTFSAHS.";

  const handleDoubleTap = () => {
    setShowFullVerse(prev => !prev);
    Animated.sequence([
      Animated.timing(scale, { toValue: 1.1, duration: 100, useNativeDriver: true }),
      Animated.timing(scale, { toValue: 1, duration: 100, useNativeDriver: true }),
    ]).start();
    ToastAndroid.show(!showFullVerse ? "First Letter Mode" : "Full Verse", ToastAndroid.SHORT);
  };


  return (
    <View style={styles.container}>
      <Pressable onPress={handleDoubleTap} style={styles.pressable}>
        <Animated.Text style={[styles.verseText, { transform: [{ scale }] }]}>
          {showFullVerse ? verse : firstLetterOnly}
        </Animated.Text>
      </Pressable>
      <Text style={styles.referenceText}>Matthew 28:19 (ESV)</Text>
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
  verseText: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'Neue Haas Grotesk Display, sans-serif',
    color: theme.textColor,
    fontWeight: 'bold',
  },
  pressable: {
    alignItems: 'center',
    marginBottom: 10,
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

export default WeeklyVerseScreen;
