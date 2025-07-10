// HomeScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { useVerseSettings } from '../../VerseSettingsContext';
import { fetchVerse } from '../../services/BibleAPI';

const HomeScreen = () => {
  const { translation } = useVerseSettings();
  const [verseData, setVerseData] = useState({
    reference: 'Matthew 28:19',
    text: '',
    firstLetterText: '',
  });
  const [showFirstLetterMode, setShowFirstLetterMode] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(1));

  // Dummy streak for now
  const streakCount = 3;

  // Get current week date range (Monday–Sunday)
  const getWeekRange = () => {
    const now = new Date();
    const day = now.getDay();
    const diffToMonday = now.getDate() - day + (day === 0 ? -6 : 1); // Adjust for Sunday being 0
    const monday = new Date(now.setDate(diffToMonday));
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);

    const format = (date) =>
      date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

    return `${format(monday)}–${format(sunday)}`;
  };

  const loadVerse = async () => {
    const result = await fetchVerse(verseData.reference, translation);
    const cleanText = cleanVerseText(result.content);

    setVerseData(prev => ({
      ...prev,
      text: cleanText,
      firstLetterText: generateFirstLetterText(cleanText),
    }));
  };

  useEffect(() => {
    loadVerse();
  }, [translation]);

  const toggleVerseMode = () => {
    Animated.sequence([
      Animated.timing(fadeAnim, { toValue: 0, duration: 150, useNativeDriver: true }),
      Animated.timing(fadeAnim, { toValue: 1, duration: 150, useNativeDriver: true }),
    ]).start(() => {
      setShowFirstLetterMode(prev => !prev);
    });
  };

  const cleanVerseText = (text) => {
    return text
      .replace(/\d+\s*[:.]\s*/g, '') // Remove verse numbers
      .replace(/¶/g, '') // Remove paragraph symbol
      .trim();
  };

  const generateFirstLetterText = (text) => {
    return text
      .split(' ')
      .map(word => word[0]?.toUpperCase() || '')
      .join(' ');
  };

  // Mock translation label (replace with actual mapping if needed)
  const getTranslationLabel = (id) => {
    const map = {
      'de4e12af7f28f599-02': 'ESV',
      '06125adad2d5898a-01': 'NLT',
      '3f5e54d46b5f408f-01': 'CSB',
    };
    return map[id] || id;
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.topBar}>
        <Text style={styles.title}>📖 Weekly Verse · {getWeekRange()}</Text>
        <Text style={styles.streak}>🔥 Streak: {streakCount}</Text>
      </View>

      {/* Main Verse */}
      <TouchableOpacity onPress={toggleVerseMode} activeOpacity={0.8} style={styles.verseWrapper}>
        <Animated.Text style={[styles.verseText, { opacity: fadeAnim }]}>
          {showFirstLetterMode ? verseData.firstLetterText : verseData.text}
        </Animated.Text>
      </TouchableOpacity>

      {/* Reference */}
      <Text style={styles.referenceText}>
        {verseData.reference} ({getTranslationLabel(translation)})
      </Text>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 60,
    paddingHorizontal: 24,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#444',
  },
  streak: {
    fontSize: 14,
    fontWeight: '500',
    color: '#e67e22',
  },
  verseWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  verseText: {
    fontSize: 24,
    textAlign: 'center',
    fontWeight: '600',
    lineHeight: 34,
    color: '#222',
  },
  referenceText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#888',
    fontWeight: '500',
    marginBottom: 40,
  },
});
