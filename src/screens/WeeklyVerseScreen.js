import React, { useState } from 'react';
import { useVerseSettings } from '../../VerseSettingsContext';
import { useTheme } from '../../ThemeContext';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Animated,
  ToastAndroid,
} from 'react-native';

// Helper to format week range
const getWeekRange = () => {
  const today = new Date();
  const day = today.getDay();
  const sunday = new Date(today);
  const saturday = new Date(today);
  sunday.setDate(today.getDate() - day);
  saturday.setDate(today.getDate() + (6 - day));

  const format = (date) =>
    date.toLocaleDateString(undefined, {
      month: 'long',
      day: 'numeric',
    });

  return `${format(sunday)} - ${format(saturday)}`;
};

// Helper to chunk first-letter string every 10 chars
const chunkString = (str, size = 10) => {
  const chunks = [];
  for (let i = 0; i < str.length; i += size) {
    chunks.push(str.slice(i, i + size));
  }
  return chunks.join('\n');
};

const WeeklyVerseScreen = () => {
  const { theme } = useTheme();
  const { chunkSize } = useVerseSettings();
  const [showFullVerse, setShowFullVerse] = useState(true);
  const [scale] = useState(new Animated.Value(1));

  const verse =
    'Therefore go and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit.';
  const firstLetterOnly = 'TGAMDOANBTITNOTFSAHS.';

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

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <View style={styles.headerContainer}>
        <Text style={[styles.headerText, { color: theme.textColor }]}>
          Weekly Verse
        </Text>
        <Text style={[styles.dateText, { color: theme.textColor }]}>
          {getWeekRange()}
        </Text>
      </View>

      <Pressable onPress={handleDoubleTap} style={styles.pressable}>
        <Animated.Text
          style={[
            styles.verseText,
            {
              transform: [{ scale }],
              color: theme.textColor,
              fontSize: showFullVerse ? 24 : 32, // Increase font size for first-letter mode
              lineHeight: showFullVerse ? 32 : 40,
            },
          ]}
        >
          {showFullVerse ? verse : chunkString(firstLetterOnly, chunkSize)}
        </Animated.Text>
      </Pressable>

      <Text style={[styles.referenceText, { color: theme.textColor }]}>
        Matthew 28:19 (ESV)
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerContainer: {
    position: 'absolute',
    top: 16,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 22,
    fontFamily: 'Rasa-Bold',
  },
  dateText: {
    fontSize: 14,
    fontFamily: 'Rasa-Regular',
    marginTop: 4,
  },
  verseText: {
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
    fontFamily: 'Rasa-Bold',
    paddingHorizontal: 12,
  },
  pressable: {
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 16,
  },
  referenceText: {
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'Rasa-Regular',
  },
});

export default WeeklyVerseScreen;
