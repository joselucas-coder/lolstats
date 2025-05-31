// App.js (CORRIGIDO e COM TELA DE CONFIGURAÇÕES)
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Mantido como você tem
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';

import { auth } from './firebaseConfig';
import AuthStack from './AuthStack';
import MainTabs from './MainTabs';

// Telas (Importe as usadas DIRETAMENTE no Drawer)
import ProfileScreen from './screens/ProfileScreen';
import ConfiguracaoScreen from './screens/ConfiguracaoScreen'; // <<< 1. IMPORTE A TELA AQUI

const Drawer = createDrawerNavigator();

// 🔹 Componente: Imagem do Perfil no topo
function HeaderProfileImage() {
    const navigation = useNavigation();
    const imageUrl = auth.currentUser?.photoURL || 'https://wallpapers.com/images/hd/meme-profile-picture-2rhxt0ddudotto63.jpg';

    return (
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Image
                source={{ uri: imageUrl }}
                style={{ width: 35, height: 35, borderRadius: 50, marginLeft: 15 }}
            />
        </TouchableOpacity>
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

    // Função para o botão de voltar no ProfileScreen dentro do Drawer
    const DrawerBackButton = () => {
        const navigation = useNavigation();
        return (
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 15 }}>
                <Ionicons name="arrow-back" size={24} color={'#fff'} />
            </TouchableOpacity>
        );
    };


    return (
        <NavigationContainer>
            {user ? (
                <Drawer.Navigator
                    screenOptions={{
                        headerStyle: { backgroundColor: '#000' },
                        headerTintColor: '#fff',
                        headerTitleAlign: 'center',
                        drawerStyle: { backgroundColor: '#111', width: 240 },
                        drawerLabelStyle: { color: '#fff' },
                        headerLeft: () => <HeaderProfileImage />,
                        drawerActiveTintColor: '#00d9ff', // Cor para o item ativo (opcional)
                        drawerInactiveTintColor: '#fff', // Cor para itens inativos
                    }}
                >
                    <Drawer.Screen
                        name="_"
                        component={MainTabs}
                        options={{
                            title: 'Página Inicial',
                            drawerIcon: ({ color, size }) => ( // Ícone opcional para Home
                                <Ionicons name="home-outline" size={size} color={color} />
                            ),
                         }}
                    />
                    <Drawer.Screen
                        name="perfil"
                        component={ProfileScreen}
                        options={{
                            title: 'Perfil',
                            gestureEnabled: false,
                            swipeEnabled: false,
                            headerLeft: () => <DrawerBackButton />,
                            drawerIcon: ({ color, size }) => ( // Ícone para Perfil
                                <Ionicons name="person-outline" size={size} color={color} />
                            ),
                        }}
                    />

                    {/* --- 👇👇👇 2. ADICIONE A TELA DE CONFIGURAÇÕES AQUI 👇👇👇 --- */}
                    <Drawer.Screen
                        name="Configuracoes"
                        component={ConfiguracaoScreen}
                        options={{
                            title: 'Configurações', // Texto no Drawer
                            drawerIcon: ({ color, size }) => ( // Ícone de engrenagem
                                <Ionicons name="settings-outline" size={size} color={color} />
                            ),
                        }}
                    />
                    {/* --- 👆👆👆 FIM DA ADIÇÃO 👆👆👆 --- */}

                </Drawer.Navigator>
            ) : (
                <AuthStack />
            )}
        </NavigationContainer>
    );
}