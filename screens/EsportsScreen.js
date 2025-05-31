import React, { useState } from 'react';
import {
    View, Text, Image, ScrollView, StyleSheet,
    TouchableOpacity, ImageBackground, Linking, Dimensions
} from 'react-native';
import { Table, Row } from 'react-native-table-component'; // Usamos Row, não Rows
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

// --- DADOS DAS LIGAS ---
const leagues = [
    { name: 'LCK', image: require('../assets/leagues/lck.png') },
    { name: 'LTASul', image: require('../assets/leagues/ltasul.png') },
    { name: 'LTANorte', image: require('../assets/leagues/ltanorte.png') },
    { name: 'LEC', image: require('../assets/leagues/lec.png') },
    { name: 'LPL', image: require('../assets/leagues/lpl.png') },
    { name: 'Worlds', image: require('../assets/leagues/worlds.png') },
];

// --- PLACEHOLDER IMAGES ---
// Função para tentar carregar o logo, ou usar um default
const getLogo = (path) => {
    try {
        // Tenta carregar a imagem específica.
        // OBS: O 'require' no React Native precisa ser estático.
        // Esta abordagem dinâmica SÓ FUNCIONA se você tiver um sistema de build
        // que entenda isso ou se você listar todas as 'requires' explicitamente.
        // A forma mais segura é usar 'require' direto nos dados como abaixo.
        // Usaremos require direto. Se der erro, o RN avisará.
        console.warn("Função getLogo é apenas um exemplo, usando require direto.");
        return require('../assets/teams/red.png'); // Fallback
    } catch (e) {
        return require('../assets/teams/red.png'); // Fallback
    }
};

