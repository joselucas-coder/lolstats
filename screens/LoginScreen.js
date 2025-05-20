import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';

import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { useEffect } from 'react';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import Constants from 'expo-constants';

export default function LoginScreen({ navigation }) {
  WebBrowser.maybeCompleteAuthSession();

const [request, response, promptAsync] = Google.useAuthRequest({
  expoClientId: '1056193214215-4uegt7esptiu7bude5dsjd7bed90ngqv.apps.googleusercontent.com',
  androidClientId: 'SEU_ANDROID_CLIENT_ID',
  iosClientId: 'SEU_IOS_CLIENT_ID',
});

useEffect(() => {
  if (response?.type === 'success') {
    const { id_token } = response.params;
    const credential = GoogleAuthProvider.credential(id_token);
    signInWithCredential(auth, credential)
      .then(() => {
        console.log('Login com Google feito!');
      })
      .catch((error) => {
        console.error('Erro ao logar com Google:', error);
      });
  }
}, [response]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false); // Para alternar entre login e cadastro

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error('Erro ao logar:', error.message);
    }
  };

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      alert('As senhas não coincidem');
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert('Cadastro realizado com sucesso');
    } catch (error) {
      console.error('Erro ao criar conta:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isRegistering ? 'Cadastre-se' : 'Entre na sua conta'}</Text>

      {isRegistering && (
        <TextInput
          placeholder="Nome"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
      )}

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />
      {isRegistering && (
        <TextInput
          placeholder="Confirmar Senha"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          style={styles.input}
          secureTextEntry
        />
      )}

      <Button title={isRegistering ? 'Cadastrar' : 'Entrar'} onPress={isRegistering ? handleRegister : handleLogin} />

      <View style={{ marginVertical: 10 }}>
        <Button
        title="Entrar com Google"
        onPress={() => promptAsync()}
        disabled={!request}
        color="#DB4437"
        />
        </View>


      <TouchableOpacity onPress={() => setIsRegistering(!isRegistering)}>
        <Text style={styles.link}>{isRegistering ? 'Já tem uma conta? Entre' : 'Não tem uma conta? Cadastre-se'}</Text>
      </TouchableOpacity>
    </View>

    
    
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  input: { height: 40, borderBottomWidth: 1, marginBottom: 12 },
  link: { marginTop: 16, color: 'blue', textAlign: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
});
