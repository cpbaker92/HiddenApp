import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import WeeklyVerseScreen from '../screens/WeeklyVerseScreen';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Verse">
        <Tab.Screen name="Verse" component={WeeklyVerseScreen} />
        <Tab.Screen name="Review" component={HomeScreen} />
        <Tab.Screen name="Add" component={HomeScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
