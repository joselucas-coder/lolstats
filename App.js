// App.js
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';

import { auth } from './firebaseConfig';
import AuthStack from './AuthStack';

// Telas
import HomeScreen from './screens/HomeScreen';
import ChampionsScreen from './screens/ChampionsScreen';
import NotificationScreen from './screens/NotificationsScreen';
import SearchScreen from './screens/SearchScreen';
import EsportsScreen from './screens/EsportsScreen';
import ProfileScreen from './screens/ProfileScreen';
import LoginScreen from './screens/LoginScreen';

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

// 🔹 Componente: Imagem do Perfil no topo
function HeaderProfileImage() {
  const navigation = useNavigation();
  const imageUrl = auth.currentUser?.photoURL || 'https://wallpapers.com/images/hd/meme-profile-picture-2rhxt0ddudotto63.jpg';

  return (
    <TouchableOpacity onPress={() => navigation.openDrawer()}>
      <Image
        source={{ uri: imageUrl }}
        style={{
          width: 35,
          height: 35,
          borderRadius: 50,
          marginLeft: 15,
        }}
      />
    </TouchableOpacity>
  );
}

// 🔹 Tabs (conteúdo principal)
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: '#000000',
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
          paddingTop: 10,
          position: 'absolute',
          left: 0,
          right: 0,
          height: 65,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 15,
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
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
    </Tab.Navigator>
  );
}

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return null;

  return (
    <NavigationContainer>
      {user ? (
        <Drawer.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: '#000' },
            headerTintColor: '#fff',
            headerTitleAlign: 'center',
            drawerStyle: {
              backgroundColor: '#111',
              width: 240,
            },
            drawerLabelStyle: {
              color: '#fff',
            },
            headerLeft: () => <HeaderProfileImage />,
          }}
        >
          <Drawer.Screen
            name="Início"
            component={MainTabs}
            options={{ title: 'Página Inicial',}}
          />
          <Drawer.Screen
            name="perfil"
            component={ProfileScreen}
            options={{ title: 'Perfil',}}
          />
        </Drawer.Navigator>
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  );
}
