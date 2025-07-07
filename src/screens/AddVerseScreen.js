import React, { useState } from 'react';
import {
  View, Text, TextInput, Button,
  ActivityIndicator, StyleSheet, ScrollView
} from 'react-native';
import { fetchVerse } from '../../services/BibleAPI';
import { ToastAndroid } from 'react-native';
import { useTheme } from '../../ThemeContext';
import { useVerseSettings } from '../../VerseSettingsContext';

const API_KEY = '2d6b7fbc2a1e78883e5630f0f9f81971';
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
      const q = encodeURIComponent(query.trim());

      // 1️⃣ Search passgage reference
      // 1️⃣ Search passage reference
      const searchResponse = await fetch(
        `https://api.scripture.api.bible/v1/bibles/${bibleId}/search?query=${q}&limit=1`,
        { headers: { 'api-key': API_KEY } }
      );
      console.log('Search Response:', searchResponse);
      const searchResult = await searchResponse.json();
      console.log('Search Result:', searchResult);
      if (!searchResult?.data?.verses?.length) {
        setError('Verse not found');
        return;
      }
      const ref = searchResult.data.verses[0].reference;

      // 2️⃣ Fetch plain text passage
      const passageResponse = await fetch(
        `https://api.scripture.api.bible/v1/bibles/${bibleId}/passages?reference=${encodeURIComponent(ref)}&content-type=text`,
        { headers: { 'api-key': API_KEY } }
      );
      console.log('Passage Response:', passageResponse);
      const passageJson = await passageResponse.json();
      console.log('Passage JSON:', passageJson);
      if (passageResponse.ok && passageJson?.data?.content) {
        setVerseText(`${ref}\n\n${passageJson.data.content}`);
      } else {
        setError('Could not load verse text');
      }
    } catch (e) {
      console.error(e);
      setError('An error occurred while fetching the verse');
      console.error('Fetch Error:', e);
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
          <Button title="Save Verse" onPress={() => ToastAndroid.show('Verse Saved!', ToastAndroid.SHORT)} />
        </>
      ) : error ? (
        <Text style={styles.error}>{error}</Text>
      ) : null}
    </ScrollView>
  );
};

const getStyles = (theme) => StyleSheet.create({
  container: { flexGrow: 1, backgroundColor: theme.backgroundColor, alignItems: 'center', justifyContent: 'center', padding: 16 },
  input: {
    height: 50, borderRadius: 10, paddingHorizontal: 16, fontSize: 16,
    backgroundColor: theme.mode === 'dark' ? '#333' : '#fff',
    borderColor: theme.textColor, borderWidth: 1, marginBottom: 12, color: theme.textColor, width: '100%',
  },
  header: { fontSize: 20, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' },
  text: { color: theme.textColor, fontSize: 18, textAlign: 'center', marginVertical: 12 },
  error: { color: 'red', fontSize: 16, textAlign: 'center', marginVertical: 12 },
});

export default AddVerseScreen;
