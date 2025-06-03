// NewsDetailScreen.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function NewsDetailScreen({ route }) {
    const navigation = useNavigation();
    const { newsItem } = route.params;

    return (
        <View style={styles.container}>
             <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Ionicons name="arrow-back" size={24} color="#fff" />
                <Text style={styles.backText}>Voltar</Text>
            </TouchableOpacity>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {newsItem.image && (
                    <Image source={newsItem.image} style={styles.newsImage} />
                )}
                <Text style={styles.title}>{newsItem.title}</Text>
                <Text style={styles.content}>{newsItem.fullContent}</Text>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1f1f27',
        paddingTop: 50,
    },
     backButton: {
        position: 'absolute',
        top: 40,
        left: 15,
        flexDirection: 'row',
        alignItems: 'center',
        zIndex: 10,
        backgroundColor: 'rgba(0,0,0,0.3)',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 15,
    },
    backText: {
        color: '#fff',
        marginLeft: 5,
        fontSize: 16,
    },
    scrollContent: {
        padding: 20,
        paddingTop: 30,
    },
    newsImage: {
        width: '100%',
        height: 200,
        borderRadius: 15,
        marginBottom: 20,
        resizeMode: 'cover',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 15,
    },
    content: {
        fontSize: 16,
        color: '#ccc',
        lineHeight: 24,
    },
});