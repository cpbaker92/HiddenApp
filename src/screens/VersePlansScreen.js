import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const VersePlansScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Verse Plans Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default VersePlansScreen;
