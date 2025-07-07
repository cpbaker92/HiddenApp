import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useTheme } from '../../ThemeContext';
import { useVerseSettings } from '../../VerseSettingsContext';

const AddVerseScreen = () => {
  const { theme } = useTheme();
  const { translation } = useVerseSettings();
  const styles = getStyles(theme);

  const [searchQuery, setSearchQuery] = useState('');
  const [verseText, setVerseText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    setLoading(true);
    setError('');
    setVerseText('');

    try {
      const encodedQuery = encodeURIComponent(searchQuery.trim());
      const response = await fetch(
        `https://bible-api.com/${encodedQuery}?translation=${translation}`
      );
      const data = await response.json();

      if (response.ok && data.text) {
        setVerseText(`${data.reference}\n\n${data.text}`);
      } else {
        setError('Verse not found');
      }
    } catch (err) {
      setError('An error occurred while fetching the verse');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={[styles.header, { color: theme.textColor }]}>
        Search for a verse to add
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Enter verse (e.g., John 3:16)"
        placeholderTextColor={theme.textColor}
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <Button title="Search" onPress={handleSearch} />

      {loading && <ActivityIndicator size="large" color={theme.textColor} />}

      {verseText ? (
        <>
          <Text style={styles.text}>{verseText}</Text>
          <Button title="Save Verse" onPress={() => { /* Save logic to be implemented */ }} />
        </>
      ) : null}

      {error ? (
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
      paddingHorizontal: 8,
      color: theme.textColor,
      width: '100%',
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
    header: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 16,
      textAlign: 'center',
    },
  });

export default AddVerseScreen;
