
import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import { Ionicons, MaterialIcons, Feather } from '@expo/vector-icons';
import { auth } from '../firebaseConfig'; // Importar auth do firebase






export default function App() {
  
const [user, setUser] = useState(null); // Estado para armazenar o usuário logado
// Monitorando o estado de autenticação
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user); // Armazena o usuário logado
    });

    return () => unsubscribe(); // Desinscreve-se ao desmontar o componente
  }, []); // O array vazio garante que o hook seja chamado apenas uma vez
  
  return (

    

    <View style={styles.container}>
      {/* Topo */}

      {/* Conteúdo Scrollável */}
      <ScrollView style={styles.content}>
        {/* Ícones das ligas */}
        <ScrollView  
        horizontal
        showsHorizontalScrollIndicator={false}>

        <View style={styles.leagueIcons}>
          {['LCK','LTA','LCP','LEC', 'LEC', 'LPL', 'LCS'].map((league, index) => (
            <View key={index} style={styles.circleIcon}>
              <Text style={styles.leagueText}>{league}</Text>
            </View>
          ))}
        </View>
        </ScrollView>

        {/* Blocos de conteúdo */}
        <View style={styles.block}></View>

        <Text style={styles.sectionTitle}>Classificação</Text>
        <View style={styles.block}></View>

        <Text style={styles.sectionTitle}>Destaque da semana</Text>
        <View style={[styles.block, styles.smallBlock]}></View>

        <Text style={styles.sectionTitle}>Notícias</Text>
        <View style={styles.block}></View>
        <View style={styles.block}></View>
        <View style={styles.block}></View>
      </ScrollView>

      {/* Menu inferior */}
      <View style={styles.bottomMenu}>
        <Ionicons name="home" size={28} color="white" />
        <Feather name="search" size={28} color="white" />
        <MaterialIcons name="fullscreen" size={28} color="white" />
        <Ionicons name="notifications-outline" size={28} color="white" />
        <Ionicons name="person" size={28} color="white" />
      </View>
    </View>
  );
}

// Estilos
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 10,
    gap: 10,
  },
  avatar: { width: 40, height: 40, borderRadius: 20 },
  username: { color: 'white', fontWeight: 'bold', flexShrink: 1 },

  content: {
    backgroundColor: '#1f1f27',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingTop:30,
    padding: 20,
    flex: 1,
  },

  leagueIcons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    gap:25
  },
  circleIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  leagueText: { fontWeight: 'bold' },

  sectionTitle: {
    color: '#00d9ff',
    fontSize: 16,
    marginTop: 20,
    marginBottom: 10,
  },

  block: {
    height: 120,
    backgroundColor: '#d3d3d3',
    borderRadius: 20,
    marginBottom: 20,
  },
  smallBlock: {
    width: 180,
    height: 100,
    alignSelf: 'flex-start',
  },

  bottomMenu: {
    backgroundColor: '#000',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#222',
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
});
