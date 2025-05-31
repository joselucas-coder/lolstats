// App.js
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Image, TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';

import { auth } from './src/firebaseConfig'; //
import AuthStack from './src/navigation/AuthStack'; //
import MainTabs from './src/navigation/MainTabs'; //

import ProfileScreen from './src/screens/ProfileScreen'; //
import ConfiguracaoScreen from './src/screens/ConfiguracaoScreen'; //

const Drawer = createDrawerNavigator();

// Componente: Imagem do Perfil no topo
function HeaderProfileImage() { //
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

// Componente: Título do Header Customizado
function CustomHeaderTitle() {
    return (
        <View style={styles.headerTitleContainerStyle2}>
            {/* Opção A: Nome do App */}
            <Text style={styles.headerAppNameStyle2}>Lol Stats</Text>

            {/* Opção B: Imagem da Logo */}
            {/* <Image
                source={require('./src/assets/logo_do_app.png')} // AJUSTE O CAMINHO
                style={styles.headerLogoStyle2}
                resizeMode="contain"
            /> */}
        </View>
    );
}

// Componente: Botão de Voltar para o Drawer
const DrawerBackButton = () => { //
    const navigation = useNavigation();
    return (
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 15 }}>
            <Ionicons name="arrow-back" size={24} color={'#fff'} />
        </TouchableOpacity>
    );
};

export default function App() {
    const [user, setUser] = useState(null); //
    const [loading, setLoading] = useState(true); //

    useEffect(() => { //
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser); //
            setLoading(false); //
        });
        return () => unsubscribe(); //
    }, []);

    if (loading) return null; //

    return (
        <NavigationContainer>
            {user ? (
                <Drawer.Navigator
                    screenOptions={{
                        headerStyle: { backgroundColor: '#000' }, //
                        headerTintColor: '#fff', //
                        headerTitleAlign: 'center', // <<<< ADICIONADO DE VOLTA
                        drawerStyle: { backgroundColor: '#111', width: 240 }, //
                        drawerLabelStyle: { color: '#fff' }, //
                        headerLeft: () => <HeaderProfileImage />, //
                        drawerActiveTintColor: '#00d9ff', //
                        drawerInactiveTintColor: '#fff', //
                    }}
                >
                    <Drawer.Screen
                        name="_"
                        component={MainTabs}
                        options={{
                            headerTitle: () => <CustomHeaderTitle />,
                            drawerLabel: 'Página Inicial', //
                            drawerIcon: ({ color, size }) => (
                                <Ionicons name="home-outline" size={size} color={color} />
                            ),
                        }}
                    />
                    <Drawer.Screen
                        name="perfil"
                        component={ProfileScreen}
                        options={{
                            title: 'Perfil', // Deixando o título padrão para esta tela
                            gestureEnabled: false, //
                            swipeEnabled: false, //
                            headerLeft: () => <DrawerBackButton />, //
                            drawerIcon: ({ color, size }) => (
                                <Ionicons name="person-outline" size={size} color={color} />
                            ),
                        }}
                    />
                    <Drawer.Screen
                        name="Configuracoes"
                        component={ConfiguracaoScreen}
                        options={{
                            title: 'Configurações', // Deixando o título padrão para esta tela
                            headerLeft: () => <DrawerBackButton />,
                            drawerIcon: ({ color, size }) => (
                                <Ionicons name="settings-outline" size={size} color={color} />
                            ),
                        }}
                    />
                </Drawer.Navigator>
            ) : (
                <AuthStack />
            )}
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    // Estilos para Opção 2
    headerTitleContainerStyle2: {
        // Não precisa de flex: 1 se headerTitleAlign: 'center' está no navigator
        // Apenas certifique-se de que o conteúdo interno está como você quer
    },
    headerAppNameStyle2: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    headerLogoStyle2: {
        width: 100, // Ajuste conforme o tamanho da sua logo
        height: 30, // Ajuste conforme o tamanho da sua logo
    },
});