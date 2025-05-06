import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { supabase } from '../config/supabase';
import { useNavigation } from '@react-navigation/native';

export default function CriarEvento() {
  const [titulo, setTitulo] = useState('');
  const [data, setData] = useState('');
  const [local, setLocal] = useState('');
  const [inscricao, setInscricao] = useState('');
  const [descricao, setDescricao] = useState('');
  
  const [carregando, setCarregando] = useState(false);

  const navigation = useNavigation();

  const cadastrar = async () => {
    
    if (!titulo || !data || !local || !inscricao || !descricao) {
        Alert.alert('Campos obrigatórios', 'Preencha todos os campos.');
        return;
    }

    setCarregando(true);

    const { error } = await supabase.from('eventos').insert([
        {
          titulo,
          data,
          local,
          inscricao,
          descricao,
        },
      ]);

    if (error) {
        Alert.alert('Erro ao criar evento', error.message);
    } else {
        Alert.alert('Sucesso', 'Evento criado com sucesso!');
        navigation.goBack(); // ou navegue para outra tela se preferir
    }

    setCarregando(false);
  };

  return (
    <View style={styles.container}>
      <Text variant="titleLarge" style={{ marginBottom: 16 }}>Criar Conta</Text>

      <TextInput
        label="Título"
        value={titulo}
        onChangeText={setTitulo}
        style={styles.input}
      />
      <TextInput
        label="Data"
        value={data}
        onChangeText={setData}
        style={styles.input}
      />
      <TextInput
        label="Local"
        value={local}
        onChangeText={setLocal}
        style={styles.input}
      />
      <TextInput
        label="Descrição"
        value={descricao}
        onChangeText={setDescricao}
        style={styles.input}
      />
      <TextInput
        label="Inscrição"
        value={inscricao}
        onChangeText={setInscricao}
        style={styles.input}
      />

      <Button mode="contained" onPress={cadastrar} loading={carregando}>
        Cadastrar
      </Button>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 24, flex: 1, justifyContent: 'center' },
  input: { marginBottom: 16 },
});