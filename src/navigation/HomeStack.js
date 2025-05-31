// HomeStack.js
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
        // Você pode remover screenOptions={{ headerShown: false }} daqui
        // se quiser que cada tela controle sua própria visibilidade do header
        // como já está sendo feito em ChampionsScreen e ChampionDetailScreen
        // com navigation.setOptions. Ou mantenha, se for o comportamento desejado globalmente.
    >
      <Stack.Screen 
        name="HomeScreen" 
        component={HomeScreen} 
        options={{ headerShown: false }} // Para manter o header da HomeScreen oculto
      />
      <Stack.Screen 
        name="UpdatesScreen" 
        component={UpdatesScreen} 
        // options={{ headerShown: true, title: 'Atualizações' }} // Exemplo se quisesse header aqui
      />
      <Stack.Screen 
        name="ChampionsScreen" 
        component={ChampionsScreen} 
        // O header já está sendo configurado dentro da ChampionsScreen
      />
      {/* 2. Adicione a ChampionDetailScreen à Stack */}
      <Stack.Screen 
        name="ChampionDetail" // Este nome deve corresponder ao usado em navigation.navigate()
        component={ChampionDetailScreen} 
        // O header já está sendo configurado dentro da ChampionDetailScreen
      />
      {/* Se tiver mais telas acessadas a partir da Home, adicione aqui */}
    </Stack.Navigator>
  );
}