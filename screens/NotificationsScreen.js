import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function NotificationScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header} />
      <View style={styles.content}>
        <Text style={styles.title}>Notificações</Text>
        <ScrollView>
          {[...Array(6)].map((_, i) => (
            <View key={i} style={styles.notificationBox} />
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  header: { height: 50 },
  content: {
    flex: 1,
    backgroundColor: '#1f1f27',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    padding: 20,
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  notificationBox: {
    backgroundColor: '#d3d3d3',
    height: 100,
    borderRadius: 10,
    marginBottom: 30,
  },
});
