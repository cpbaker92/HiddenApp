import React, { useState } from 'react';
import { useTheme } from '../../ThemeContext';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Animated,
  ToastAndroid,
} from 'react-native';

// Helper function to calculate current week's Sunday–Saturday range
const getWeekRange = () => {
  const today = new Date();
  const day = today.getDay(); // 0 = Sunday
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

const WeeklyVerseScreen = () => {
  const { theme } = useTheme();
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
            { transform: [{ scale }] },
            { color: theme.textColor },
          ]}
        >
          {showFullVerse ? verse : firstLetterOnly}
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
    fontWeight: '600',
    fontFamily: undefined, // default system font
  },
  dateText: {
    fontSize: 14,
    fontWeight: '400',
    marginTop: 4,
    fontFamily: undefined, // default system font
  },
  verseText: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
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
