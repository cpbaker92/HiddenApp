import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useTheme } from '../../ThemeContext';
import { useNavigation } from '@react-navigation/native';
import { useVerseSettings } from '../../VerseSettingsContext';

const ReviewScreen = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const { chunkSize } = useVerseSettings();

  const verses = [
    { reference: 'John 3:16', text: 'For God so loved the world...' },
    // Add more verses here as needed
  ];

  const styles = getStyles(theme);

  const handlePress = (reference, text) => {
    navigation.navigate('ReviewVerse', { reference, text });
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <Text style={[styles.title, { color: theme.textColor }]}>Review</Text>
      <Text style={[styles.subtitle, { color: theme.textColor }]}>
        Tap a verse below to review or test your memory.
      </Text>

      {verses.map((verse, index) => (
        <Pressable
          key={index}
          onPress={() => handlePress(verse.reference, verse.text)}
          style={styles.pressable}
        >
          <Text style={[styles.verseItem, { color: theme.textColor }]}>
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
      justifyContent: 'flex-start',
      padding: 20,
    },
    title: {
      fontSize: 26,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    subtitle: {
      fontSize: 16,
      marginBottom: 20,
      textAlign: 'center',
    },
    pressable: {
      padding: 14,
      marginVertical: 6,
      borderRadius: 10,
      backgroundColor: theme.mode === 'dark' ? '#2a2a2a' : '#f0f0f0',
      width: '100%',
      alignItems: 'center',
    },
    verseItem: {
      fontSize: 18,
      fontFamily: 'Rasa-Bold',
    },
  });

export default ReviewScreen;
