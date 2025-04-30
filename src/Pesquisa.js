import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Pesquisa() {
  return (
    <View style={styles.container}>
      <Text style={styles.texto}>Página de Pesquisa</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#18181C',
    justifyContent: 'center',
    alignItems: 'center',
  },
  texto: {
    color: 'white',
    fontSize: 24,
  },
});
