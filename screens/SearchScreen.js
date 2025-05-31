import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  LayoutAnimation,
  UIManager,
  Platform,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getChampionList, getPlayerList } from '../api/api';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getAuth } from 'firebase/auth';


if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

export default function SearchScreen() {
  const [expandedChampion, setExpandedChampion] = useState(null);
  const [searchInput, setSearchInput] = useState('');
  const [matchData, setMatchData] = useState([]);
  const [champions, setChampions] = useState({});
  const [loading, setLoading] = useState(false);
  const auth = getAuth();
  const user = auth.currentUser;


  const toggleChampionExpand = (championId) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedChampion(prev => (prev === championId ? null : championId));
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const champList = await getChampionList();
      const champMap = {};
      const champArray = Object.values(champList);

      champArray.forEach(champ => {
        champMap[parseInt(champ.key)] = {
          name: champ.name,
          title: champ.title,
          tags: champ.tags,
          blurb: champ.blurb,
          splash: champ.image,
          icon: champ.icon,
        };
      });
      setChampions(champMap);

      const playerList = await getPlayerList();

      const input = (searchInput || '').toLowerCase();

      const filteredChampions = champArray.filter(champ =>
        champ.name.toLowerCase().includes(input) ||
        champ.id.toLowerCase().includes(input)
      );

      const filteredPlayers = playerList.filter(player =>
        (player.name?.toLowerCase() || '').includes(input) ||
        (player.id?.toLowerCase() || '').includes(input)
      );

      if (filteredChampions.length === 0 && filteredPlayers.length === 0) {
        alert('Nenhum resultado encontrado.');
      } else {
        const champResults = filteredChampions.map(champ => ({
          matchId: champ.key,
          championId: parseInt(champ.key),
          isChampionSearch: true,
        }));

        const playerResults = filteredPlayers.map(player => ({
          matchId: player.id,
          playerData: player,
          isPlayerSearch: true,
        }));

        setMatchData([...champResults, ...playerResults]);
      }
    } catch (error) {
      console.error('Erro:', error);
      alert('Erro ao buscar dados.');
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => {
    if (item.isChampionSearch) {
      const champ = champions[item.championId];
      const isExpanded = expandedChampion === item.championId;

      return (
        <TouchableOpacity
          onPress={() => toggleChampionExpand(item.championId)}
          activeOpacity={0.9}
        >
          <View style={styles.card}>
            <Image
              source={{ uri: champ?.splash }}
              style={styles.splashImage}
              resizeMode="cover"
            />
            <View style={{ padding: 12 }}>
              <Text style={styles.champion}>{champ?.name}</Text>
              <Text style={styles.title}>{champ?.title}</Text>
              <Text style={styles.tags}>Funções: {champ?.tags?.join(', ')}</Text>
              {isExpanded ? (
                <Text style={styles.blurb}>{champ?.blurb}</Text>
              ) : (
                <Text style={styles.blurb} numberOfLines={3}>
                  {champ?.blurb}
                </Text>
              )}
            </View>
          </View>
        </TouchableOpacity>
      );
    }

    if (item.isPlayerSearch) {
      const player = item.playerData;

      return (
        <View style={styles.card}>
          {player.image ? (
            <Image source={{ uri: player.image }} style={styles.splashImage} />
          ) : (
            <Text style={{ color: 'white', marginBottom: 10 }}>[Imagem indisponível]</Text>
          )}
          <View style={{ padding: 12 }}>
            <Text style={styles.champion}>{player.name || 'Nome desconhecido'}</Text>
            <Text style={styles.title}>
              Time: {player.team || 'Sem time'} • Função: {player.role || 'N/A'}
            </Text>
            <Text style={styles.tags}>KDA: {player.kda || 'N/A'}</Text>
            <Text style={styles.blurb}>{player.bio || 'Sem biografia disponível.'}</Text>
          </View>
        </View>
      );
    }

    return null;
  };

  return (
    <View style={styles.container1}>

      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.containerInput}>
          <Ionicons name="search" size={25} color="gray" style={styles.iconPesquisar} />
          <TextInput
            placeholder="Pesquisar Campeões..."
            value={searchInput}
            onChangeText={setSearchInput}
            style={styles.input}
            placeholderTextColor="#999"
          />
        </View>

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={fetchData}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Carregando...' : 'Buscar'}
          </Text>
        </TouchableOpacity>

        {!loading && (
          <FlatList
            data={matchData}
            keyExtractor={(item) => item.matchId}
            renderItem={renderItem}
            scrollEnabled={false}
          />
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    backgroundColor: '#000000',
  },

  container: {

    flexGrow: 1,
    backgroundColor: '#2B2B33',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingTop: 30,
    paddingHorizontal: 17,
    paddingBottom: 30,
  },
  containerInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D9D9D9',
    borderRadius: 90,
    marginBottom: 20,
    height: 55,
    paddingHorizontal: 10,
  },
  iconPesquisar: {
    marginHorizontal: 8,
  },
  input: {
    flex: 1,
    backgroundColor: '#D9D9D9',
    borderRadius: 90,
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#000',
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 90,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonDisabled: {
    backgroundColor: '#A9A9A9',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#1f1f1f',
    borderRadius: 20,
    marginBottom: 16,
    overflow: 'hidden',
  },
  splashImage: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  champion: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    color: 'white',
    marginBottom: 6,
  },
  tags: {
    color: '#ccc',
    fontStyle: 'italic',
    marginBottom: 4,
  },
  blurb: {
    color: '#aaa',
    fontSize: 14,
    marginTop: 4,
    flexWrap: 'wrap',
  },
  profileContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  paddingHorizontal: 17,
  marginTop: 30,
  marginBottom: 10,
},
avatar: {
  width: 50,
  height: 50,
  borderRadius: 25,
  marginRight: 15,
},
profileName: {
  fontSize: 18,
  fontWeight: 'bold',
  color: 'white',
},
profileRole: {
  fontSize: 14,
  color: '#aaa',
},

});