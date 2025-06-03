import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Switch, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function ConfiguracaoScreen() {
    const navigation = useNavigation();
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const [darkModeEnabled, setDarkModeEnabled] = useState(true);

    const renderSettingRow = (label, component) => (
        <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>{label}</Text>
            {component}
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.headerTitle}>Configurações</Text>

            <ScrollView style={styles.scrollView}>

                <Text style={styles.sectionTitle}>Notificações</Text>
                {renderSettingRow(
                    "Receber Notificações Push",
                    <Switch
                        trackColor={{ false: "#767577", true: "#00b0d6" }}
                        thumbColor={notificationsEnabled ? "#00d9ff" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={() => setNotificationsEnabled(previousState => !previousState)}
                        value={notificationsEnabled}
                    />
                )}
                 <TouchableOpacity style={styles.touchableRow} onPress={() => alert('Abrir tela de Notificações Detalhadas!')}>
                     <Text style={styles.settingLabel}>Gerenciar Notificações</Text>
                     <Text style={styles.arrow}>c</Text>
                 </TouchableOpacity>

                <Text style={styles.sectionTitle}>Aparência</Text>
                {renderSettingRow(
                    "Modo Escuro",
                     <Switch
                        trackColor={{ false: "#767577", true: "#00b0d6" }}
                        thumbColor={darkModeEnabled ? "#00d9ff" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={() => setDarkModeEnabled(previousState => !previousState)}
                        value={darkModeEnabled}
                    />
                )}
                 <TouchableOpacity style={styles.touchableRow} onPress={() => alert('Abrir tela de Região/Ligas!')}>
                     <Text style={styles.settingLabel}>Região e Ligas Favoritas</Text>
                      <Text style={styles.arrow}>c</Text>
                 </TouchableOpacity>

                 <Text style={styles.sectionTitle}>Sobre</Text>
                 <TouchableOpacity style={styles.touchableRow} onPress={() => alert('Abrir Política de Privacidade!')}>
                     <Text style={styles.settingLabel}>Política de Privacidade</Text>
                      <Text style={styles.arrow}>c</Text>
                 </TouchableOpacity>
                  <TouchableOpacity style={styles.touchableRow} onPress={() => alert('Versão 1.0.0')}>
                     <Text style={styles.settingLabel}>Versão do App</Text>
                     <Text style={styles.settingLabel}>1.0.0</Text>
                 </TouchableOpacity>

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#18181C',
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff',
        padding: 20,
        paddingBottom: 10,
        backgroundColor: '#2B2B33',
        textAlign: 'center',
    },
    scrollView: {
        flex: 1,
    },
    sectionTitle: {
        color: '#00d9ff',
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 25,
        marginBottom: 10,
        marginLeft: 20,
    },
    settingRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#2B2B33',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#18181C',
    },
    touchableRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#2B2B33',
        paddingVertical: 18,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#18181C',
    },
    settingLabel: {
        color: '#fff',
        fontSize: 16,
    },
    arrow: {
        color: '#888',
        fontSize: 18,
        fontWeight: 'bold',
    }
});