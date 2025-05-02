import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Image } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import ChampionsScreen from './screens/ChampionsScreen';
import { Ionicons } from '@expo/vector-icons';
import LoginScreen from './screens/LoginScreen';
import NotificationScreen from './screens/NotificationsScreen';
import SearchScreen from './screens/SearchScreen';
import EsportsScreen from './screens/EsportsScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarShowLabel: false, // <- isso remove o "Home", "Pesquisa", etc.
          tabBarActiveTintColor: 'white',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: { backgroundColor: '#121212',backgroundColor: '#121212',
            borderTopWidth: 0,
            elevation: 0,
            shadowOpacity: 0,
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 50,
             },
          
          tabBarIcon: ({ color, size }) => {
            let iconName = 'home';
            if (route.name === 'Home') iconName = 'home';
            if (route.name === 'Pesquisa') iconName = 'search';
            if (route.name === 'notificação') iconName = 'notifications-outline';
            if (route.name === 'login') iconName = 'person';
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Pesquisa" component={SearchScreen} />
        <Tab.Screen
          name="MeuTab"
          component={EsportsScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <Image
                source={require('./assets/esportslol.png')} // caminho do seu ícone
                style={{
                  width: 30,
                  height: 40,
                  tintColor: focused ? '#fff' : '#888',
                }}
              />
            ),
          }}
/>
        <Tab.Screen name="notificação" component={NotificationScreen} />
        <Tab.Screen name="login" component={LoginScreen} />
       
      </Tab.Navigator>
    </NavigationContainer>
  );
}
