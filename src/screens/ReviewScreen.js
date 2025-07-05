import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, Animated, ToastAndroid } from 'react-native';
import { useTheme } from '../../ThemeContext';
import { useNavigation } from '@react-navigation/native';
import { useVerseSettings } from '../../VerseSettingsContext';

const ReviewScreen = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const { chunkSize } = useVerseSettings();
  const route = useRoute();
  const verses = [
    { reference: 'John 3:16', text: 'For God so loved the world...' },
    // Add more verses as needed
  ];

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

  const handlePress = (reference, text) => {
    navigation.navigate('ReviewVerse', { reference, text });
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>

      {verses.map((verse, index) => (
        <Pressable
          key={index}
          onPress={() => handlePress(verse.reference, verse.text)}
          style={styles.pressable}
        >
          <Text style={[styles.headerText, { color: theme.textColor }]}>
            {verse.reference}
          </Text>
        </Pressable>
      ))}
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
    headerText: {
      fontSize: 22,
      fontFamily: 'Rasa-Bold',
      marginBottom: 12,
    },
    verseText: {
      fontSize: 24,
      textAlign: 'center',
      fontFamily: 'Rasa-Regular',
      paddingHorizontal: 12,
    },
    pressable: {
      alignItems: 'center',
      paddingHorizontal: 16,
    },
  });

export default ReviewScreen;
