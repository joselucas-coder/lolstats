import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const initialNotifications = [
    { id: '1', title: 'Nova Atualização!', message: 'O Patch 25.11 acabou de chegar com mudanças incríveis!' },
];

export default function NotificationScreen() {
    const [notifications, setNotifications] = useState(initialNotifications);

    const dismissNotification = (idToDismiss) => {
        setNotifications(currentNotifications =>
            currentNotifications.filter(notification => notification.id !== idToDismiss)
        );
    };

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
                        data={notifications}
                        renderItem={renderNotificationItem}
                        keyExtractor={item => item.id}
                        contentContainerStyle={styles.scrollContent}
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
        minHeight: 80,
        borderRadius: 10,
        marginBottom: 15,
        padding: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    notificationContent: {
        flex: 1,
        marginRight: 10,
    },
    notificationTitle: {
        color: '#00d9ff',
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    notificationText: {
        color: '#ddd',
        fontSize: 14,
    },
    dismissButton: {
        padding: 5,
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