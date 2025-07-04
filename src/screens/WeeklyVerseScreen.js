import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';

const WeeklyVerseScreen = () => {
  const [showFullVerse, setShowFullVerse] = useState(true);

  const verse = "The grace of our Lord Jesus Christ be with you all. Amen.";
  const firstLetterOnly = "TGOLJCBWYAA.";

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
  },
  verseText: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default WeeklyVerseScreen;
