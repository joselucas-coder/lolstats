// MainTabs.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'react-native';

import HomeScreen from './screens/HomeScreen';
import SearchScreen from './screens/SearchScreen';
import EsportsScreen from './screens/EsportsScreen';
import NotificationScreen from './screens/NotificationsScreen';
import ProfileScreen from './screens/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: '#000',
          borderTopWidth: 0,
          elevation: 0,
          height: 65,
          borderRadius: 15,
          position: 'absolute',
        },
        tabBarIcon: ({ color, size }) => {
          let iconName = 'home';
          if (route.name === 'Home') iconName = 'home';
          if (route.name === 'Pesquisa') iconName = 'search';
          if (route.name === 'notificação') iconName = 'notifications-outline';
          if (route.name === 'Perfil') iconName = 'person';
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
              source={require('./assets/esportslol.png')}
              style={{
                width: 35,
                height: 40,
                tintColor: focused ? '#fff' : '#888',
              }}
            />
          ),
        }}
      />
      <Tab.Screen name="notificação" component={NotificationScreen} />
      <Tab.Screen name="Perfil" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
