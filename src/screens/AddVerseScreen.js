import React, { useState } from 'react';
import { useTheme } from '../../ThemeContext';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const AddVerseScreen = () => {
  const { theme } = useTheme();
  const [verse, setVerse] = useState('');

  const handleAddVerse = () => {
    // Logic to add the verse
    console.log('Verse added:', verse);
    setVerse('');
  };

  return (
<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16, backgroundColor: theme.backgroundColor }}>
  <Text style={{ fontSize: 24, marginBottom: 20, color: theme.textColor }}>Add a New Verse</Text>
  <TextInput
    style={{ height: 40, borderColor: theme.textColor, borderWidth: 1, marginBottom: 10, paddingHorizontal: 10, color: theme.textColor, width: '80%' }}
    value={verse}
    onChangeText={setVerse}
    placeholder="Enter verse here"
    placeholderTextColor={theme.textColor}
  />
  <Button title="Add Verse" onPress={handleAddVerse} />
</View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: theme.backgroundColor,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: theme.textColor,
  },
  input: {
    height: 40,
    borderColor: theme.textColor,
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: theme.textColor,
    width: '80%',
  },
});

export default AddVerseScreen;
