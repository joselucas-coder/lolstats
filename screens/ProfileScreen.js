import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { auth } from '../firebaseConfig';
import { signOut } from 'firebase/auth';

export default function ProfileScreen() {
  const user = auth.currentUser;

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log('Erro ao sair:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header} />

      <View style={styles.content}>
        <Text style={styles.title}>Perfil</Text>

        <Image
          source={
            user?.photoURL
              ? { uri: user.photoURL }
              : require('../assets/roles/meme.jpg')
          }
          style={styles.avatar}
        />

        <Text style={styles.name}>{user?.displayName || 'Usuário'}</Text>
        <Text style={styles.email}>{user?.email}</Text>

        <View style={styles.mainBox} />

        <Text style={styles.sectionTitle}>Estatísticas</Text>
        <View style={styles.row}>
          <View style={styles.miniBox} />
          <View style={styles.miniBox} />
          <View style={styles.miniBox} />
        </View>

        <Text style={styles.sectionTitle}>Favoritos</Text>
        <View style={styles.row}>
          <View style={styles.miniBox} />
          <View style={styles.miniBox} />
          <View style={styles.miniBox} />
        </View>

        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    height: 50,
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
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 999,
    marginBottom: 10,
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
  mainBox: {
    backgroundColor: '#d3d3d3',
    width: '100%',
    height: 60,
    borderRadius: 15,
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
    backgroundColor: '#d3d3d3',
    width: '30%',
    aspectRatio: 1,
    borderRadius: 15,
  },
  logoutButton: {
    backgroundColor: '#e63946',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 30,
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
