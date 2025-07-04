import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';

const WeeklyVerseScreen = () => {
  const [showFullVerse, setShowFullVerse] = useState(true);

  const verse = "Therefore go and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit.";
  const firstLetterOnly = "TGAMDOANBTITNOTFSAHS.";

  return (
    <View style={styles.container}>
      <Text style={styles.verseText}>
        {showFullVerse ? verse : firstLetterOnly}
      </Text>
      <View style={styles.toggleContainer}>
        <Text>Show Full Verse</Text>
        <Switch
          value={showFullVerse}
          onValueChange={setShowFullVerse}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#596487',
  },
  verseText: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'Neue Haas Grotesk Display, sans-serif',
    color: '#FFFFFF',
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default WeeklyVerseScreen;
