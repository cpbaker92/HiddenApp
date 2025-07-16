import React, { useState } from 'react';
import {
  View, Text, TextInput, ActivityIndicator,
  StyleSheet, ScrollView, ToastAndroid, TouchableOpacity,
} from 'react-native';
import { fetchVerse } from '../../services/BibleAPI';
import { useTheme } from '../../ThemeContext';
import { useVerseSettings } from '../../VerseSettingsContext';

const AddVerseScreen = () => {
  const { theme, mode } = useTheme();
  const { translation } = useVerseSettings();
  const bibleId = translation;
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
      const result = await fetchVerse(query, bibleId);
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
      <TouchableOpacity onPress={handleSearch} style={styles.button}>
        <Text style={styles.buttonText}>Search</Text>
      </TouchableOpacity>

      {loading && <ActivityIndicator size="large" color={theme.textColor} />}

      {verseText ? (
        <>
          <Text style={styles.text}>{verseText}</Text>
          <TouchableOpacity
            onPress={() => ToastAndroid.show('Verse Saved!', ToastAndroid.SHORT)}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Save Verse</Text>
          </TouchableOpacity>
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
      backgroundColor: themeMode === 'dark' ? '#333' : '#fff',
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
    button: {
      backgroundColor: theme.primaryColor,
      padding: 10,
      borderRadius: 5,
      alignItems: 'center',
      marginVertical: 10,
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });

export default AddVerseScreen;
