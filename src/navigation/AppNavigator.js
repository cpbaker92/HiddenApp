import React from 'react';
import { VerseProvider } from '../VerseContext';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons'; // for icons

import HomeScreen from '../screens/HomeScreen'; // ✅ New import
import ReviewScreen from '../screens/ReviewScreen';
import TypingModeScreen from '../screens/TypingModeScreen';
import QuizModeScreen from '../screens/QuizModeScreen';
import PromptModeScreen from '../screens/PromptModeScreen';
import AddVerseScreen from '../screens/AddVerseScreen';
import SettingsScreen from '../screens/SettingsScreen';
import MyVersesScreen from '../screens/MyVersesScreen';
import VerseStatsScreen from '../screens/VerseStatsScreen';
import VersePlansScreen from '../screens/VersePlansScreen';

import { VerseSettingsProvider } from '../../VerseSettingsContext';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const ReviewStack = createStackNavigator();

function ReviewStackScreen() {
  return (
    <ReviewStack.Navigator
      screenOptions={{
        headerShown: false,
        animationEnabled: true,
        cardStyleInterpolator: ({ current, layouts }) => ({
          cardStyle: {
            transform: [
              {
                translateX: current.progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [layouts.screen.width, 0],
                }),
              },
            ],
          },
        }),
      }}
    >
      <ReviewStack.Screen name="ReviewHome" component={ReviewScreen} />
      <ReviewStack.Screen name="ReviewVerse" component={ReviewScreen} />
      <ReviewStack.Screen name="TypingMode" component={TypingModeScreen} />
      <ReviewStack.Screen name="QuizMode" component={QuizModeScreen} />
      <ReviewStack.Screen name="PromptMode" component={PromptModeScreen} />
    </ReviewStack.Navigator>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'MyVerses':
              iconName = focused ? 'book' : 'book-outline';
              break;
            case 'Add':
              iconName = focused ? 'add-circle' : 'add-circle-outline';
              break;
            case 'Plans':
              iconName = focused ? 'list' : 'list-outline';
              break;
            case 'Stats':
              iconName = focused ? 'bar-chart' : 'bar-chart-outline';
              break;
            case 'Settings':
              iconName = focused ? 'settings' : 'settings-outline';
              break;
            default:
              iconName = 'ellipse';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#2b4c7e',
        tabBarInactiveTintColor: 'gray',
        tabBarLabelStyle: { fontSize: 12 },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
<Tab.Screen name="MyVerses" component={MyVersesScreen} />
      <Tab.Screen name="Add" component={AddVerseScreen} />
      <Tab.Screen name="Plans" component={VersePlansScreen} />
      <Tab.Screen name="Stats" component={VerseStatsScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <VerseProvider>
      <VerseSettingsProvider>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="MainTabs" component={MainTabs} />
          <Stack.Screen name="Review" component={ReviewScreen} />
        </Stack.Navigator>
      </VerseSettingsProvider>
    </VerseProvider>
  );
}
