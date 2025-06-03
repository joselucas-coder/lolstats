import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import UpdatesScreen from '../screens/UpdatesScreen';
import ChampionsScreen from '../screens/ChampionsScreen';
import ChampionDetailScreen from '../screens/ChampionDetailScreen';

const Stack = createNativeStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator
    >
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="UpdatesScreen"
        component={UpdatesScreen}
      />
      <Stack.Screen
        name="ChampionsScreen"
        component={ChampionsScreen}
      />
      <Stack.Screen
        name="ChampionDetail"
        component={ChampionDetailScreen}
      />
    </Stack.Navigator>
  );
}