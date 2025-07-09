import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const CustomSplashScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/splash-logo.png')}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.text}>Hidden: Scripture Memorization</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  image: {
    width: '24%',
    height: '24%',
  },
  text: {
    position: 'absolute',
    bottom: 20,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#303558',
  },
});

export default CustomSplashScreen;
