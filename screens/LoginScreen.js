import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function LoginScreen() {
    return(
        <View style={styles.container}>
            <Text>Pagina de Login</Text>
        </View>
    );
}
const styles = StyleSheet.create({
    container:{
        justifyContent:'center',
        alignItems:'center',
        flex:1,
    }
})