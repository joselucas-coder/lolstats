import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import UpdatesScreen from '../screens/UpdatesScreen';
import ChampionsScreen from '../screens/ChampionsScreen';
import ChampionDetailScreen from '../screens/ChampionDetailScreen'; // 1. Importe a nova tela

const Stack = createNativeStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator 
    >
      <Stack.Screen 
        name="HomeScreen" 
        component={HomeScreen} 
        options={{ headerShown: false }} // Para manter o header da HomeScreen oculto
      />
      <Stack.Screen 
        name="UpdatesScreen" 
        component={UpdatesScreen} 
      />
      <Stack.Screen 
        name="ChampionsScreen" 
        component={ChampionsScreen} 
      />
      {/* 2. Adicione a ChampionDetailScreen à Stack */}
      <Stack.Screen 
        name="ChampionDetail" // Este nome deve corresponder ao usado em navigation.navigate()
        component={ChampionDetailScreen} 
      />
      {/* Se tiver mais telas acessadas a partir da Home, adicione aqui */}
    </Stack.Navigator>
  );
}