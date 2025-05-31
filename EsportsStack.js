import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EsportsScreen from './screens/EsportsScreen'; // Seu arquivo principal
import NewsDetailScreen from './screens/NewsDetailScreen'; // A nova tela

const Stack = createNativeStackNavigator();

export default function EsportsStack() {
  return (
    <Stack.Navigator 
        screenOptions={{ 
            headerShown: false, // Esconde o header padrão
        }}
    >
      <Stack.Screen name="EsportsList" component={EsportsScreen} />
      <Stack.Screen name="NewsDetail" component={NewsDetailScreen} />
    </Stack.Navigator>
  );
}