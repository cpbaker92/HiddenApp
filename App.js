// App.js
import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import CustomSplashScreen from './src/components/CustomSplashScreen';
import { NavigationContainer } from '@react-navigation/native';

import { VerseSettingsProvider } from './VerseSettingsContext';
import { ThemeProvider } from './ThemeContext';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  const [isReady, setIsReady] = React.useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const prepare = async () => {
      try {
        SplashScreen.preventAutoHideAsync();
        await new Promise(resolve => setTimeout(resolve, 3700)); // wait 3.7 sec
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }).start(() => {
          setIsReady(true);
          SplashScreen.hideAsync();
        });
      } catch (e) {
        console.warn(e);
      }
    };
    prepare();
    registerForPushNotificationsAsync();
    scheduleDailyReminder();

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

  async function scheduleDailyReminder() {
    const trigger = new Date(Date.now() + 24 * 60 * 60 * 1000);
    trigger.setHours(9, 0, 0);

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Time to Practice!",
        body: "Don't forget to review your verses today.",
      },
      trigger,
    });
  }


  return (
    <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
      {isReady ? (
        <ThemeProvider>
          <VerseSettingsProvider>
            <NavigationContainer>
              <AppNavigator />
            </NavigationContainer>
          </VerseSettingsProvider>
        </ThemeProvider>
      ) : (
        <CustomSplashScreen />
      )}
    </Animated.View>
  );
}
