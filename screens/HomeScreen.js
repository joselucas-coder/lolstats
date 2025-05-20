import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
  Pressable,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../firebaseConfig'; // Importar auth do firebase

const roles = [
  {
    name: 'TOP',
    image: require('../assets/roles/top.png'),
  },
  {
    name: 'JUNGLE',
    image: require('../assets/roles/jungle.png'),
  },
  {
    name: 'MID',
    image: require('../assets/roles/mid.png'),
  },
  {
    name: 'ADC',
    image: require('../assets/roles/adc.png'),
  },
  {
    name: 'SUP',
    image: require('../assets/roles/sup.png'),
  },
];

export default function HomeScreen() {
  const [selectedRole, setSelectedRole] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [user, setUser] = useState(null); // Estado para armazenar o usuário logado
  const navigation = useNavigation();

  const openModal = (role) => {
    setSelectedRole(role);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedRole(null);
    setModalVisible(false);
  };

  

  // Monitorando o estado de autenticação
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user); // Armazena o usuário logado
    });

    return () => unsubscribe(); // Desinscreve-se ao desmontar o componente
  }, []); // O array vazio garante que o hook seja chamado apenas uma vez

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{selectedRole}</Text>
            <Text style={styles.modalText}>Detalhes sobre a função {selectedRole}...</Text>
            <Pressable style={styles.closeButton} onPress={closeModal}>
              <Text style={styles.closeButtonText}>Fechar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <View style={styles.containerConteudo}>
        <View style={styles.contentWrapper}>
          {/* Partida da Semana */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Partida da Semana:</Text>
            <Text style={styles.cardText1}>Loud vs Pain</Text>
          </View>

          {/* Últimas Atualizações */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Últimas Atualizações</Text>
            <TouchableOpacity>
              <Text style={styles.viewMore}>Ver Mais</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.updateCard}>
            <Text style={styles.cardText}>
              Patch 14.9: buffs no Teemo, nerfs no K’Sante
            </Text>
          </View>

          {/* Campeões */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Campeões</Text>
            <TouchableOpacity onPress={() => navigation.navigate('ChampionsScreen')}>
              <Text style={styles.viewMore}>Ver Tudo</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.rolesContainer}
          >
            {roles.map((role) => (
              <TouchableOpacity
                key={role.name}
                style={styles.roleButton}
                onPress={() => openModal(role.name)}
              >
                <Image source={role.image} style={{ width: 50, height: 50 }} />
                <Text style={styles.roleText}>{role.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Esports */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Esports</Text>
            <TouchableOpacity onPress={() => navigation.navigate('EsportsScreen')}>
              <Text style={styles.viewMore}>Ver Mais</Text>
            </TouchableOpacity>
          </View>

          {/* Resultados */}
          <View style={styles.matchRow}>
            <View style={styles.matchCard}>
              <Text style={styles.cardText}>0 - 3</Text>
              <Text style={styles.cardText}>VKS</Text>
            </View>
            <View style={styles.matchCard}>
              <Text style={styles.cardText}>0 - 3</Text>
              <Text style={styles.cardText}>DRX</Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  containerConteudo: {
    flex: 1,
    backgroundColor: '#2B2B33',
    borderRadius: 40,
    paddingTop: 30,
    paddingHorizontal: 17,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },

  contentWrapper:{
    gap:12
  },

  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
    marginLeft: 20,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  profileName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  profileRole: { color: '#ccc' },
  card: {
    backgroundColor: '#18181C',
    padding: 20,
    borderRadius: 20,
    height: 160,
  },
  updateCard: {
    backgroundColor: '#18181C',
    padding: 15,
    borderRadius: 20,
    height: 130,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitle: {
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 5,
    fontSize: 25,
  },
  cardText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
  cardText1: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  section: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  viewMore: { color: 'white', fontSize: 12 },
  rolesContainer: {
    flexDirection: 'row',
    gap: 25,
  },
  roleButton: {
    backgroundColor: '#18181C',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    height: 100,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  roleText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  matchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  matchCard: {
    backgroundColor: '#18181C',
    flex: 0.48,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    height: 80,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  modalContent: {
    backgroundColor: '#121212',
    padding: 25,
    borderRadius: 20,
    width: '95%',
    height: '95%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalTitle: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 14,
    color: '#ccc',
    marginBottom: 20,
    textAlign: 'center',
  },
  closeButton: {
    backgroundColor: '#333',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  closeButtonText: {
    color: 'white',
  },
});
