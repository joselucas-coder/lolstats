import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Home() {
  const navigation = useNavigation();

  return (
    <View style={styles.container1}>
      <View style={styles.container2}>
        <ScrollView showsVerticalScrollIndicator={false}>
     

          {/* Campeões em Destaque */}
          <Text style={styles.titulos}>Campeões em Destaque</Text>
          <View style={styles.rowquadradosCampDestaque}>
            <View style={styles.quadradosCampDestaque}></View>
            <View style={styles.quadradosCampDestaque}></View>
            <View style={styles.quadradosCampDestaque}></View>
          </View>

          {/* Jogadores do Momento */}
          <Text style={styles.titulos}>Jogadores do Momento</Text>
          <View style={styles.rowquadradoJogadores}>
            <View style={styles.quadradosJogadores}></View>
          </View>

          {/* Times Vencedores */}
          <Text style={styles.titulos}>Times Vencedores</Text>
          <View style={styles.rowquadradoTimes}>
            <View style={styles.quadradosTimes}></View>
          </View>

          <View style={styles.container5}>
            <View style={styles.container3}>
              <Text style={styles.titulos}>Próximas Partidas</Text>
              <View style={styles.rowquadradoPartidas}>
                <View style={styles.quadradosPartidas}></View>
              </View>
            </View>
            <View style={styles.container4}>
              <Text style={styles.titulos}>Top Campeões</Text>
              <View style={styles.rowTopcampeoes}>
                <View style={styles.quadradosTopcampeoes}></View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    backgroundColor: '#18181C',
  },
  container2: {
    flex: 1,
    backgroundColor: '#000000',
    marginTop: 120,
    borderRadius: 50,
    paddingTop: 35,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    paddingHorizontal: 30,
  },
  container3: {
    justifyContent: 'space-between',
  },
  container4: {},
  container5: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titulos: {
    color: 'white',
    fontSize: 22,
    fontFamily: 'Jost-Bold',
  },
  quadradosCampDestaque: {
    backgroundColor: '#18181C',
    height: 130,
    width: 130,
    borderRadius: 20,
    marginBottom: 20,
  },
  quadradosJogadores: {
    backgroundColor: '#18181C',
    height: 100,
    width: '100%',
    borderRadius: 20,
    marginBottom: 20,
  },
  quadradosTimes: {
    backgroundColor: '#18181C',
    height: 100,
    width: '100%',
    borderRadius: 20,
    marginBottom: 20,
  },
  quadradosPartidas: {
    backgroundColor: '#18181C',
    height: 250,
    width: 200,
    borderRadius: 20,
  },
  quadradosTopcampeoes: {
    backgroundColor: '#18181C',
    height: 250,
    width: 200,
    borderRadius: 20,
  },
  rowquadradosCampDestaque: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  rowquadradoJogadores: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  rowquadradoTimes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  rowquadradoPartidas: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  rowTopcampeoes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
});
