import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  LayoutAnimation,
  UIManager,
  Platform,
  ScrollView,
} from 'react-native';
import {
  getAccountByRiotId,
  getMatchList,
  getMatchDetails,
  getChampionList,
} from '../api/api';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

const gameModeMap = {
  CLASSIC: 'Solo/Duo',
  ARAM: 'ARAM',
  URF: 'URF',
  ONEFORALL: 'One for All',
};

export default function SearchScreen() {
  const [searchInput, setSearchInput] = useState('');
  const [matchData, setMatchData] = useState([]);
  const [champions, setChampions] = useState({});
  const [loading, setLoading] = useState(false);
  const [expandedMatch, setExpandedMatch] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const champList = await getChampionList();
      const champMap = {};
      Object.values(champList).forEach(champ => {
        champMap[parseInt(champ.key)] = {
          name: champ.id,
          icon: `https://ddragon.leagueoflegends.com/cdn/14.8.1/img/champion/${champ.id}.png`,
        };
      });
      setChampions(champMap);

      const [gameName, tagLine] = searchInput.split('#');

      // 🧠 Se for apenas um nome, fazer busca de campeão
      if (!tagLine) {
        const filtered = Object.values(champList).filter(champ =>
          champ.id.toLowerCase().includes(searchInput.toLowerCase())
        );

        if (filtered.length === 0) {
          alert('Campeão não encontrado.');
        } else {
          const champResults = filtered.map(champ => ({
            matchId: champ.key,
            championId: parseInt(champ.key),
            isChampionSearch: true,
          }));
          setMatchData(champResults);
        }

        setLoading(false);
        return;
      }

      // 🔎 Se for Riot ID, continuar com a busca normal
      const account = await getAccountByRiotId(gameName, tagLine);
      const matchIds = await getMatchList(account.puuid);

      const matchPromises = matchIds.map(id => getMatchDetails(id));
      const matches = await Promise.all(matchPromises);

      const playerMatches = matches.map(match => {
        const player = match.info.participants.find(p => p.puuid === account.puuid);
        return {
          matchId: match.metadata.matchId,
          championId: player.championId,
          kills: player.kills,
          deaths: player.deaths,
          assists: player.assists,
          win: player.win,
          gameMode: match.info.gameMode,
          players: match.info.participants,
          puuid: account.puuid,
        };
      });

      setMatchData(playerMatches);
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
      alert('Erro ao buscar dados. Verifique se o Riot ID ou nome do campeão está correto.');
    } finally {
      setLoading(false);
    }
  };

  const toggleExpand = (matchId) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedMatch(prev => (prev === matchId ? null : matchId));
  };

  const renderDetails = (players) => (
    <View style={styles.detailsContainer}>
      {players.map((player, index) => (
        <View key={index} style={styles.playerRow}>
          <Image
            source={{ uri: champions[player.championId]?.icon }}
            style={styles.iconSmall}
          />
          <Text style={{ flex: 1 }}>{player.summonerName || 'Desconhecido'}</Text>
          <Text>KDA: {player.kills}/{player.deaths}/{player.assists}</Text>
        </View>
      ))}
    </View>
  );

  const renderItem = ({ item }) => {
    if (item.isChampionSearch) {
      return (
        <View style={styles.card}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image source={{ uri: champions[item.championId]?.icon }} style={styles.icon} />
            <Text style={styles.champion}>{champions[item.championId]?.name}</Text>
          </View>
        </View>
      );
    }

    return (
      <TouchableOpacity
        onPress={() => toggleExpand(item.matchId)}
        style={[styles.card, { backgroundColor: item.win ? '#d4edda' : '#f8d7da' }]}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image source={{ uri: champions[item.championId]?.icon }} style={styles.icon} />
          <View>
            <Text style={styles.champion}>{champions[item.championId]?.name}</Text>
            <Text>KDA: {item.kills}/{item.deaths}/{item.assists}</Text>
            <Text>{item.win ? 'Vitória' : 'Derrota'} - {gameModeMap[item.gameMode] || item.gameMode}</Text>
          </View>
        </View>
        {expandedMatch === item.matchId && renderDetails(item.players)}
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Pesquisar Jogador ou Campeão</Text>
      <TextInput
        placeholder="Digite Riot ID (ex: Player#BR1) ou nome do campeão"
        value={searchInput}
        onChangeText={setSearchInput}
        style={styles.input}
      />
      <Button title="Buscar" onPress={fetchData} disabled={loading} />
      {loading ? (
        <Text>Carregando...</Text>
      ) : (
        <FlatList
          data={matchData}
          keyExtractor={(item) => item.matchId}
          renderItem={renderItem}
          scrollEnabled={false}
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  card: {
    flexDirection: 'column',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  icon: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  iconSmall: {
    width: 32,
    height: 32,
    marginRight: 10,
  },
  champion: {
    fontWeight: 'bold',
  },
  detailsContainer: {
    marginTop: 10,
    borderTopWidth: 1,
    borderColor: '#ccc',
    paddingTop: 10,
  },
  playerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
});
