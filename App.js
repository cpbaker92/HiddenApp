import React, { useCallback, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { AppRegistry, View } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import { ThemeProvider } from './ThemeContext';
import { VerseSettingsProvider } from './VerseSettingsContext';

SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'Rasa-Regular': require('./assets/fonts/Rasa-Regular.ttf'),
        'Rasa-Bold': require('./assets/fonts/Rasa-Bold.ttf'),
        'Rasa-SemiBold': require('./assets/fonts/Rasa-SemiBold.ttf'),
        'Rasa-Medium': require('./assets/fonts/Rasa-Medium.ttf'),
        'Rasa-Light': require('./assets/fonts/Rasa-Light.ttf'),
        'Rasa-Italic': require('./assets/fonts/Rasa-Italic.ttf'),
        'Rasa-BoldItalic': require('./assets/fonts/Rasa-BoldItalic.ttf'),
        'Rasa-MediumItalic': require('./assets/fonts/Rasa-MediumItalic.ttf'),
        'Rasa-LightItalic': require('./assets/fonts/Rasa-LightItalic.ttf'),
        'Rasa-SemiBoldItalic': require('./assets/fonts/Rasa-SemiBoldItalic.ttf'),

        // Add other custom fonts here if needed
        'Merriweather': require('./assets/fonts/SpaceMono-Regular.ttf'), // Temporary fallback
      });

      setFontsLoaded(true);
    }

    loadFonts();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <VerseSettingsProvider>
        <ThemeProvider>
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
        </ThemeProvider>
      </VerseSettingsProvider>
    </View>
  );
}

AppRegistry.registerComponent('main', () => App);
