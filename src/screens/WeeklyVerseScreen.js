import React, { useState, useEffect } from 'react';
import { useVerseSettings } from '../../VerseSettingsContext';
import { useTheme } from '../../ThemeContext';
import { View, Text, Pressable, StyleSheet, Animated, Alert, ActivityIndicator } from 'react-native';

// Format week range for header
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

const chunkString = (str, size = 10) => {
  const chunks = [];
  for (let i = 0; i < str.length; i += size) {
    chunks.push(str.slice(i, i + size));
  }
  return chunks.join('\n');
};

const WeeklyVerseScreen = () => {
  const { theme } = useTheme();
  const { chunkSize, translation } = useVerseSettings();
  const [verse, setVerse] = useState('');
  const [loading, setLoading] = useState(false);
  const [showFullVerse, setShowFullVerse] = useState(true);
  const [scale] = useState(new Animated.Value(1));

  useEffect(() => {
    const fetchVerse = async () => {
      setLoading(true);
      try {
        const response = await getVerseText(translation);
        setVerse(response);
      } catch (error) {
        console.error('Error fetching verse:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVerse();
  }, [translation]);
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
    Alert.alert(
      'Mode Changed',
      !showFullVerse ? 'First Letter Mode' : 'Full Verse'
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <Text style={[styles.headerText, { color: theme.textColor }]}>
          Weekly Verse
        </Text>
        <Text style={[styles.dateText, { color: theme.textColor }]}>
          {getWeekRange()}
        </Text>
      </View>

      {/* Verse */}
      <View style={styles.verseContainer}>
        {loading ? (
          <ActivityIndicator size="large" color={theme.textColor} />
        ) : (
          <Pressable onPress={handleDoubleTap} style={styles.pressable}>
          <Animated.Text
            style={[
              styles.verseText,
              {
                transform: [{ scale }],
                color: theme.textColor,
                fontSize: showFullVerse ? 24 : 32,
                lineHeight: showFullVerse ? 32 : 40,
              },
            ]}
          >
            {showFullVerse ? verse : chunkString(firstLetterOnly, chunkSize)}
          </Animated.Text>
          </Pressable>
        )}

        {/* Reference */}
        <Text style={[styles.referenceText, { color: theme.textColor }]}>
          Matthew 28:19 (ESV)
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 48,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  headerContainer: {
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 24,
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
  verseContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  verseText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontFamily: 'Rasa-Bold',
    marginBottom: 20,
  },
  pressable: {
    alignItems: 'center',
    marginBottom: 10,
  },
  referenceText: {
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'Rasa-Regular',
  },
});

export default WeeklyVerseScreen;
