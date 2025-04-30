import React from 'react';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import Home from './src/home';
import Pesquisa from './src/Pesquisa';

const Tab = createBottomTabNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    'Jost-Regular': require('./assets/fonts/Jost-Italic-VariableFont_wght.ttf'),
    'Jost-Bold': require('./assets/fonts/Jost-VariableFont_wght.ttf'),
  });

  if (!fontsLoaded) return null;

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: '#fff',
          tabBarInactiveTintColor: '#888',
          tabBarStyle: {
            backgroundColor: '#000',
            borderTopColor: '#18181C',
            height: 60,
            paddingBottom: 5,
          },
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === 'Home') iconName = 'home';
            else if (route.name === 'Pesquisa') iconName = 'search';
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Pesquisa" component={Pesquisa} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
