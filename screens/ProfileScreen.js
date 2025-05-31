import React, { useLayoutEffect, useState, useEffect } from 'react'; // Adicionado useEffect
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, ActivityIndicator } from 'react-native'; // Adicionado ActivityIndicator
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { auth } from '../firebaseConfig';
import { signOut } from 'firebase/auth';
import * as ImagePicker from 'expo-image-picker';

// URL base da API DDragon
const DDRAGON_BASE_URL = 'https://ddragon.leagueoflegends.com';

export default function ProfileScreen() {
  const navigation = useNavigation();
  const user = auth.currentUser;

  const [profileImage, setProfileImage] = useState(user?.photoURL);
  const [ddragonVersion, setDdragonVersion] = useState(null); // Estado para a versão

  // --- DADOS FICTÍCIOS (Substitua pela sua lógica) ---
  const [stats, setStats] = useState({
    winRate: 65,
    lossRate: 35,
    kda: 3.2,
  });

  // Agora com 'key' para a API DDragon e 'name' para exibir
  const [favorites, setFavorites] = useState([
    { id: 1, name: 'Yasuo', key: 'Yasuo' },
    { id: 2, name: 'Lux', key: 'Lux' },
    { id: 3, name: 'Lee Sin', key: 'LeeSin' }, // Note a capitalização!
  ]);
  // --- FIM DOS DADOS FICTÍCIOS ---

  // Busca a versão mais recente do DDragon ao carregar
  useEffect(() => {
    const fetchDdragonVersion = async () => {
      try {
        const response = await fetch(`${DDRAGON_BASE_URL}/api/versions.json`);
        const versions = await response.json();
        if (versions && versions.length > 0) {
          setDdragonVersion(versions[0]); // Pega a versão mais recente
          console.log("Versão DDragon:", versions[0]);
        }
      } catch (error) {
        console.error("Erro ao buscar versão do DDragon:", error);
        // Pode definir uma versão padrão em caso de erro, ex: '14.10.1'
      }
    };

    fetchDdragonVersion();
  }, []); // [] garante que rode apenas uma vez

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

  const handleImagePick = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão necessária', 'Precisamos da permissão para acessar suas fotos.');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const imageUri = result.assets[0].uri;
      setProfileImage(imageUri);
      Alert.alert("Sucesso (Simulado)", "Sua foto de perfil foi alterada! (Upload não implementado)");
      // --- LÓGICA DE UPLOAD AQUI ---
    }
  };

  // Função para construir a URL da imagem do campeão
  const getChampionIconUrl = (championKey) => {
      if (!ddragonVersion) return null; // Retorna nulo se a versão não foi carregada
      return `${DDRAGON_BASE_URL}/cdn/${ddragonVersion}/img/champion/${championKey}.png`;
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
                : require('../assets/roles/meme.jpg') // Mantenha um fallback
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
            {/* ... (seus boxes de estatísticas) ... */}
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
        <View style={styles.row}>
          {favorites.map((champ) => {
            const iconUrl = getChampionIconUrl(champ.key); // Pega a URL
            return (
              <View key={champ.id} style={styles.miniBox}>
                {iconUrl ? ( // Se a URL existe, mostra a Image
                  <Image source={{ uri: iconUrl }} style={styles.champIcon} />
                ) : ( // Senão, mostra um indicador de carregamento
                  <ActivityIndicator size="small" color="#00d9ff" />
                )}
                <Text style={styles.miniBoxLabel}>{champ.name}</Text>
              </View>
            );
          })}
        </View>

        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Seus estilos (mantive os mesmos da resposta anterior,
// apenas verifique se 'champIcon' está adequado)
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
    justifyContent: 'space-between',
    width: '100%',
    gap: 10,
  },
  miniBox: {
    backgroundColor: '#3a3a4a',
    width: '30%',
    aspectRatio: 1,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
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
    width: '65%', // Ajuste o tamanho conforme necessário
    height: '65%',
    resizeMode: 'contain',
    marginBottom: 5,
    borderRadius: 5, // Opcional: pequenas bordas arredondadas
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
});