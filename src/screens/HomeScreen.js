import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useTheme } from '../../ThemeContext';
import { useVerseSettings } from '../../VerseSettingsContext';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const { theme } = useTheme();
  const { translation } = useVerseSettings();
  const navigation = useNavigation();

  const styles = getStyles(theme);

  const verseOfTheWeek = {
    reference: 'Matthew 28:19',
    text: 'Go therefore and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit.',
  };

  return (
    <View style={styles.container}>
      {/* Streak + Welcome */}
      <View style={styles.header}>
        <Text style={styles.streak}>🔥 3-day streak</Text>
        <Text style={styles.greeting}>Welcome back, Conner</Text>
      </View>

      {/* Verse of the Week */}
      <TouchableOpacity style={styles.verseCard}>
        <Text style={styles.cardTitle}>Verse of the Week</Text>
        <Text style={styles.verseText}>{verseOfTheWeek.text}</Text>
        <Text style={styles.verseRef}>{verseOfTheWeek.reference} ({translation.toUpperCase()})</Text>
      </TouchableOpacity>

      {/* Start Reviewing */}
      <TouchableOpacity
        style={styles.reviewButton}
        onPress={() => navigation.navigate('MyVerses')}
      >
        <Text style={styles.reviewText}>📖 Start Reviewing</Text>
      </TouchableOpacity>

      {/* Pinned Verse */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>⭐ Pinned Verse</Text>
        <Text style={styles.sectionVerse}>John 3:16 – For God so loved the world...</Text>
      </View>

      {/* Progress */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📊 Your Progress</Text>
        <Text style={styles.sectionText}>You've memorized 12 verses across 3 plans!</Text>
      </View>

      {/* Explore Plans */}
      <TouchableOpacity onPress={() => navigation.navigate('Plans')}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🗺️ Explore Verse Plans</Text>
          <Text style={styles.sectionText}>Find themed plans to boost your memory.</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const getStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.backgroundColor,
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  streak: {
    fontSize: 16,
    color: 'orange',
    fontWeight: '600',
  },
  greeting: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 4,
    color: theme.textColor,
  },
  verseCard: {
    backgroundColor: '#e6f0ff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8,
    color: '#2b4c7e',
  },
  verseText: {
    fontSize: 16,
    marginBottom: 10,
    color: '#1c1c1c',
  },
  verseRef: {
    fontSize: 14,
    color: '#444',
    fontStyle: 'italic',
  },
  reviewButton: {
    backgroundColor: '#2b4c7e',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 24,
  },
  reviewText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 16,
    padding: 14,
    backgroundColor: theme.mode === 'dark' ? '#333' : '#f2f2f2',
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
    color: theme.textColor,
  },
  sectionVerse: {
    fontSize: 14,
    fontStyle: 'italic',
    color: theme.textColor,
  },
  sectionText: {
    fontSize: 14,
    color: theme.textColor,
  },
});

export default HomeScreen;
