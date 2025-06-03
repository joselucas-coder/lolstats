// screens/HomeScreen.js

import React from 'react';
import {
    View, Text, StyleSheet, TouchableOpacity, Image,
    ScrollView, ImageBackground
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { detailedRolesData as importedRolesData } from '../data/championData';

const patchVersion = '14.10';

const roles = Object.values(importedRolesData);

export default function HomeScreen() {
    const navigation = useNavigation();

    const navigateToChampions = (roleName) => {
        navigation.navigate('ChampionsScreen', { roleName: roleName });
    };

    return (
        <View style={styles.container}>
            <View style={styles.containerConteudo}>
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.mainScrollContent}>
                    <View style={styles.contentWrapper}>

                        <View style={styles.matchOfTheWeekCard}>
                           <View style={[styles.playerCardHalf, styles.playerCardHalfLeft]}>
                                <Image source={{ uri: 'https://liquipedia.net/commons/images/thumb/8/8b/LOUD_allmode.png/900px-LOUD_allmode.png' }} style={styles.teamLogoImage} resizeMode="contain" />
                                <LinearGradient colors={['rgba(0, 170, 84, 0.0)', 'rgba(0, 170, 84, 0.0)', 'rgba(0, 170, 84, 0.6)']} style={[styles.cornerGradient, styles.bottomLeftGradient]} start={{ x: 0.7, y: 0 }} end={{ x: 0.2, y: 1 }} />
                            </View>
                            <View style={[styles.playerCardHalf, styles.playerCardHalfRight]}>
                                 <Image source={{ uri: 'https://liquipedia.net/commons/images/thumb/6/6d/PaiN_Gaming_2017_darkmode.png/900px-PaiN_Gaming_2017_darkmode.png' }} style={styles.teamLogoImage} resizeMode="contain" />
                                <LinearGradient colors={['rgba(237, 27, 36, 0.0)', 'rgba(237, 27, 36, 0.0)', 'rgba(237, 27, 36, 0.6)']} style={[styles.cornerGradient, styles.bottomRightGradient]} start={{ x: 0.3, y: 0 }} end={{ x: 0.8, y: 1 }} />
                            </View>
                            <View style={styles.matchTextOverlay}>
                                <Text style={styles.matchCardTitle}>Partida da Semana:</Text>
                                <Text style={styles.matchCardVsText}>LOUD vs paiN</Text>
                            </View>
                        </View>

                        <View style={styles.section}><Text style={styles.sectionTitle}>Últimas Atualizações</Text></View>
                        <TouchableOpacity onPress={() => navigation.navigate('UpdatesScreen')}>
                            <ImageBackground source={{ uri: 'https://preview.redd.it/spirit-blossom-irelia-splash-art-v0-vyi36bf6bzue1.jpeg?width=1080&crop=smart&auto=webp&s=7354b31b966ee1171746e46ba0a09c7b56babc24' }} style={styles.updateCard} imageStyle={{ borderRadius: 20 }} resizeMode="cover">
                                <LinearGradient colors={['rgba(148, 0, 211, 0.15)', 'rgba(255, 255, 255, 0.10)', 'rgba(148, 0, 211, 0.15)']} style={styles.gradientOverlay} />
                                <Text style={styles.updateCardTitle}>Patch {patchVersion}: Novidades!</Text>
                                <Text style={styles.updateCardSubtitle}>Clique para saber mais</Text>
                            </ImageBackground>
                        </TouchableOpacity>

                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Campeões</Text>
                            <TouchableOpacity onPress={() => navigateToChampions('ALL')}>
                                <Text style={styles.viewMore}>Ver Tudo</Text>
                            </TouchableOpacity>
                        </View>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.rolesContainer}>
                            {roles.map((role) => (
                                <TouchableOpacity
                                    key={role.name}
                                    style={styles.roleButton}
                                    onPress={() => navigateToChampions(role.name)}
                                >
                                    <Image source={role.image} style={{ width: 50, height: 50 }} />
                                    <Text style={styles.roleText}>{role.name}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>

                        <View style={styles.section}><Text style={styles.sectionTitle}>Esports</Text><TouchableOpacity onPress={() => navigation.navigate('EsportsScreen')}><Text style={styles.viewMore}>Ver Mais</Text></TouchableOpacity></View>
                         <View style={styles.matchRow}>
                             <View style={styles.matchCard}><View style={styles.matchColumn}><Image source={{ uri: 'https://liquipedia.net/commons/images/thumb/8/8b/LOUD_allmode.png/900px-LOUD_allmode.png' }} style={styles.teamLogo} /><Text style={styles.teamName}>LOUD</Text></View><Text style={styles.matchScoreText}>0 - 3</Text><View style={styles.matchColumn}><Image source={{ uri: 'https://liquipedia.net/commons/images/thumb/3/3b/Red_Canids_allmode.png/900px-Red_Canids_allmode.png' }} style={styles.teamLogo} /><Text style={styles.teamName}>RED</Text></View></View>
                            <View style={styles.matchCard}><View style={styles.matchColumn}><Image source={{ uri: 'https://liquipedia.net/commons/images/thumb/6/6d/PaiN_Gaming_2017_darkmode.png/900px-PaiN_Gaming_2017_darkmode.png' }} style={styles.teamLogo} /><Text style={styles.teamName}>PAIN</Text></View><Text style={styles.matchScoreText}>2 - 1</Text><View style={styles.matchColumn}><Image source={{ uri: 'https://liquipedia.net/commons/images/thumb/a/ad/FURIA_Esports_full_darkmode.png/900px-FURIA_Esports_full_darkmode.png' }} style={styles.teamLogo} /><Text style={styles.teamName}>FURIA</Text></View></View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#000' },
    containerConteudo: { flex: 1, backgroundColor: '#2B2B33', borderTopLeftRadius: 40, borderTopRightRadius: 40, paddingTop: 30, paddingHorizontal: 17 },
    mainScrollContent: { paddingBottom: 100 },
    contentWrapper: { gap: 12 },
    updateCard: { height: 130, borderRadius: 20, alignItems: 'center', justifyContent: 'center', overflow: 'hidden', position: 'relative', },
    gradientOverlay: { ...StyleSheet.absoluteFillObject, borderRadius: 20, },
    updateCardTitle: { color: '#FFFFFF', fontSize: 18, fontWeight: 'bold', textAlign: 'center', zIndex: 1, textShadowColor: 'rgba(0, 0, 0, 0.8)', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 5, },
    updateCardSubtitle: { color: '#E0E0E0', fontSize: 13, marginTop: 8, zIndex: 1, textShadowColor: 'rgba(0, 0, 0, 0.7)', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 3, },
    matchOfTheWeekCard: { height: 160, borderRadius: 20, flexDirection: 'row', backgroundColor: '#18181C', overflow: 'hidden', position: 'relative', },
    playerCardHalf: { flex: 1, height: '100%', alignItems: 'center', justifyContent: 'center', position: 'relative', },
    playerCardHalfLeft: {},
    playerCardHalfRight: {},
    teamLogoImage: { width: '65%', height: '65%', },
    cornerGradient: { position: 'absolute', bottom: 0, width: '100%', height: '70%', zIndex: -1, },
    bottomLeftGradient: { left: 0, },
    bottomRightGradient: { right: 0, },
    matchTextOverlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center', padding: 10, zIndex: 2, },
    matchCardTitle: { color: '#FFFFFF', fontSize: 20, fontWeight: 'bold', textAlign: 'center', textShadowColor: 'rgba(0, 0, 0, 0.85)', textShadowOffset: { width: 1, height: 2 }, textShadowRadius: 5, marginBottom: 5, },
    matchCardVsText: { color: '#E8E8E8', fontSize: 18, fontWeight: 'bold', textAlign: 'center', textShadowColor: 'rgba(0, 0, 0, 0.85)', textShadowOffset: { width: 1, height: 2 }, textShadowRadius: 5, },
    section: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 },
    sectionTitle: { color: 'white', fontWeight: 'bold', fontSize: 20 },
    viewMore: { color: 'white', fontSize: 12 },
    rolesContainer: { flexDirection: 'row', gap: 25, paddingVertical: 10 },
    roleButton: { backgroundColor: '#18181C', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 20, height: 100, width: 100, justifyContent: 'center', alignItems: 'center' },
    roleText: { color: '#fff', fontWeight: 'bold', marginTop: 5 },
    matchRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
    matchCard: { backgroundColor: '#18181C', flex: 0.48, paddingVertical: 15, paddingHorizontal: 10, borderRadius: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    matchColumn: { alignItems: 'center' },
    teamLogo: { width: 40, height: 40, marginBottom: 5, resizeMode: 'contain' },
    teamName: { color: '#fff', fontSize: 14, fontWeight: 'bold' },
    matchScoreText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});