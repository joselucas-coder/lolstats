// screens/ChampionDetailScreen.js
import React, { useLayoutEffect } from 'react'; // Removido useState e useEffect daqui
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, ActivityIndicator, Dimensions } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import useChampionDetails from '../hooks/useChampionDetails'; // <<< 1. IMPORTE O CUSTOM HOOK

const DDRAGON_BASE_URL = 'https://ddragon.leagueoflegends.com'; // Pode manter se for usar para construir URLs de imagem diretamente aqui

const { width: screenWidth } = Dimensions.get('window');

export default function ChampionDetailScreen() {
    const navigation = useNavigation();
    const route = useRoute();
    const { championData: initialChampionData } = route.params; // Contém o ID do campeão

    //                                championId (ex: 'Aatrox')
    //                                     vvvvvvvvvvvvvvvvvvvvvvvv
    const { championDetails, loading, error, latestVersion } = useChampionDetails(initialChampionData.id); // <<< 2. USE O HOOK

    useLayoutEffect(() => {
        navigation.setOptions({
            // Usa championDetails do hook se disponível, senão o nome inicial
            title: championDetails ? championDetails.name : initialChampionData.name,
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
    }, [navigation, initialChampionData.name, championDetails]);


    if (loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#00d9ff" />
                <Text style={styles.loadingText}>Carregando {initialChampionData.name}...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.centered}>
                <Text style={styles.errorText}>Erro ao carregar: {error}</Text>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={styles.linkText}>Voltar</Text>
                </TouchableOpacity>
            </View>
        );
    }

    if (!championDetails) {
        // Este estado pode acontecer brevemente ou se houver um erro não capturado
        return (
            <View style={styles.centered}>
                <Text style={styles.errorText}>Detalhes do campeão não encontrados.</Text>
                 <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={styles.linkText}>Voltar</Text>
                </TouchableOpacity>
            </View>
        );
    }

    // Construção de URLs de imagem (pode usar 'latestVersion' do hook)
    const splashArtUrl = `${DDRAGON_BASE_URL}/cdn/img/champion/splash/${championDetails.id}_0.jpg`;
    const passiveImageUrl = `${DDRAGON_BASE_URL}/cdn/${latestVersion}/img/passive/${championDetails.passive.image.full}`;

    return (
        <ScrollView style={styles.container}>
            <Image source={{ uri: splashArtUrl }} style={styles.splashImage} />
            
            <View style={styles.headerContent}>
                <Text style={styles.championName}>{championDetails.name}</Text>
                <Text style={styles.championTitle}>{championDetails.title}</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Lore</Text>
                <Text style={styles.sectionContent}>{championDetails.lore.replace(/<br><br>/g, '\n\n')}</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Funções (Tags)</Text>
                <Text style={styles.sectionContent}>
                    {championDetails.tags.join(', ')}
                </Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Habilidades</Text>
                <View style={styles.skillItem}>
                    <Image 
                        source={{ uri: passiveImageUrl }} 
                        style={styles.skillImage} 
                    />
                    <View style={styles.skillTextContainer}>
                        <Text style={styles.skillName}>{championDetails.passive.name} (Passiva)</Text>
                        <Text style={styles.skillDescription}>{championDetails.passive.description.replace(/<[^>]+>/g, '')}</Text>
                    </View>
                </View>
                {championDetails.spells.map((spell, index) => {
                    const skillKey = ['Q', 'W', 'E', 'R'][index];
                    const spellImageUrl = `${DDRAGON_BASE_URL}/cdn/${latestVersion}/img/spell/${spell.image.full}`; // Usa latestVersion do hook
                    return (
                        <View key={spell.id} style={styles.skillItem}>
                            <Image 
                                source={{ uri: spellImageUrl }} 
                                style={styles.skillImage} 
                            />
                            <View style={styles.skillTextContainer}>
                                <Text style={styles.skillName}>{spell.name} ({skillKey})</Text>
                                <Text style={styles.skillDescription}>{spell.description.replace(/<[^>]+>/g, '')}</Text>
                            </View>
                        </View>
                    );
                })}
            </View>
            
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Runas Recomendadas</Text>
                <Text style={styles.sectionContent}>
                    Informações sobre runas recomendadas não são fornecidas diretamente pela API Data Dragon.
                    Para obter essas informações, seria necessário integrar uma API de terceiros (ex: de sites como U.GG, OP.GG)
                    ou adicionar manualmente esses dados.
                </Text>
            </View>
        </ScrollView>
    );
}

// Seus estilos permanecem os mesmos
const styles = StyleSheet.create({
    // ... (copie os estilos da sua tela ChampionDetailScreen aqui)
    // ... (coloquei os estilos relevantes abaixo para referência) ...
    container: {
        flex: 1,
        backgroundColor: '#18181C',
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#18181C',
        padding: 20,
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: '#fff',
    },
    errorText: {
        fontSize: 16,
        color: 'red',
        textAlign: 'center',
        marginBottom: 10,
    },
    linkText: {
        fontSize: 16,
        color: '#00d9ff',
        marginTop: 10,
    },
    splashImage: {
        width: screenWidth,
        height: screenWidth * 0.58, 
        resizeMode: 'cover',
    },
    headerContent: {
        padding: 15,
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)', 
        marginTop: -80, 
        paddingTop: 20, 
    },
    championName: {
        fontSize: 28,
        fontWeight: 'bold',
        color: 'white',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 10
    },
    championTitle: {
        fontSize: 18,
        color: '#ccc',
        fontStyle: 'italic',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 10,
        marginBottom: 10,
    },
    section: {
        marginTop: 20, 
        paddingHorizontal: 20,
        paddingBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#25252A',
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#00d9ff',
        marginBottom: 10,
    },
    sectionContent: {
        fontSize: 16,
        color: '#ddd',
        lineHeight: 24,
    },
    skillItem: {
        flexDirection: 'row',
        marginBottom: 15,
        alignItems: 'flex-start', 
    },
    skillImage: {
        width: 50,
        height: 50,
        borderRadius: 8,
        marginRight: 10,
        borderWidth: 1,
        borderColor: '#00d9ff',
    },
    skillTextContainer: {
        flex: 1, 
    },
    skillName: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 3,
    },
    skillDescription: {
        fontSize: 14,
        color: '#bbb',
        lineHeight: 20,
    },
});