import React, { useState } from 'react';
import { View, Text, TextInput, Button, ActivityIndicator, StyleSheet } from 'react-native';
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
      const response = await fetch(`https://bible-api.com/${searchQuery}?translation=${translation}`);
      const data = await response.json();

      if (response.ok) {
        setVerseText(data.text);
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
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter verse (e.g., John 3:16)"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <Button title="Search" onPress={handleSearch} />
      {loading && <ActivityIndicator size="large" color={theme.textColor} />}
      {verseText ? <Text style={styles.text}>{verseText}</Text> : null}
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
};

const getStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.backgroundColor,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 16,
    },
    input: {
      height: 40,
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
  });

export default AddVerseScreen;
