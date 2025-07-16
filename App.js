import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from './ThemeContext';
import { VerseProvider } from './src/VerseContext';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from './src/screens/HomeScreen';
import ReviewScreen from './src/screens/ReviewScreen';
import TypingModeScreen from './src/screens/TypingModeScreen';
import QuizModeScreen from './src/screens/QuizModeScreen';
import PromptModeScreen from './src/screens/PromptModeScreen';
import AddVerseScreen from './src/screens/AddVerseScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import MyVersesScreen from './src/screens/MyVersesScreen';
import VerseStatsScreen from './src/screens/VerseStatsScreen';
import VersePlansScreen from './src/screens/VersePlansScreen';

import { VerseSettingsProvider } from './VerseSettingsContext';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

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
    <NavigationContainer>
      <ThemeProvider>
        <VerseProvider>
          <VerseSettingsProvider>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name="MainTabs" component={MainTabs} />
              <Stack.Screen name="Review" component={ReviewScreen} />
              <Stack.Screen name="TypingMode" component={TypingModeScreen} />
              <Stack.Screen name="QuizMode" component={QuizModeScreen} />
              <Stack.Screen name="PromptMode" component={PromptModeScreen} />
            </Stack.Navigator>
          </VerseSettingsProvider>
        </VerseProvider>
      </ThemeProvider>
    </NavigationContainer>
  );
}
