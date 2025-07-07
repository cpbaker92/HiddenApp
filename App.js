import React, { useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { NavigationContainer } from '@react-navigation/native'; // Import NavigationContainer

import { VerseSettingsProvider } from './VerseSettingsContext';
import { ThemeProvider } from './ThemeContext';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  useEffect(() => {
    registerForPushNotificationsAsync();

    const subscription = Notifications.addNotificationReceivedListener(notification => {
      console.log('Notification Received:', notification);
    });

    return () => subscription.remove();
  }, []);

  async function registerForPushNotificationsAsync() {
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }

      const token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log('Push token:', token);
    } else {
      alert('Must use physical device for Push Notifications');
    }
  }

  return (
    <VerseSettingsProvider>
      <ThemeProvider>
        <NavigationContainer> {/* Wrap with NavigationContainer */}
          <AppNavigator />
        </NavigationContainer>
      </ThemeProvider>
    </VerseSettingsProvider>
  );
}
