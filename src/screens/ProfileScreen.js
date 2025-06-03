// src/screens/ProfileScreen.js
import React, { useLayoutEffect, useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, Image, TouchableOpacity, Alert,
  ActivityIndicator, Modal, TextInput, Button
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { auth, db } from './../../firebaseConfig';
import { signOut } from 'firebase/auth';
import * as ImagePicker from 'expo-image-picker';
import { doc, setDoc, getDoc, arrayUnion, arrayRemove, updateDoc } from 'firebase/firestore';
import { getChampionList } from '../services/api/api';

const DDRAGON_BASE_URL = 'https://ddragon.leagueoflegends.com';

export default function ProfileScreen() {
  const navigation = useNavigation();
  const user = auth.currentUser;

  const [profileImage, setProfileImage] = useState(user?.photoURL);
  const [ddragonVersion, setDdragonVersion] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [loadingFavorites, setLoadingFavorites] = useState(false);
  const [stats, setStats] = useState({
    winRate: 65,
    lossRate: 35,
    kda: 3.2,
  });

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [championInput, setChampionInput] = useState('');
  const [allChampionsApi, setAllChampionsApi] = useState([]);
  const [loadingAllChampions, setLoadingAllChampions] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoadingAllChampions(true);
      try {
        const versionResponse = await fetch(`${DDRAGON_BASE_URL}/api/versions.json`);
        const versions = await versionResponse.json();
        if (versions && versions.length > 0) {
          const currentVersion = versions[0];
          setDdragonVersion(currentVersion);
          const champsList = await getChampionList();
          setAllChampionsApi(champsList);
        }
      } catch (error) {
        console.error("Erro ao buscar dados iniciais (versão/campeões):", error);
        Alert.alert("Erro", "Não foi possível carregar dados essenciais dos campeões.");
      }
      setLoadingAllChampions(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (user && allChampionsApi.length > 0) {
      const fetchFavorites = async () => {
        setLoadingFavorites(true);
        const userDocRef = doc(db, 'users', user.uid);
        try {
          const docSnap = await getDoc(userDocRef);
          if (docSnap.exists()) {
            const userData = docSnap.data();
            const favoriteIds = userData.favorites || [];
            const detailedFavorites = favoriteIds.map(favId =>
              allChampionsApi.find(champ => champ.id === favId)
            ).filter(Boolean);
            setFavorites(detailedFavorites);
          } else {
            await setDoc(userDocRef, { favorites: [] });
            setFavorites([]);
          }
        } catch (error) {
          console.error("Erro ao buscar favoritos:", error);
          Alert.alert("Erro", "Não foi possível carregar os favoritos.");
        }
        setLoadingFavorites(false);
      };
      fetchFavorites();
    }
  }, [user, allChampionsApi]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 15 }}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log('Erro ao sair:', error);
    }
  };

  const handleImagePick = async () => { /* ... */ };

  const getChampionIconUrl = (championId) => {
    if (!ddragonVersion || !championId) return null;
    return `${DDRAGON_BASE_URL}/cdn/${ddragonVersion}/img/champion/${championId}.png`;
  };

  const handleAddFavorite = async () => {
    if (!user || !championInput.trim()) {
      Alert.alert("Entrada Inválida", "Por favor, digite o nome de um campeão.");
      return;
    }
    if (favorites.length >= 3) {
      Alert.alert("Limite Atingido", "Você pode ter no máximo 3 campeões favoritos.");
      setIsModalVisible(false);
      setChampionInput('');
      return;
    }

    const formattedInput = championInput.trim();
    const championFound = allChampionsApi.find(
      (champ) => champ.name.toLowerCase() === formattedInput.toLowerCase() ||
                 champ.id.toLowerCase() === formattedInput.toLowerCase()
    );

    if (!championFound) {
      Alert.alert("Não Encontrado", `Campeão "${formattedInput}" não encontrado.`);
      return;
    }

    if (favorites.some(fav => fav.id === championFound.id)) {
      Alert.alert("Já Favorito", `${championFound.name} já está nos seus favoritos.`);
      setIsModalVisible(false);
      setChampionInput('');
      return;
    }

    const userDocRef = doc(db, 'users', user.uid);
    try {
      await updateDoc(userDocRef, {
        favorites: arrayUnion(championFound.id)
      });
      setFavorites(prev => [...prev, championFound]);
      Alert.alert("Adicionado!", `${championFound.name} adicionado aos favoritos.`);
      setIsModalVisible(false);
      setChampionInput('');
    } catch (error) {
      console.error("Erro ao adicionar favorito:", error);
      Alert.alert("Erro", "Não foi possível adicionar o favorito.");
    }
  };

  const removeFavorite = async (championId) => {
    if (!user) return;
    const userDocRef = doc(db, 'users', user.uid);
    try {
      await updateDoc(userDocRef, {
        favorites: arrayRemove(championId)
      });
      setFavorites(prev => prev.filter(fav => fav.id !== championId));
      const championToRemove = allChampionsApi.find(c => c.id === championId);
      Alert.alert("Removido", `${championToRemove?.name || championId} removido dos favoritos.`);
    } catch (error) {
      console.error("Erro ao remover favorito:", error);
      Alert.alert("Erro", "Não foi possível remover o favorito.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Perfil</Text>
        <TouchableOpacity onPress={handleImagePick} style={styles.avatarContainer}>
          <Image
            source={
              profileImage
                ? { uri: profileImage }
                : require('../assets/roles/meme.jpg')
            }
            style={styles.avatar}
          />
          <View style={styles.editIcon}>
            <Ionicons name="camera-outline" size={18} color="#fff" />
          </View>
        </TouchableOpacity>

        <Text style={styles.name}>{user?.displayName || 'Usuário'}</Text>
        <Text style={styles.email}>{user?.email}</Text>

        <Text style={styles.sectionTitle}>Estatísticas</Text>
        <View style={styles.row}>
            <View style={styles.miniBox}>
              <Text style={styles.miniBoxValue}>{stats.winRate}%</Text>
              <Text style={styles.miniBoxLabel}>Vitórias</Text>
            </View>
            <View style={styles.miniBox}>
              <Text style={styles.miniBoxValue}>{stats.lossRate}%</Text>
              <Text style={styles.miniBoxLabel}>Derrotas</Text>
            </View>
            <View style={styles.miniBox}>
              <Text style={styles.miniBoxValue}>{stats.kda}</Text>
              <Text style={styles.miniBoxLabel}>KDA</Text>
            </View>
        </View>

        <Text style={styles.sectionTitle}>Favoritos</Text>
        {loadingFavorites || loadingAllChampions ? (
          <ActivityIndicator size="large" color="#00d9ff" style={{ marginTop: 20 }}/>
        ) : (
          <View style={styles.row}>
            {favorites.map((champ) => {
              if (!champ) return null;
              const iconUrl = getChampionIconUrl(champ.id);
              return (
                <TouchableOpacity key={champ.id} onPress={() => removeFavorite(champ.id)} style={styles.miniBox}>
                  {iconUrl ? (
                    <Image source={{ uri: iconUrl }} style={styles.champIcon} />
                  ) : (
                    <ActivityIndicator size="small" color="#00d9ff" />
                  )}
                  <Text style={styles.miniBoxLabel}>{champ.name}</Text>
                </TouchableOpacity>
              );
            })}
            {favorites.length < 3 && (
                 <TouchableOpacity onPress={() => setIsModalVisible(true)} style={[styles.miniBox, styles.addFavoriteBox]}>
                    <Ionicons name="add-circle-outline" size={30} color="#00d9ff" />
                    <Text style={styles.miniBoxLabel}>Adicionar</Text>
                 </TouchableOpacity>
            )}
            {favorites.length === 0 && favorites.length <3 && (
                 <Text style={styles.noFavoritesText}>Adicione um campeão favorito!</Text>
            )}
          </View>
        )}

        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
          setIsModalVisible(!isModalVisible);
          setChampionInput('');
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Adicionar Campeão Favorito</Text>
            <TextInput
              style={styles.input}
              placeholder="Nome do Campeão (ex: Lux)"
              placeholderTextColor="#999"
              value={championInput}
              onChangeText={setChampionInput}
            />
            <View style={styles.modalButtons}>
              <Button title="Cancelar" onPress={() => {
                setIsModalVisible(false);
                setChampionInput('');
              }} color="#e63946" />
              <View style={{width:10}}/>
              <Button title="Adicionar" onPress={handleAddFavorite} color="#00d9ff" />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  content: {
    flex: 1,
    backgroundColor: '#1f1f27',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    alignItems: 'center',
    padding: 20,
  },
  title: {
    color: '#fff',
    fontSize: 28,
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  avatarContainer: {
      position: 'relative',
      marginBottom: 10,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 999,
  },
  editIcon: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      backgroundColor: '#00d9ff',
      padding: 6,
      borderRadius: 15,
      borderWidth: 2,
      borderColor: '#1f1f27',
  },
  name: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  email: {
    fontSize: 16,
    color: '#aaa',
    marginBottom: 20,
  },
  sectionTitle: {
    color: '#00d9ff',
    fontSize: 16,
    alignSelf: 'flex-start',
    marginTop: 20,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '100%',
    gap: 10,
    flexWrap: 'wrap',
  },
  miniBox: {
    backgroundColor: '#3a3a4a',
    width: '30%',
    aspectRatio: 1,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    marginBottom: 10,
  },
  miniBoxValue: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  miniBoxLabel: {
    color: '#aaa',
    fontSize: 12,
    marginTop: 5,
    textAlign: 'center',
  },
  champIcon: {
    width: '65%',
    height: '65%',
    resizeMode: 'contain',
    marginBottom: 5,
    borderRadius: 5,
  },
  logoutButton: {
    backgroundColor: '#e63946',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 'auto',
    marginBottom: 10,
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  noFavoritesText: {
    color: '#aaa',
    fontStyle: 'italic',
    textAlign: 'left',
    width: '100%',
    marginTop: 10,
    marginLeft: 5,
  },
  addFavoriteBox: {
    borderStyle: 'dashed',
    borderColor: '#00d9ff',
    borderWidth: 1,
    backgroundColor: 'transparent',
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  modalView: {
    margin: 20,
    backgroundColor: "#2B2B33",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '85%',
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  input: {
    height: 50,
    borderColor: '#555',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    color: '#fff',
    backgroundColor: '#1f1f27',
    width: '100%',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
});