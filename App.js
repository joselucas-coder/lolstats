import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
    createDrawerNavigator,
    DrawerContentScrollView, // Importado
    DrawerItemList,         // Importado
    DrawerItem              // Importado
} from '@react-navigation/drawer';
import { Image, TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { onAuthStateChanged, signOut } from 'firebase/auth'; // signOut importado
import { useNavigation } from '@react-navigation/native';

import { auth } from './firebaseConfig';
import AuthStack from './src/navigation/AuthStack';
import MainTabs from './src/navigation/MainTabs';
import ProfileScreen from './src/screens/ProfileScreen';

const Drawer = createDrawerNavigator();
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
function CustomHeaderTitle() {
    return (
        <View style={styles.headerTitleContainerStyle2}>
            <Text style={styles.headerAppNameStyle2}>Lol Stats</Text>
        </View>
    );
}
const DrawerBackButton = () => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 15 }}>
            <Ionicons name="arrow-back" size={24} color={'#fff'} />
        </TouchableOpacity>
    );
};
function CustomDrawerContent(props) {
    const handleLogout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error("Erro ao fazer logout: ", error);
        }
    };

    return (
        <DrawerContentScrollView {...props} style={{ backgroundColor: '#111' /* Mantém o estilo do drawer */ }}>
            <DrawerItemList {...props} />
            <DrawerItem
                label="Sair do App"
                labelStyle={{ color: '#fff' }} // Estilo do texto
                icon={({ color, size }) => ( // Ícone
                    <Ionicons name="log-out-outline" size={size} color={'#fff'} /* Cor do ícone */ />
                )}
                onPress={handleLogout}
                inactiveTintColor="#fff" // Garante que a cor do ícone e texto seja branca quando inativo
            />
        </DrawerContentScrollView>
    );
}


export default function App() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    if (loading) return null;

    return (
        <NavigationContainer>
            {user ? (
                <Drawer.Navigator
                    drawerContent={props => <CustomDrawerContent {...props} />}
                    screenOptions={{
                        headerStyle: { backgroundColor: '#000' },
                        headerTintColor: '#fff',
                        headerTitleAlign: 'center',
                        drawerStyle: { backgroundColor: '#111', width: 240 },
                        drawerLabelStyle: { color: '#fff' },
                        headerLeft: () => <HeaderProfileImage />,
                        drawerActiveTintColor: '#00d9ff',
                        drawerInactiveTintColor: '#fff',
                    }}
                >
                    <Drawer.Screen
                        name="_"
                        component={MainTabs}
                        options={{
                            headerTitle: () => <CustomHeaderTitle />,
                            drawerLabel: 'Página Inicial',
                            drawerIcon: ({ color, size }) => (
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
                            drawerIcon: ({ color, size }) => (
                                <Ionicons name="person-outline" size={size} color={color} />
                            ),
                        }}
                    />
                    {/* A TELA DE CONFIGURAÇÕES FOI REMOVIDA DAQUI */}
                </Drawer.Navigator>
            ) : (
                <AuthStack />
            )}
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    headerTitleContainerStyle2: {
    },
    headerAppNameStyle2: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    headerLogoStyle2: {
        width: 100,
        height: 30,
    },
});