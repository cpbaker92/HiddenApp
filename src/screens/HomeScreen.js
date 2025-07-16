// HomeScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { useVerseSettings } from '../../VerseSettingsContext';
import { getVerse, stripHtmlTags } from '../../services/BibleAPI';

const HomeScreen = () => {
  const { translation } = useVerseSettings();
  const [verseData, setVerseData] = useState({
    reference: 'Matthew 28:19',
    verseId: 'MAT.28.19',
    text: '',
    firstLetterText: '',
  });
  const [showFirstLetterMode, setShowFirstLetterMode] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(1));
  const [error, setError] = useState(null);

  const streakCount = 3;

  const getWeekRange = () => {
    const now = new Date();
    const day = now.getDay();
    const diffToMonday = now.getDate() - day + (day === 0 ? -6 : 1);
    const monday = new Date(now.setDate(diffToMonday));
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);

    const format = (date) =>
      date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

    return `${format(monday)}–${format(sunday)}`;
  };

  const loadVerse = async () => {
    try {
      const result = await getVerse(translation, verseData.verseId);
      const clean = stripHtmlTags(result.data.content).trim();
      setVerseData(prev => ({
        ...prev,
        text: clean,
        firstLetterText: generateFirstLetterText(clean),
      }));
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Could not load verse.');
    }
  };

  useEffect(() => {
    loadVerse();
  }, [translation]);

  const toggleVerseMode = () => {
    Animated.timing(fadeAnim, {
      toValue: 0.5,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setShowFirstLetterMode(prev => !prev);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });
  };

  const generateFirstLetterText = (text) => {
    return text
      .split(' ')
      .map(word => word[0]?.toUpperCase() || '')
      .join(' ');
  };

  const translationMap = {
    '06125adad2d5898a-01': 'KJV',
    '46eecb412d56dfb7-02': 'CSB',
    'bba9f40183526463-01': 'NIV',
    'de4e12af7f28f599-02': 'ESV',
    'fa0eeb8af176a5c0-01': 'NLT',
  };

  const getTranslationLabel = (id) => {
    return translationMap[id] || 'Unknown';
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.title}>📖 Weekly Verse · {getWeekRange()}</Text>
        <Text style={styles.streak}>🔥 Streak: {streakCount}</Text>
      </View>

      <TouchableOpacity
        onPress={toggleVerseMode}
        activeOpacity={0.8}
        style={styles.verseWrapper}
      >
        <Animated.Text style={[styles.verseText, { opacity: fadeAnim }]}>
          {error ? error : (showFirstLetterMode ? verseData.firstLetterText : verseData.text)}
        </Animated.Text>
      </TouchableOpacity>

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
