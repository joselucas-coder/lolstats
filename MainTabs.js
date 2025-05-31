// MainTabs.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'react-native';

import HomeStack from './HomeStack';
import SearchScreen from './screens/SearchScreen';
// import EsportsScreen from './screens/EsportsScreen'; // <<< REMOVA ESTA LINHA
import EsportsStack from './EsportsStack';           // <<< ADICIONE ESTA LINHA
import NotificationScreen from './screens/NotificationsScreen';
// import ProfileScreen from './screens/ProfileScreen'; // <<< Você não está usando ProfileScreen nas abas, mas se precisar, mantenha

const Tab = createBottomTabNavigator();
const NEW_ICON_SIZE = 30;

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
          height: 60, 
          borderRadius: 20,
          position: 'absolute',
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
          left: 0,
          right: 0,
          bottom: 0,
        },
        tabBarItemStyle: {
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop:10
        },
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeStack}
        options={{
            tabBarIcon: ({ color, focused }) => (
                <Ionicons name={focused ? 'home' : 'home-outline'} size={NEW_ICON_SIZE} color={color} />
            ),
        }}
      /> 
      <Tab.Screen 
        name="Pesquisa" 
        component={SearchScreen}
        options={{
            tabBarIcon: ({ color }) => (
                <Ionicons name="search" size={NEW_ICON_SIZE} color={color} />
            ),
        }}
      />
      <Tab.Screen
        name="Esports" // <<< MUDEI O NOME AQUI (Opcional, mas recomendado)
        component={EsportsStack} // <<< MUDEI O COMPONENTE AQUI (ESSENCIAL!)
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('./assets/esportslol.png')}
              style={{
                width: 40,
                height: 45,
                tintColor: focused ? '#fff' : '#888',
              }}
            />
          ),
        }}
      />
      <Tab.Screen 
        name="notificação" 
        component={NotificationScreen} 
        options={{
            tabBarIcon: ({ color, focused }) => (
                <Ionicons name={focused ? 'notifications' : 'notifications-outline'} size={NEW_ICON_SIZE} color={color} />
            ),
        }}
      />
      {/* Se você precisar da tela de Perfil, adicione-a aqui */}
      {/* <Tab.Screen name="Perfil" component={ProfileScreen} ... /> */}
    </Tab.Navigator>
  );
}