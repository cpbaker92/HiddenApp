import React, { useState } from 'react';
import {
  View, Text, TextInput, Button,
  ActivityIndicator, StyleSheet, ScrollView, ToastAndroid
} from 'react-native';
import { fetchVerse } from '../../services/BibleAPI';
import { useTheme } from '../../ThemeContext';
import { useVerseSettings } from '../../VerseSettingsContext';

const BIBLE_ID = 'de4e12af7f28f599-02'; // ESV

const AddVerseScreen = () => {
  const { theme } = useTheme();
  const { translation } = useVerseSettings();
  const bibleId = translation || BIBLE_ID;
  const styles = getStyles(theme);

  const [query, setQuery] = useState('');
  const [verseText, setVerseText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    setLoading(true);
    setError('');
    setVerseText('');

    try {
      console.log('Searching for:', query);
      const result = await fetchVerse(query, bibleId);
      console.log('fetchVerse result:', result);

      if (result && result.content) {
        setVerseText(`${query}\n\n${result.content}`);
      } else {
        setError('Verse not found.');
      }
    } catch (e) {
      console.error('Error in handleSearch:', e);
      setError('An error occurred while fetching the verse.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <Text style={[styles.header, { color: theme.textColor }]}>
        Search for a verse to add
      </Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. John 3:16"
        placeholderTextColor={theme.textColor}
        value={query}
        onChangeText={setQuery}
      />
      <Button title="Search" onPress={handleSearch} />

      {loading && <ActivityIndicator size="large" color={theme.textColor} />}

      {verseText ? (
        <>
          <Text style={styles.text}>{verseText}</Text>
          <Button
            title="Save Verse"
            onPress={() => ToastAndroid.show('Verse Saved!', ToastAndroid.SHORT)}
          />
        </>
      ) : error ? (
        <Text style={styles.error}>{error}</Text>
      ) : null}
    </ScrollView>
  );
};

const getStyles = (theme) =>
  StyleSheet.create({
    container: {
      flexGrow: 1,
      backgroundColor: theme.backgroundColor,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 16,
    },
    input: {
      height: 50,
      borderRadius: 10,
      paddingHorizontal: 16,
      fontSize: 16,
      backgroundColor: theme.mode === 'dark' ? '#333' : '#fff',
      borderColor: theme.textColor,
      borderWidth: 1,
      marginBottom: 12,
      color: theme.textColor,
      width: '100%',
    },
    header: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 16,
      textAlign: 'center',
    },
    text: {
      color: theme.textColor,
      fontSize: 18,
      textAlign: 'center',
      marginVertical: 12,
    },
    error: {
      color: 'red',
      fontSize: 16,
      textAlign: 'center',
      marginVertical: 12,
    },
  });

export default AddVerseScreen;
