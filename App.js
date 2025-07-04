import React from 'react';
import { ThemeProvider } from './ThemeContext';
import { AppRegistry } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <ThemeProvider>
      <AppNavigator />
    </ThemeProvider>
  );
}

AppRegistry.registerComponent('main', () => App);
