import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Avisos = ({ avisos }) => {

  if (!avisos || avisos.length === 0) {
    return null; 
  }


  const { headline, description, onset, ends } = avisos[0];

  return (
    <View style={styles.container}>
      
      <Text style={styles.content}>{headline}</Text>

      <Text style={styles.title}>Descripción:</Text>
      <Text style={styles.content}>{description}</Text>

      <Text style={styles.title}>Inicio:</Text>
      <Text style={styles.content}>{new Date(onset).toLocaleString('es-ES')}</Text>

      <Text style={styles.title}>Termina:</Text>
      <Text style={styles.content}>{new Date(ends).toLocaleString('es-ES')}</Text>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#2c3e50',
    borderRadius: 8,
    borderColor: "#5d6d7e",
    borderWidth: 1,
    margin: 16,
    elevation: 2,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    fontStyle: 'italic',
    marginTop: 8,
    color: '#fff',
  },
  content: {
    fontSize: 16,
    color: '#fff',
  },
});

export default Avisos;
