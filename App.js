import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';

export default function App() {
  useEffect(() => {
    registerForPushNotificationsAsync();
    const subscription = Notifications.addNotificationReceivedListener(notification => {
      console.log(notification);
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
      console.log(token);
    } else {
      alert('Must use physical device for Push Notifications');
    }
  }

  return (
    <View>
      <Text>Welcome to Hidden App!</Text>
    </View>
  );
}
