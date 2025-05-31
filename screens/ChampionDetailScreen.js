// screens/ChampionDetailScreen.js
import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, ActivityIndicator, Dimensions } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const DDRAGON_BASE_URL = 'https://ddragon.leagueoflegends.com';
const LANGUAGE = 'pt_BR'; // Você pode mudar para 'en_US' ou outra língua suportada

// Para pegar a largura da tela para a Splash Art
const { width: screenWidth } = Dimensions.get('window');

export default function ChampionDetailScreen() {
    const navigation = useNavigation();
    const route = useRoute();
    // initialChampionData contém o ID e nome básico passado da tela anterior
    const { championData: initialChampionData } = route.params;

    const [championDetails, setChampionDetails] = useState(null);
    const [latestVersion, setLatestVersion] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Configura o header da tela
    useLayoutEffect(() => {
        navigation.setOptions({
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

    // 1. Busca a versão mais recente do Data Dragon
    useEffect(() => {
        const fetchVersion = async () => {
            try {
                const response = await fetch(`${DDRAGON_BASE_URL}/api/versions.json`);
                if (!response.ok) throw new Error('Falha ao buscar versões do DDragon.');
                const versions = await response.json();
                if (versions.length > 0) {
                    setLatestVersion(versions[0]); // Pega a versão mais recente
                } else {
                    throw new Error('Nenhuma versão encontrada.');
                }
            } catch (e) {
                console.error("Erro buscando versão DDragon:", e);
                setError(e.message);
                // Defina uma versão de fallback se a API falhar, por exemplo:
                // setLatestVersion('14.10.1'); // Verifique a última versão manualmente como fallback
                setLoading(false); // Para de carregar se não conseguir a versão
            }
        };
        fetchVersion();
    }, []);

    // 2. Busca os detalhes do campeão quando a versão e o ID estiverem disponíveis
    useEffect(() => {
        if (!latestVersion || !initialChampionData.id) {
            if (latestVersion && !initialChampionData.id) { // Se tem versão mas não ID
                setError("ID do campeão não fornecido.");
                setLoading(false);
            }
            return; // Não faz nada se não tiver versão ou ID do campeão
        }

        const fetchChampionDetails = async () => {
            setLoading(true);
            setError(null);
            try {
                // O ID do campeão deve ser o 'key' usado pelo DDragon (ex: Aatrox, MonkeyKing para Wukong)
                const championId = initialChampionData.id;
                const response = await fetch(`${DDRAGON_BASE_URL}/cdn/${latestVersion}/data/${LANGUAGE}/champion/${championId}.json`);
                
                if (!response.ok) {
                    throw new Error(`Falha ao buscar dados para ${championId} (Status: ${response.status})`);
                }
                const jsonResponse = await response.json();
                setChampionDetails(jsonResponse.data[championId]);
            } catch (e) {
                console.error("Erro buscando detalhes do campeão:", e);
                setError(e.message);
            } finally {
                setLoading(false);
            }
        };

        fetchChampionDetails();
    }, [latestVersion, initialChampionData.id]); // Re-executa se a versão ou ID mudar

    // Renderiza o estado de carregamento
    if (loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#00d9ff" />
                <Text style={styles.loadingText}>Carregando {initialChampionData.name}...</Text>
            </View>
        );
    }

    // Renderiza o estado de erro
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

    // Renderiza se não houver detalhes do campeão (pouco provável se não houve erro)
    if (!championDetails) {
        return (
            <View style={styles.centered}>
                <Text style={styles.errorText}>Detalhes do campeão não encontrados.</Text>
                 <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={styles.linkText}>Voltar</Text>
                </TouchableOpacity>
            </View>
        );
    }

    // URL da Splash Art (skin padrão)
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
                {/* Passiva */}
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
                {/* Habilidades Q, W, E, R */}
                {championDetails.spells.map((spell, index) => {
                    const skillKey = ['Q', 'W', 'E', 'R'][index];
                    const spellImageUrl = `${DDRAGON_BASE_URL}/cdn/${latestVersion}/img/spell/${spell.image.full}`;
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

const styles = StyleSheet.create({
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
        height: screenWidth * 0.58, // Proporção comum para splash arts (aprox. 16:9 ou similar)
        resizeMode: 'cover',
    },
    headerContent: {
        padding: 15,
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)', // Sobreposição para melhor leitura do texto na splash
        marginTop: -80, // Puxa para cima da splash (ajuste conforme necessário)
        paddingTop: 20, // Espaço para não colar no topo da área de texto
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
        marginBottom: 10, // Espaço antes da lore
    },
    section: {
        marginTop: 20, // Espaço após o headerContent ou seção anterior
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
        alignItems: 'flex-start', // Alinha imagem e texto no topo
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
        flex: 1, // Para o texto ocupar o espaço restante
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