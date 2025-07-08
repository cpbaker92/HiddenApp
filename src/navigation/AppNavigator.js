import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import WeeklyVerseScreen from '../screens/WeeklyVerseScreen';
import ReviewScreen from '../screens/ReviewScreen';
import ReviewVerseScreen from '../screens/ReviewVerseScreen';
import FlashcardModeScreen from '../screens/FlashcardModeScreen';
import TypingModeScreen from '../screens/TypingModeScreen';
import QuizModeScreen from '../screens/QuizModeScreen';
import PromptModeScreen from '../screens/PromptModeScreen';
import AddVerseScreen from '../screens/AddVerseScreen';
import SettingsScreen from '../screens/SettingsScreen';
import VerseStatsScreen from '../screens/VerseStatsScreen';
import VersePlansScreen from '../screens/VersePlansScreen';

import { VerseSettingsProvider } from '../../VerseSettingsContext';

const Tab = createBottomTabNavigator();
const ReviewStack = createStackNavigator();

function ReviewStackScreen() {
  return (
    <ReviewStack.Navigator screenOptions={{ headerShown: false }}>
      <ReviewStack.Screen name="Review" component={ReviewScreen} />
      <ReviewStack.Screen name="ReviewVerse" component={ReviewVerseScreen} />
      <ReviewStack.Screen name="FlashcardMode" component={FlashcardModeScreen} />
      <ReviewStack.Screen name="TypingMode" component={TypingModeScreen} />
      <ReviewStack.Screen name="QuizMode" component={QuizModeScreen} />
      <ReviewStack.Screen name="PromptMode" component={PromptModeScreen} />
    </ReviewStack.Navigator>
  );
}

function Navigator() {
  return (
    <Tab.Navigator initialRouteName="Verse" screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Verse" component={WeeklyVerseScreen} />
      <Tab.Screen name="Review" component={ReviewStackScreen} />
      <Tab.Screen name="Add" component={AddVerseScreen} />
      <Tab.Screen name="Plans" component={VersePlansScreen} />
      <Tab.Screen name="Stats" component={VerseStatsScreen} />
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
