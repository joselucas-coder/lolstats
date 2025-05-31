// screens/ChampionDetailScreen.js
import React, { useLayoutEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, ActivityIndicator, Dimensions } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import useChampionDetails from '../hooks/useChampionDetails'; // Seu custom hook

const DDRAGON_BASE_URL = 'https://ddragon.leagueoflegends.com';
const { width: screenWidth } = Dimensions.get('window');

// --- DADOS DE EXEMPLO PARA RUNAS ---
// No aplicativo real, você buscaria os dados completos de runesReforged.json
// e teria uma lógica para determinar as runas "recomendadas".
const sampleRecommendedRunes = {
  primaryTree: {
    name: 'Precisão',
    keystone: {
      id: 'Conqueror',
      name: 'Conquistador',
      icon: 'perk-images/Styles/Precision/Conqueror/Conqueror.png',
      description: 'Ataques ou habilidades que causam dano concedem acúmulos de Força Adaptativa. Com o máximo de acúmulos, converte parte do dano em cura.',
    },
    runes: [
      {
        id: 'Triumph',
        name: 'Triunfo',
        icon: 'perk-images/Styles/Precision/Triumph.png',
        description: 'Abates restauram Vida e concedem ouro adicional.',
      },
      {
        id: 'LegendAlacrity',
        name: 'Lenda: Espontaneidade',
        icon: 'perk-images/Styles/Precision/LegendAlacrity/LegendAlacrity.png',
        description: 'Concede Velocidade de Ataque adicional progressivamente.',
      },
      {
        id: 'CoupDeGrace',
        name: 'Golpe de Misericórdia',
        icon: 'perk-images/Styles/Precision/CoupDeGrace/CoupDeGrace.png',
        description: 'Causa mais dano a Campeões com Vida baixa.',
      },
    ],
  },
  secondaryTree: {
    name: 'Dominação',
    runes: [
      {
        id: 'TasteOfBlood',
        name: 'Gosto de Sangue',
        icon: 'perk-images/Styles/Domination/TasteOfBlood/TasteOfBlood.png',
        description: 'Cura ao causar dano a um Campeão inimigo (Tempo de Recarga).',
      },
      {
        id: 'RavenousHunter', // Nota: Caça Voraz foi removida/alterada, use como exemplo.
        name: 'Caça Voraz (Exemplo Legado)',
        icon: 'perk-images/Styles/Domination/RavenousHunter/RavenousHunter.png',
        description: 'Concede Vampirismo Universal por acúmulo de Caçador de Recompensa.',
      },
    ],
  },
  statShards: [
    {
      id: 'StatModAttackSpeed',
      name: 'Velocidade de Ataque',
      icon: 'perk-images/StatMods/StatModsAttackSpeedIcon.png', // Caminho exato pode variar
      description: '+9% de Velocidade de Ataque',
    },
    {
      id: 'StatModAdaptiveForce',
      name: 'Força Adaptativa',
      icon: 'perk-images/StatMods/StatModsAdaptiveForceIcon.png', // Caminho exato pode variar
      description: '+9 de Força Adaptativa',
    },
    {
      id: 'StatModArmor',
      name: 'Armadura',
      icon: 'perk-images/StatMods/StatModsArmorIcon.png', // Caminho exato pode variar
      description: '+6 de Armadura',
    },
  ],
};
// --- FIM DOS DADOS DE EXEMPLO ---


