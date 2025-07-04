import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AppRegistry } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';

import { ThemeProvider } from './ThemeContext';

export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        {/* rest of your app */}
      </NavigationContainer>
    </ThemeProvider>
  );
}

AppRegistry.registerComponent('main', () => App);
