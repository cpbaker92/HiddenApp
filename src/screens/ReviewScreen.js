// ReviewScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useVerseSettings } from '../../VerseSettingsContext';

const ReviewScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [selectedVerse, setSelectedVerse] = useState(null);
  const [selectedMode, setSelectedMode] = useState('Flashcard');

  useEffect(() => {
    const { translation } = useVerseSettings();

    if (route.params?.reference && route.params?.text) {
    }
  }, [route.params]);

  const handleModeSelect = (mode) => {
    if (!selectedVerse) return;
    const screenName = `${mode}Mode`;
    navigation.navigate(screenName, {
      reference: selectedVerse.reference,
      text: selectedVerse.text,
      translation: selectedVerse.translation,
    });
  };

  const renderModeButton = (mode) => (
    <TouchableOpacity
      key={mode}
      style={[
        styles.modeButton,
        selectedMode === mode && styles.activeModeButton,
      ]}
      onPress={() => handleModeSelect(mode)}
    >
      <Text
        style={[
          styles.modeButtonText,
          selectedMode === mode && styles.activeModeButtonText,
        ]}
      >
        {mode}
      </Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {selectedVerse ? (
        <>
          <View style={styles.verseBox}>
            <Text style={styles.reference}>
              {selectedVerse.reference} ({selectedVerse.translation})
            </Text>
            <Text style={styles.text} numberOfLines={2}>
              {selectedVerse.text}
            </Text>
          </View>

          <View style={styles.modeContainer}>
            {['Flashcard', 'Typing', 'Quiz', 'Prompt'].map(renderModeButton)}
          </View>
        </>
      ) : (
        <Text style={styles.emptyText}>Select a verse to begin review.</Text>
      )}

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Tap a verse below to review or test your memory.
        </Text>
      </View>
    </ScrollView>
  );
};

export default ReviewScreen;

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  verseBox: {
    backgroundColor: '#f8f8f8',
    padding: 20,
    borderRadius: 16,
    marginBottom: 24,
    width: '100%',
    alignItems: 'center',
  },
  reference: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 6,
    color: '#333',
  },
  text: {
    fontSize: 16,
    color: '#444',
    textAlign: 'center',
  },
  modeContainer: {
    width: '100%',
    gap: 12,
  },
  modeButton: {
    backgroundColor: '#e0e0e0',
    paddingVertical: 14,
    borderRadius: 20,
    alignItems: 'center',
  },
  activeModeButton: {
    backgroundColor: '#596487',
  },
  modeButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#444',
  },
  activeModeButtonText: {
    color: '#fff',
  },
  emptyText: {
    fontSize: 16,
    color: '#777',
    marginTop: 80,
    textAlign: 'center',
  },
  footer: {
    marginTop: 60,
  },
  footerText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
});
