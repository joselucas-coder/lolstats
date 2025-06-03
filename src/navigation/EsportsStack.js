import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EsportsScreen from '../screens/EsportsScreen';
import NewsDetailScreen from '../screens/NewsDetailScreen';

const Stack = createNativeStackNavigator();

export default function EsportsStack() {
  return (
    <Stack.Navigator
        screenOptions={{
            headerShown: false,
        }}
    >
      <Stack.Screen name="EsportsList" component={EsportsScreen} />
      <Stack.Screen name="NewsDetail" component={NewsDetailScreen} />
    </Stack.Navigator>
  );
}