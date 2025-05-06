import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import CursoCard from '../components/CursoCard';

const cursos_db = [
  { nome: 'Técnico em Informática', modalidade: 'Integrado', turno: 'Manhã' },
  { nome: 'Sistemas para Internet', modalidade: 'Superior', turno: 'Noite' },
];

export default function Cursos() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text variant="titleLarge" style={styles.titulo}>Cursos do Campus</Text>
      {cursos_db.map((curso, index) => (
        <CursoCard key={index} {...curso} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  titulo: { marginBottom: 16 },
});
