import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path, Circle, Text as SvgText } from 'react-native-svg';

const IndicadorAmanecerAtardecer = ({ amanecer = "06:00", atardecer = "18:00", horaPrediccion = "12:00" }) => {
  const parseHora = (hora) => {
    if (typeof hora !== "string" || !hora.includes(":")) return [0, 0];
    return hora.split(":").map(Number);
  };

  const [horaAmanecer, minutoAmanecer] = parseHora(amanecer);
  const [horaAtardecer, minutoAtardecer] = parseHora(atardecer);
  const [horaPred, minutoPred] = parseHora(horaPrediccion);

  const minutosAmanecer = horaAmanecer * 60 + minutoAmanecer;
  const minutosAtardecer = horaAtardecer * 60 + minutoAtardecer;
  const minutosPrediccion = horaPred * 60 + minutoPred;

  if (minutosAmanecer >= minutosAtardecer || minutosPrediccion < minutosAmanecer || minutosPrediccion > minutosAtardecer) {
    return (
      <View style={styles.container}>
        <SvgText x="0" y="0" fontSize="14" fill="red" textAnchor="middle">
          Datos inválidos
        </SvgText>
      </View>
    );
  }

  const porcentaje =
    (minutosPrediccion - minutosAmanecer) /
    (minutosAtardecer - minutosAmanecer);

  const radius = 80; // Radio más pequeño para móviles
  const angle = Math.PI * porcentaje;
  const x = radius * Math.cos(angle);
  const y = -radius * Math.sin(angle);

  return (
    <View style={styles.container}>
      <Svg height="100" width="200" viewBox="-100 -100 200 100">
        {/* Semicírculo más estrecho */}
        <Path
          d={`M -80 0 A 80 80 0 0 1 80 0`}
          fill="none"
          stroke="#FFD700"
          strokeWidth="4"
        />
        {/* Texto Amanecer dentro del arco */}
        <SvgText
          x="-50"
          y="-10"
          fontSize="10"
          fill="#FFD700"
          textAnchor="middle"
        >
          {amanecer}
        </SvgText>
        {/* Texto Atardecer dentro del arco */}
        <SvgText
          x="50"
          y="-10"
          fontSize="10"
          fill="#FFD700"
          textAnchor="middle"
        >
          {atardecer}
        </SvgText>
        {/* Punto del sol */}
        <Circle cx={x} cy={y} r="4" fill="orange" />
        {/* Hora de la predicción sobre el sol */}
        <SvgText
          x={x}
          y={y - 8}
          fontSize="8"
          fill="#000"
          textAnchor="middle"
        >
          {horaPrediccion}
        </SvgText>
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginVertical: 8,
  },
});

export default IndicadorAmanecerAtardecer;

