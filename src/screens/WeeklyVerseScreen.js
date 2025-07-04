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
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  verseText: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
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
  },
});

export default WeeklyVerseScreen;
