import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import Svg, { Circle, Line } from 'react-native-svg';
import Icon from './Icon'; // Ajusta la ruta si es necesario

const ListaClimaPorHoras = ({ pronosticoHoras }) => {
  const formatTemperature = (temp) => {
    return Math.round(temp); // Redondea al entero más cercano
  };
  return (
    <View style={styles.container} >
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={true}>
        <Svg height="120" width={pronosticoHoras.length * 60}>
          {pronosticoHoras.map((hora, index) => {
            const nextHora = pronosticoHoras[index + 1];
            const x = index * 60 + 30; // Posición X basada en la hora (espaciado reducido)
            const y = getYCoordinate(hora.temperatura); // Posición Y basada en la temperatura

            return (
              <React.Fragment key={index}>
                {/* Línea que conecta al siguiente punto */}
                {nextHora && (
                  <Line
                    x1={x}
                    y1={y}
                    x2={(index + 1) * 60 + 30}
                    y2={getYCoordinate(nextHora.temperatura)}
                    stroke="#4fc3f7"
                    strokeWidth="2"
                  />
                )}

                {/* Punto actual */}
                <Circle
                  cx={x}
                  cy={y}
                  r="5"
                  fill="#ffab00"
                />
              </React.Fragment>
            );
          })}
        </Svg>

        {/* Textos fuera del Svg */}
        {pronosticoHoras.map((hora, index) => {
          const x = index * 60 + 30; // Posición X basada en la hora (espaciado reducido)
          const y = getYCoordinate(hora.temperatura); // Posición Y basada en la temperatura

          return (
            <React.Fragment key={index}>
              {/* Ícono y hora */}
              <View style={{ position: 'absolute', left: x - 25, top: 120, color: '#fff', }}>
                <Icon datosClima={hora} />
                <Text style={styles.time}>{hora.hora}:00</Text>
              </View>

              {/* Temperatura */}
              <Text style={{ position: 'absolute', left: x - 15, top: y - 35,color: 'white', }}>
                {formatTemperature(hora.temperatura)}°C
              </Text>
            </React.Fragment>
          );
        })}
      </ScrollView>
    </View>
  );
};

/* Función para calcular la posición Y de los puntos */
const getYCoordinate = (temperatura) => {
  const minTemp = -10; // Temperatura mínima para escalar
  const maxTemp = 45; // Temperatura máxima para escalar
  const graphHeight = 100; // Altura del área gráfica


  const normalizedTemp = (temperatura - minTemp) / (maxTemp - minTemp);


  return graphHeight - normalizedTemp * graphHeight;
};



const styles = StyleSheet.create({ 
  container: { 
    backgroundColor: '#2c3e50',  
    borderRadius: 10, 
    height: 220, 
    marginBottom: 12,
    overflowx: 'scroll',
    maxWidth: 500,
  }, 
  scrollContainer: {
    flexDirection: 'row', 
    alignItems: 'center', 
  }, 
  time: { 
    fontSize: 
    14, color: '#fff',
     marginTop: 5,  
    }, 
    temperature: { 
      fontSize: 14, 
      fontWeight: 'bold', 
      color: '#fff', 
      position: 'absolute', 
      marginBottom: 12, }, });

export default ListaClimaPorHoras;






























