import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Text, Button, ActivityIndicator } from 'react-native-paper';
import EventoCard from '../components/EventoCard';

import { supabase } from '../config/supabase';

export default function Eventos({ navigation }) {
    const [eventos, setEventos] = useState([]);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        async function buscar() {
            const { data, error } =
                await supabase.from('eventos').select('*');

            if (error) {
                console.log(error);
            }
            else {
                setEventos(data);
            }
            setCarregando(false);
        }
        buscar();
    }, [])

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text variant="titleLarge" style={styles.titulo}>Eventos Acadêmicos</Text>

            {carregando && <ActivityIndicator animating />}

            {!carregando && eventos.length === 0 && <Text>Não tem registros</Text>}

            {eventos.map((evento, index) => (
                <EventoCard
                    key={index}
                    {...evento}
                    onPress={() => navigation.navigate('DetalheEvento', evento)}
                />
            ))}
            <Button
                mode="outlined"
                onPress={() => navigation.navigate('CriarEvento')}
                style={styles.botao}
            >
                Criar Evento
            </Button>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { padding: 20 },
    titulo: { marginBottom: 16 },
});