import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Importar ícones

// Dados de exemplo - No futuro, isso virá do armazenamento ou de uma API
const initialNotifications = [
    { id: '1', title: 'Nova Atualização!', message: 'O Patch 25.11 acabou de chegar com mudanças incríveis!' },
    { id: '2', title: 'Novo Campeão', message: 'Aurora, a Bruxa das Fraldas, está disponível! Veja as habilidades dela.' },
    { id: '3', title: 'Promoção na Loja', message: 'Skins Lendárias com 50% de desconto. Não perca!' },
    { id: '4', title: 'Sua Partida Começa!', message: 'Sua partida ranqueada está prestes a começar.' },
    { id: '5', title: 'Destaque Esports', message: 'LOUD enfrenta paiN Gaming na final do CBLOL!' },
    { id: '6', title: 'Dica do Dia', message: 'Lembre-se de usar suas sentinelas para controlar a visão.' },
    { id: '7', title: 'Bem-vindo!', message: 'Obrigado por usar o LOL Stats App!' },
];

export default function NotificationScreen() {
    // Usamos useState para gerenciar a lista de notificações
    const [notifications, setNotifications] = useState(initialNotifications);

    // Função para remover uma notificação da lista
    const dismissNotification = (idToDismiss) => {
        setNotifications(currentNotifications =>
            currentNotifications.filter(notification => notification.id !== idToDismiss)
        );
        // Aqui, no futuro, você também marcaria a notificação como lida
        // em seu sistema de armazenamento (AsyncStorage, Firestore, etc.)
    };

    // Função para renderizar cada item da lista
    const renderNotificationItem = ({ item }) => (
        <View style={styles.notificationBox}>
            <View style={styles.notificationContent}>
                <Text style={styles.notificationTitle}>{item.title}</Text>
                <Text style={styles.notificationText}>{item.message}</Text>
            </View>
            <TouchableOpacity
                style={styles.dismissButton}
                onPress={() => dismissNotification(item.id)}
            >
                <Ionicons name="close-circle-outline" size={28} color="#777" />
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Notificações</Text>

                {notifications.length > 0 ? (
                    <FlatList
                        data={notifications} // Nossos dados vêm do estado
                        renderItem={renderNotificationItem} // Como renderizar cada item
                        keyExtractor={item => item.id} // Chave única para cada item
                        contentContainerStyle={styles.scrollContent} // Estilo do conteúdo
                    />
                ) : (
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>Nenhuma notificação por aqui!</Text>
                    </View>
                )}

            </View>
        </View>
    );
}

// --- ESTILOS ATUALIZADOS ---
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000'
    },
    content: {
        flex: 1,
        backgroundColor: '#2B2B33',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        padding: 20,
    },
    title: {
        color: '#fff',
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        paddingLeft: 5,
    },
    scrollContent: {
        paddingBottom: 80,
    },
    notificationBox: {
        backgroundColor: '#18181C',
        minHeight: 80, // Usar minHeight para flexibilidade
        borderRadius: 10,
        marginBottom: 15, // Reduzi um pouco
        padding: 15,
        flexDirection: 'row', // Para alinhar conteúdo e botão
        alignItems: 'center', // Alinhar verticalmente
        justifyContent: 'space-between', // Espaço entre conteúdo e botão
    },
    notificationContent: {
        flex: 1, // Permite que o texto ocupe o espaço disponível
        marginRight: 10, // Espaço antes do botão
    },
    notificationTitle: {
        color: '#00d9ff', // Um destaque para o título
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    notificationText: {
        color: '#ddd', // Cor um pouco mais clara
        fontSize: 14,
    },
    dismissButton: {
        padding: 5, // Área de clique maior
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        color: '#888',
        fontSize: 16,
        fontStyle: 'italic',
    }
});