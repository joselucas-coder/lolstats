import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function ChampionsScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Todos os Campeões por Função</Text>
      {['TOP', 'JUNGLE', 'MID', 'BOT', 'SUP'].map((role) => (
        <View key={role} style={styles.card}>
          <Text style={styles.roleText}>{role}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#18181C',
    flexGrow: 1,
  },
  title: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#121212',
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
  },
  roleText: {
    color: 'white',
    fontSize: 16,
  },
});
