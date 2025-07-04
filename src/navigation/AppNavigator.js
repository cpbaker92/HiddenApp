import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import WeeklyVerseScreen from '../screens/WeeklyVerseScreen';
import ReviewScreen from '../screens/ReviewScreen';
import ReviewVerseScreen from '../screens/ReviewVerseScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Tab = createBottomTabNavigator();
const ReviewStack = createStackNavigator();

const ReviewStackScreen = () => (
  <ReviewStack.Navigator screenOptions={{ headerShown: false }}>
    <ReviewStack.Screen name="ReviewList" component={ReviewScreen} />
    <ReviewStack.Screen name="ReviewVerse" component={ReviewVerseScreen} />
  </ReviewStack.Navigator>
);

const AppNavigator = () => {
  return (
    <Tab.Navigator initialRouteName="Verse" screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Verse" component={WeeklyVerseScreen} />
      <Tab.Screen name="Review" component={ReviewStackScreen} />
      <Tab.Screen name="Add" component={ReviewScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

export default AppNavigator;