// --- DADOS DE CONTEÚDO (COM LOGOS E FORMA) ---
const leagueData = {
    LCK: {
  title: 'LCK - Korea',
  standingsTable: {
    head: ['#', 'EQUIPE', 'J', 'V', 'E', 'D', 'PD', 'P', 'FORMA'],
    data: [
      ['1', { name: 'Gen.G', logo: require('../assets/teams/geng.png') }, '16', '16', '0', '0', 'N/A', '16', ['V', 'V', 'V', 'V', 'V']],
      ['2', { name: 'HLE', logo: require('../assets/teams/hle.png') }, '16', '12', '0', '4', 'N/A', '12', ['V', 'D', 'D', 'V', 'D']],
      ['3', { name: 'T1', logo: require('../assets/teams/t1.png') }, '16', '11', '0', '5', 'N/A', '11', ['D', 'V', 'V', 'D', 'V']],
      ['4', { name: 'Nongshim RedForce', logo: require('../assets/teams/redforce.png') }, '16', '9', '0', '7', 'N/A', '9', ['V', 'D', 'V', 'V', 'D']],
      ['5', { name: 'KT Rolster', logo: require('../assets/teams/KT.png') }, '16', '9', '0', '7', 'N/A', '9', ['V', 'V', 'V', 'V', 'V']],
      ['6', { name: 'Dplus Kia', logo: require('../assets/teams/DPlus.png') }, '16', '8', '0', '8', 'N/A', '8', ['V', 'D', 'V', 'V', 'D']],
      ['7', { name: 'FearX', logo: require('../assets/teams/FEARX.png') }, '17', '6', '0', '11', 'N/A', '6', ['V', 'D', 'D', 'D', 'D']],
      ['8', { name: 'OKSavingsBank Brion', logo: require('../assets/teams/OKSavingsBank.png') }, '16', '5', '0', '11', 'N/A', '5', ['D', 'V', 'D', 'D', 'D']],
      ['9', { name: 'DRX', logo: require('../assets/teams/DRX.png') }, '16', '4', '0', '12', 'N/A', '4', ['D', 'V', 'D', 'D', 'D']],
      ['10', { name: 'DN Freecs', logo: require('../assets/teams/DN.png') }, '17', '1', '0', '16', 'N/A', '1', ['D', 'D', 'D', 'D', 'D']],
    ],
    backgroundImage: require('../assets/leagues/lck.png'),
  },
  highlight: { title: 'Faker MVP da semana!', videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', thumbnail: require('../assets/leagues/lpl.png') },
  news: [{ id: 'lck1', title: 'T1 vence clássico', summary: 'Jogo emocionante...', fullContent: 'Texto completo...', image: require('../assets/leagues/lpl.png') }],
},
   LTASul: {
  title: 'LTA Sul',
  standingsTable: {
    head: ['#', 'EQUIPE', 'J', 'V', 'E', 'D', 'PD', 'P', 'FORMA'],
    data: [
      ['1', { name: 'PNG', logo: require('../assets/teams/pain.png') }, '7', '6', '0', '1', 'N/A', '6', ['V', 'V', 'V', 'V', 'D']],
      ['2', { name: 'FUR', logo: require('../assets/teams/furia.png') }, '7', '5', '0', '2', 'N/A', '5', ['D', 'V', 'V', 'V', 'V']],
      ['3', { name: 'LEV', logo: require('../assets/teams/lev.png') }, '7', '4', '0', '3', 'N/A', '4', ['V', 'D', 'V', 'D', 'D']],
      ['4', { name: 'VKS', logo: require('../assets/teams/vks.png') }, '7', '4', '0', '3', 'N/A', '4', ['D', 'D', 'D', 'V', 'V']],
      ['5', { name: 'LLL', logo: require('../assets/teams/loud.png') }, '7', '4', '0', '3', 'N/A', '4', ['V', 'V', 'V', 'V', 'D']],
      ['6', { name: 'RED', logo: require('../assets/teams/red.png') }, '7', '3', '0', '4', 'N/A', '3', ['V', 'D', 'D', 'D', 'V']],
      ['7', { name: 'FXW7', logo: require('../assets/teams/fluxo.png') }, '7', '1', '0', '6', 'N/A', '1', ['D', 'D', 'D', 'D', 'V']],
      ['8', { name: 'IE', logo: require('../assets/teams/isurus.png') }, '7', '1', '0', '6', 'N/A', '1', ['D', 'V', 'D', 'D', 'D']],
    ],
    backgroundImage: require('../assets/leagues/ltasul.png'), // Placeholder path
  },
  highlight: {
    title: 'Destaque da Semana LTA-SUL!',
    videoUrl: 'http://example.com/video_ltasul_highlight', // Placeholder URL
    
  },
  news: [{
    id: 'ltasul_news1',
    title: 'Notícia Importante da LTA-SUL',
    summary: 'Confira o resumo dos últimos acontecimentos na liga LTA-SUL...',
    fullContent: 'Texto completo da notícia sobre a LTA-SUL aqui...',
   
  }],
},
    // Adicione os outros dados aqui (LTA Norte, Worlds, LEC, LPL) com logos e forma
    // Usando um placeholder para os que faltam:
    'LTA Norte': { title: 'LTA - Norte', standingsTable: { head: ['Info'], data: [['Dados Indisponíveis']]}, highlight: { title: 'Sem Destaque', thumbnail: require('../assets/leagues/lck.png') }, news: [] },
    Worlds: { title: 'Worlds 2025', standingsTable: { head: ['Info'], data: [['Dados Indisponíveis']]}, highlight: { title: 'Sem Destaque', thumbnail: require('../assets/leagues/lck.png') }, news: [] },
    LEC: { title: 'LEC - Europe', standingsTable: { head: ['Info'], data: [['Dados Indisponíveis']]}, highlight: { title: 'Sem Destaque', thumbnail: require('../assets/leagues/lck.png') }, news: [] },
    LPL: { title: 'LPL - China', standingsTable: { head: ['Info'], data: [['Dados Indisponíveis']]}, highlight: { title: 'Sem Destaque', thumbnail: require('../assets/leagues/lck.png') }, news: [] },
};
// Garante dados padrão se algo faltar
leagues.forEach(l => { if (!leagueData[l.name]) { leagueData[l.name] = { title: l.name, standingsTable: { head: ['Info'], data: [['Dados Indisponíveis']]}, highlight: { title: 'Sem Destaque', thumbnail: require('../assets/leagues/lck.png') }, news: [] }; } });

// --- CÉLULAS CUSTOMIZADAS ---
const TeamCell = ({ team }) => (
    <View style={styles.teamCell}>
        <Image source={team.logo} style={styles.teamLogo} />
        <Text style={styles.teamNameText} numberOfLines={1}>{team.name}</Text>
    </View>
);
const FormCell = ({ form }) => (
    <View style={styles.formCell}>
        {(form || []).slice(0, 6).map((result, index) => (
            <View
                key={index}
                style={[
                    styles.formSquare,
                    { backgroundColor: result === 'V' ? '#4CAF50' : (result === 'D' ? '#F44336' : '#888') }
                ]}
            />
        ))}
    </View>
);

// --- CONFIGURAÇÃO DA TABELA ---
const widthArrLCK = [35, 160, 35, 35, 35, 35, 45, 35, 90];
const widthArrLTA = [50, 160, 50, 50, 90];
const widthArrWorlds = [80, 160, 50, 50, 90];
const getWidthArr = (head) => {
    if (!head) return [];
    if (head.length === 9) return widthArrLCK;
    if (head.length === 5) {
        if (head[0] === 'Grupo A') return widthArrWorlds;
        return widthArrLTA;
    }
    // Fallback para tabelas com head 'Info'
    if (head.length === 1 && head[0] === 'Info') return [Dimensions.get('window').width - 80];
    return head.map(() => 80);
};
const processRowData = (rowData, head) => {
    const teamIndex = 1;
    const formIndex = head.length - 1;
    return rowData.map((cellData, cellIndex) => {
        if (cellIndex === teamIndex && typeof cellData === 'object' && cellData.name) {
            return <TeamCell team={cellData} />;
        }
        if (cellIndex === formIndex && Array.isArray(cellData)) {
            return <FormCell form={cellData} />;
        }
        return cellData;
    });
};

// --- COMPONENTE TableBlock ---
const TableBlock = ({ tableData }) => {
    if (!tableData || !tableData.head || !tableData.data) return <View style={styles.block}><Text style={styles.blockText}>Dados da Tabela Indisponíveis</Text></View>;

    const widthArr = getWidthArr(tableData.head);
    const head = tableData.head;

    if (widthArr.length !== head.length) {
         console.warn("WidthArr e Head não batem!");
         return <View style={styles.block}><Text style={styles.blockText}>Erro: Largura da Tabela Inconsistente</Text></View>;
    }

    const totalWidth = widthArr.reduce((sum, width) => sum + width, 0);

    const tableComponent = (
        <View style={{ width: totalWidth }}>
            <Table borderStyle={{ borderWidth: 1, borderColor: '#444' }}>
                <Row data={head} style={styles.head} textStyle={styles.textHead} widthArr={widthArr} />
                {tableData.data.map((rowData, index) => {
                    // Garante que a linha de dados tenha o mesmo número de colunas que o head
                    if (rowData.length !== head.length) {
                        console.warn("Linha de dados inconsistente:", rowData);
                        return null; // Não renderiza linha inconsistente
                    }
                    return (
                        <Row key={index} data={processRowData(rowData, head)} widthArr={widthArr} style={[styles.dataRow, index % 2 && styles.dataRowAlt]} textStyle={styles.textData} />
                    );
                })}
            </Table>
        </View>
    );

    const content = ( <View style={styles.tableContainerInner}> <ScrollView horizontal showsHorizontalScrollIndicator={false}> {tableComponent} </ScrollView> </View> );

    if (tableData.backgroundImage) { return ( <ImageBackground source={tableData.backgroundImage} style={styles.block} imageStyle={styles.backgroundImageStyle}> <View style={styles.overlay} /> {content} </ImageBackground> ); }
    return <View style={[styles.block, styles.tableBlockOnly]}>{content}</View>;
};

// --- Componente para Destaque ---
const HighlightBlock = ({ highlightData }) => {
    if (!highlightData || !highlightData.thumbnail) return null;
    const handlePress = () => { if (highlightData.videoUrl) { Linking.openURL(highlightData.videoUrl).catch(err => console.error("Não foi possível abrir o link:", err) ); } };
    return (
        <TouchableOpacity onPress={handlePress} disabled={!highlightData.videoUrl}>
            <ImageBackground source={highlightData.thumbnail} style={[styles.block, styles.highlightBlock]} imageStyle={styles.backgroundImageStyle}>
                <View style={styles.overlay} />
                {highlightData.videoUrl && ( <Ionicons name="play-circle-outline" size={60} color="#fff" style={styles.playIcon} /> )}
                <Text style={styles.highlightTitle}>{highlightData.title}</Text>
            </ImageBackground>
        </TouchableOpacity>
    );
};

// --- Componente para Notícia ---
const NewsBlock = ({ newsItem, navigation }) => {
    const handlePress = () => { navigation.navigate('NewsDetail', { newsItem }); };
    const content = ( <View style={styles.newsContent}> <Text style={styles.newsTitle}>{newsItem.title}</Text> <Text style={styles.newsSummary}>{newsItem.summary}</Text> </View> );
    if (newsItem.image) { return ( <TouchableOpacity onPress={handlePress}> <ImageBackground source={newsItem.image} style={[styles.block, styles.newsBlock]} imageStyle={styles.backgroundImageStyle}> <View style={styles.overlay} /> {content} </ImageBackground> </TouchableOpacity> ); }
    return ( <TouchableOpacity onPress={handlePress}> <View style={[styles.block, styles.newsBlock, { justifyContent: 'center' }]}>{content}</View> </TouchableOpacity> );
};

// --- COMPONENTE DE RENDERIZAÇÃO DE CONTEÚDO ---
const LeagueContentRenderer = ({ data, leagueName }) => {
    const navigation = useNavigation();
    if (!data) return <Text style={styles.blockText}>Selecione uma liga.</Text>;
    return (
        <>
            <Text style={styles.sectionTitle}>Classificação - {data.title}</Text>
            <TableBlock tableData={data.standingsTable} />
            <Text style={styles.sectionTitle}>Destaque da semana</Text>
            <HighlightBlock highlightData={data.highlight} />
            <Text style={styles.sectionTitle}>Notícias</Text>
            {data.news && data.news.length > 0 ? ( data.news.map((item) => ( <NewsBlock key={item.id} newsItem={item} navigation={navigation} /> )) ) : ( <View style={styles.block}> <Text style={styles.blockText}>Sem notícias no momento.</Text> </View> )}
        </>
    );
};

// --- COMPONENTE PRINCIPAL DA TELA ---
export default function EsportsScreen() {
    const [selectedLeague, setSelectedLeague] = useState(leagues[0].name);
    const currentData = leagueData[selectedLeague];
    return (
        <View style={styles.container}>
            <ScrollView style={styles.content} contentContainerStyle={styles.scrollContentContainer} showsVerticalScrollIndicator={false} >
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.leagueIconsContainer} >
                    {leagues.map((league) => (
                        <TouchableOpacity key={league.name} onPress={() => setSelectedLeague(league.name)}>
                           <View style={{alignItems: 'center'}}>
                                <View style={[ styles.circleIcon, selectedLeague === league.name && styles.selectedIcon, ]} >
                                    <Image source={league.image} style={styles.iconImage} />
                                </View>
                                <Text style={[styles.leagueName, selectedLeague === league.name && styles.leagueNameSelected]}>
                                    {league.name}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
                <LeagueContentRenderer data={currentData} leagueName={selectedLeague} />
                <View style={{ height: 50 }} />
            </ScrollView>
        </View>
    );
}

// --- ESTILOS ---
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#000', },
    content: { flex: 1, backgroundColor: '#2B2B33', borderTopLeftRadius: 40, borderTopRightRadius: 40, paddingTop: 30, },
    scrollContentContainer: { paddingHorizontal: 20, paddingBottom: 100, },
    leagueIconsContainer: { flexDirection: 'row', gap: 20, marginBottom: 30, paddingHorizontal: 5, alignItems: 'flex-start', marginTop: 10 },
    circleIcon: { width: 65, height: 65, borderRadius: 32.5, backgroundColor: '#3a3a4a', justifyContent: 'center', alignItems: 'center', overflow: 'hidden', borderWidth: 2, borderColor: '#1f1f27', marginBottom: 5, },
    selectedIcon: { borderColor: '#00d9ff', transform: [{ scale: 1.05 }], },
    iconImage: { width: 55, height: 55, resizeMode: 'contain', },
    leagueName: { color: '#aaa', fontSize: 10, textAlign: 'center', width: 65, },
    leagueNameSelected: { color: '#00d9ff', fontWeight: 'bold', },
    sectionTitle: { color: '#00d9ff', fontSize: 18, marginTop: 25, marginBottom: 15, fontWeight: 'bold', },
    block: { backgroundColor: '#2B2B33', borderRadius: 20, marginBottom: 15, overflow: 'hidden', position: 'relative', minHeight: 120, justifyContent: 'center', width: '100%', },
    tableBlockOnly: { paddingVertical: 10, backgroundColor: 'transparent', },
    backgroundImageStyle: { borderRadius: 20, opacity: 0.6, },
    overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0, 0, 0, 0.4)', borderRadius: 20, },
    blockText: { color: '#fff', fontSize: 14, zIndex: 1, padding: 15, textAlign: 'center', },
    tableContainerInner: { zIndex: 1, backgroundColor: 'rgba(0, 0, 0, 0.2)', borderRadius: 10, padding: 5, marginHorizontal: 10, marginVertical: 10, alignSelf: 'stretch', },
    head: { height: 40, backgroundColor: '#00d9ff', },
    textHead: { margin: 6, textAlign: 'center', fontWeight: 'bold', color: '#000', fontSize: 11, },
    dataRow: { height: 45, backgroundColor: 'transparent', borderBottomWidth: 1, borderBottomColor: '#3a3a4a' },
    dataRowAlt: { backgroundColor: 'rgba(255, 255, 255, 0.05)', },
    textData: { margin: 6, textAlign: 'center', color: '#fff', fontSize: 12, },
    teamCell: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 6, height: '100%', },
    teamLogo: { width: 24, height: 24, resizeMode: 'contain', marginRight: 8, },
    teamNameText: { color: '#fff', fontSize: 12, flex: 1, },
    formCell: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: '100%', paddingHorizontal: 5, },
    formSquare: { width: 10, height: 10, borderRadius: 2, marginHorizontal: 1.5, }, // Diminuí a margem
    highlightBlock: { height: 180, alignItems: 'center', padding: 15, },
    playIcon: { zIndex: 2, opacity: 0.8, textShadowColor: 'rgba(0, 0, 0, 0.75)', textShadowOffset: { width: -1, height: 1 }, textShadowRadius: 10 },
    highlightTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold', position: 'absolute', bottom: 15, left: 15, zIndex: 1, textShadowColor: 'rgba(0, 0, 0, 0.9)', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 5 },
    newsBlock: { minHeight: 100, justifyContent: 'flex-end', padding: 20, },
    newsContent: { zIndex: 1, },
    newsTitle: { color: '#fff', fontSize: 16, fontWeight: 'bold', marginBottom: 5, },
    newsSummary: { color: '#ccc', fontSize: 13, },
});