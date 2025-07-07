// src/screens/ReviewVerseScreen.js

import React, { useState } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Animated,
  ToastAndroid,
  TouchableOpacity,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useTheme } from '../../ThemeContext';
import { useVerseSettings } from '../../VerseSettingsContext';

const ReviewVerseScreen = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const { chunkSize } = useVerseSettings();
  const route = useRoute();
  const { reference, text } = route.params || {};

  const [showFullVerse, setShowFullVerse] = useState(true);
  const [scale] = useState(new Animated.Value(1));

  const toFirstLetters = (text, size) => {
    const letters = text
      .split(' ')
      .map((word) => word[0])
      .join('');

    const chunks = [];
    for (let i = 0; i < letters.length; i += size) {
      chunks.push(letters.slice(i, i + size));
    }
    return chunks.join('\n');
  };

  const handleDoubleTap = () => {
    setShowFullVerse((prev) => !prev);
    Animated.sequence([
      Animated.timing(scale, {
        toValue: 1.1,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
    ToastAndroid.show(
      !showFullVerse ? 'First Letter Mode' : 'Full Verse',
      ToastAndroid.SHORT
    );
  };

  const styles = getStyles(theme);

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>Back</Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.textColor }]}>Review Verse</Text>
      </View>

      <Text style={[styles.headerText, { color: theme.textColor }]}>
        {reference}
      </Text>

      <Pressable onPress={handleDoubleTap} style={styles.pressable}>
        <Animated.Text
          style={[
            styles.verseText,
            { transform: [{ scale }] },
            { color: theme.textColor },
          ]}
        >
          {showFullVerse ? text : toFirstLetters(text, chunkSize)}
        </Animated.Text>
      </Pressable>
    </View>
  );
};

const getStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 16,
    },
    header: {
      position: 'absolute',
      top: 48,
      left: 0,
      right: 0,
      paddingHorizontal: 16,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    backButton: {
      fontSize: 16,
      color: '#007bff',
    },
    headerTitle: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    headerText: {
      fontSize: 22,
      fontFamily: 'Rasa-Bold',
      marginBottom: 12,
      marginTop: 100,
    },
    verseText: {
      fontSize: 24,
      textAlign: 'center',
      fontFamily: 'Rasa-Regular',
      paddingHorizontal: 12,
    },
    pressable: {
      alignItems: 'center',
      marginBottom: 10,
      paddingHorizontal: 16,
    },
  });

export default ReviewVerseScreen;
