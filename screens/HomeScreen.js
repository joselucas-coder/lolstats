import React, { useState } from 'react';
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

const roles = ['TOP', 'JUNGLE', 'MID', 'BOT', 'SUP'];

export default function HomeScreen() {
  const [selectedRole, setSelectedRole] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  const openModal = (role) => {
    setSelectedRole(role);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedRole(null);
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Modal */}
      <Modal
        animationType="slide"
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

      {/* Perfil */}
      <View style={styles.profileContainer}>
        <Image
          source={{ uri: 'https://i.imgur.com/3G2qUPX.png' }}
          style={styles.avatar}
        />
        <View>
          <Text style={styles.profileName}>Bilada invocada #BR1</Text>
          <Text style={styles.profileRole}>Suporte</Text>
        </View>
      </View>

      <ScrollView style={styles.containerConteudo} contentContainerStyle={styles.scrollContent}>
        <View style={styles.contentWrapper}>
          {/* Partida da Semana */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Partida da Semana:</Text>
            <Text style={styles.cardText}>Loud vs Pain</Text>
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
            <TouchableOpacity onPress={() => navigation.navigate('Campeões')}>
              <Text style={styles.viewMore}>Ver Tudo</Text>
            </TouchableOpacity>
          </View>

          {/* Carrossel com ScrollView */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.rolesContainer}
          >
            {roles.map((role) => (
              <TouchableOpacity
                key={role}
                style={styles.roleButton}
                onPress={() => openModal(role)}
              >
                <Text style={styles.roleText}>{role}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Esports */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Esports</Text>
            <TouchableOpacity>
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
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#18181C' },
  containerConteudo: {
    flex: 1,
    backgroundColor: 'black',
    borderRadius: 40,
    paddingTop: 20,
    paddingHorizontal: 15,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  contentWrapper: {
    gap: 20,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 15,
    marginLeft: 20,
  },
  avatar: { width: 50, height: 50, borderRadius: 25, marginRight: 10 },
  profileName: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  profileRole: { color: '#ccc' },
  card: {
    backgroundColor: '#18181C',
    padding: 20,
    borderRadius: 20,
    marginBottom: 20,
    height: 160,
  },
  updateCard: {
    backgroundColor: '#18181C',
    padding: 15,
    borderRadius: 20,
    marginBottom: 20,
    height: 130,
  },
  cardTitle: { color: '#fff', fontWeight: 'bold', marginBottom: 5 },
  cardText: { color: '#fff' },
  section: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  viewMore: { color: 'white', fontSize: 12 },
  rolesContainer: {
    flexDirection: 'row',
    gap: 25,
    marginBottom: 20,
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
  roleText: { color: '#fff', fontWeight: 'bold' },
  matchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
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
    width: '80%',
    alignItems: 'center',
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