export default function ChampionDetailScreen() {
    const navigation = useNavigation();
    const route = useRoute();
    const { championData: initialChampionData } = route.params;

    const { championDetails, loading, error, latestVersion } = useChampionDetails(initialChampionData.id);

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

    // ... (seus blocos if (loading), if (error), if (!championDetails) permanecem os mesmos) ...
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
        return (
            <View style={styles.centered}>
                <Text style={styles.errorText}>Detalhes do campeão não encontrados.</Text>
                 <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={styles.linkText}>Voltar</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const splashArtUrl = `${DDRAGON_BASE_URL}/cdn/img/champion/splash/${championDetails.id}_0.jpg`;
    const passiveImageUrl = `${DDRAGON_BASE_URL}/cdn/${latestVersion}/img/passive/${championDetails.passive.image.full}`;

    const buildRuneImageUrl = (iconPath) => `${DDRAGON_BASE_URL}/cdn/img/${iconPath}`;

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
            
            {/* --- SEÇÃO DE RUNAS RECOMENDADAS --- */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Runas Recomendadas</Text>

                {/* Árvore Primária */}
                <Text style={styles.runeTreeTitle}>{sampleRecommendedRunes.primaryTree.name}</Text>
                {[sampleRecommendedRunes.primaryTree.keystone, ...sampleRecommendedRunes.primaryTree.runes].map(rune => (
                    <View key={rune.id} style={styles.runeItem}>
                        <Image source={{ uri: buildRuneImageUrl(rune.icon) }} style={styles.runeImage} />
                        <View style={styles.runeTextContainer}>
                            <Text style={styles.runeName}>{rune.name}</Text>
                            <Text style={styles.runeDescription}>{rune.description}</Text>
                        </View>
                    </View>
                ))}

                {/* Árvore Secundária */}
                <Text style={styles.runeTreeTitle}>{sampleRecommendedRunes.secondaryTree.name}</Text>
                {sampleRecommendedRunes.secondaryTree.runes.map(rune => (
                    <View key={rune.id} style={styles.runeItem}>
                        <Image source={{ uri: buildRuneImageUrl(rune.icon) }} style={styles.runeImage} />
                        <View style={styles.runeTextContainer}>
                            <Text style={styles.runeName}>{rune.name}</Text>
                            <Text style={styles.runeDescription}>{rune.description}</Text>
                        </View>
                    </View>
                ))}

                {/* Fragmentos de Atributo */}
                <Text style={styles.runeTreeTitle}>Fragmentos de Atributo</Text>
                {sampleRecommendedRunes.statShards.map(shard => (
                     <View key={shard.id} style={styles.runeItem}>
                        <Image source={{ uri: buildRuneImageUrl(shard.icon) }} style={styles.runeImage} />
                        <View style={styles.runeTextContainer}>
                            <Text style={styles.runeName}>{shard.name}</Text>
                            <Text style={styles.runeDescription}>{shard.description}</Text>
                        </View>
                    </View>
                ))}
            </View>
            {/* --- FIM DA SEÇÃO DE RUNAS --- */}

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    // ... (seus estilos existentes)
    container: {
        flex: 1,
        backgroundColor: '#18181C',
        marginBottom:40
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
        marginBottom: 15, // Aumentei um pouco para dar espaço antes do conteúdo da seção
    },
    sectionContent: {
        fontSize: 16,
        color: '#ddd',
        lineHeight: 24,
    },
    skillItem: { // Estilo existente para habilidades
        flexDirection: 'row',
        marginBottom: 15,
        alignItems: 'flex-start', 
    },
    skillImage: { // Estilo existente para imagens de habilidades
        width: 50,
        height: 50,
        borderRadius: 8,
        marginRight: 10,
        borderWidth: 1,
        borderColor: '#00d9ff',
    },
    skillTextContainer: { // Estilo existente para texto de habilidades
        flex: 1, 
    },
    skillName: { // Estilo existente para nome de habilidades
        fontSize: 17,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 3,
    },
    skillDescription: { // Estilo existente para descrição de habilidades
        fontSize: 14,
        color: '#bbb',
        lineHeight: 20,
    },
    // --- NOVOS ESTILOS PARA RUNAS ---
    runeTreeTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFD700', // Dourado para destacar a árvore
        marginTop: 15,
        marginBottom: 10,
    },
    runeItem: {
        flexDirection: 'row',
        alignItems: 'center', // Alinha imagem e texto verticalmente
        marginBottom: 12,
        paddingVertical: 8,
        paddingHorizontal: 5,
        backgroundColor: 'rgba(255, 255, 255, 0.05)', // Um fundo sutil para cada item de runa
        borderRadius: 6,
    },
    runeImage: {
        width: 40, // Tamanho um pouco menor que o de habilidades
        height: 40,
        borderRadius: 20, // Deixa redondo
        marginRight: 12,
        borderWidth: 1,
        borderColor: '#777', // Uma borda mais sutil para runas
    },
    runeTextContainer: {
        flex: 1,
    },
    runeName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 2,
    },
    runeDescription: {
        fontSize: 13,
        color: '#aaa',
        lineHeight: 18,
    },
});