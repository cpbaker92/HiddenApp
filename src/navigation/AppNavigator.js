import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import WeeklyVerseScreen from '../screens/WeeklyVerseScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <Tab.Navigator initialRouteName="Verse">
      <Tab.Screen name="Verse" component={WeeklyVerseScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
      <Tab.Screen name="Review" component={HomeScreen} />
      <Tab.Screen name="Add" component={HomeScreen} />
    </Tab.Navigator>
  );
};

export default AppNavigator;
