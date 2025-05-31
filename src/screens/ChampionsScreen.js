import React, { useLayoutEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { detailedRolesData, allChampionsList, getChampionImageUri } from '../data/championData'; // <-- MUDOU PARA ../data/
import { Ionicons } from '@expo/vector-icons';

// Modifique ChampionItem para aceitar onPress e navigation
const ChampionItem = ({ item, onPress }) => (
    <TouchableOpacity onPress={() => onPress(item)} style={styles.championCard}>
        <Image source={{ uri: getChampionImageUri(item.id) }} style={styles.championImage} />
        <View style={styles.championInfo}>
            <Text style={styles.championName}>{item.name}</Text>
            {/* Você pode adicionar mais informações aqui se desejar, como a role primária */}
            <Text style={styles.championWinRate}>Taxa de Vitória: {item.winRate || 'N/A'}</Text>
        </View>
    </TouchableOpacity>
);

export default function ChampionsScreen() {
    const navigation = useNavigation();
    const route = useRoute();
    const { roleName } = route.params;

    const isAllChampions = roleName === 'ALL';
    const championsToShow = isAllChampions
        ? allChampionsList
        : detailedRolesData[roleName]?.champions || [];

    const screenTitle = isAllChampions ? 'Todos os Campeões' : `Campeões - ${roleName}`;

    useLayoutEffect(() => {
        navigation.setOptions({
            title: screenTitle,
            headerShown: true,
            headerStyle: { backgroundColor: '#18181C' },
            headerTintColor: '#fff',
            headerTitleAlign: 'center',
            headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 15 }}>
                    <Ionicons name="arrow-back" size={24} color="#fff" />
                </TouchableOpacity>
            ),
        });
    }, [navigation, screenTitle]);

    // Função para lidar com o clique no campeão
    const handleChampionPress = (champion) => {
        // Navega para a tela ChampionDetailScreen, passando o objeto do campeão
        // Certifique-se de que 'ChampionDetail' está definido no seu Stack Navigator
        navigation.navigate('ChampionDetail', { championData: champion });
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={championsToShow}
                renderItem={({ item }) => (
                    <ChampionItem
                        item={item}
                        onPress={handleChampionPress}
                    />
                )}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContent}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#18181C',
    },
    listContent: {
        padding: 15,
        paddingBottom: 80, // Adiciona padding inferior para evitar sobreposição com TabNavigator, se houver
    },
    championCard: {
        backgroundColor: '#2B2B33',
        borderRadius: 15,
        padding: 15,
        marginBottom: 15,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#333', // Uma borda sutil
        shadowColor: '#000', // Sombra para iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 4, // Sombra para Android
    },
    championImage: {
        width: 60,
        height: 60,
        borderRadius: 30, // Imagem redonda
        marginRight: 15,
        borderWidth: 1,
        borderColor: '#00d9ff', // Borda temática
    },
    championInfo: {
        flex: 1,
    },
    championName: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
        marginBottom: 5,
    },
    championWinRate: {
        fontSize: 14,
        color: '#ccc',
    },
});