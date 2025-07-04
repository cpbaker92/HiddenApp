import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import WeeklyVerseScreen from '../screens/WeeklyVerseScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
<Stack.Screen name="WeeklyVerse" component={WeeklyVerseScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
