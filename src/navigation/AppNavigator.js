import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import WeeklyVerseScreen from '../screens/WeeklyVerseScreen';
import ReviewScreen from '../screens/ReviewScreen';
import ReviewVerseScreen from '../screens/ReviewVerseScreen';
import AddVerseScreen from '../screens/AddVerseScreen';
import SettingsScreen from '../screens/SettingsScreen';

import { VerseSettingsProvider } from '../../VerseSettingsContext';

const Tab = createBottomTabNavigator();
const ReviewStack = createStackNavigator();

function ReviewStackScreen() {
  return (
    <ReviewStack.Navigator screenOptions={{ headerShown: false }}>
      <ReviewStack.Screen name="Review" component={ReviewScreen} />
      <ReviewStack.Screen name="ReviewVerse" component={ReviewVerseScreen} />
    </ReviewStack.Navigator>
  );
}

function Navigator() {
  return (
    <Tab.Navigator initialRouteName="Verse" screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Verse" component={WeeklyVerseScreen} />
      <Tab.Screen name="Review" component={ReviewStackScreen} />
      <Tab.Screen name="Add" component={AddVerseScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <VerseSettingsProvider>
      <Navigator />
    </VerseSettingsProvider>
  );
}
