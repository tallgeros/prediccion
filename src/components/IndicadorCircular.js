import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Svg, { Circle, Text as SvgText, Line } from "react-native-svg";

const IndicadorCircular = ({
  titulo,
  valor,
  maxValor,
  unidad,
  color = "#00c6ff",
  extraText = "",
  direccionViento,
}) => {
  const radio = 40;
  const circunferencia = 2 * Math.PI * radio;
  const porcentaje = maxValor ? (valor / maxValor) * 100 : 0;
  const offset = circunferencia - (porcentaje / 100) * circunferencia;

  const cardinales = [
    { dir: "N", angle: 0, color: "#5d6d7e" },
    { dir: "NE", angle: 45, color: "#5d6d7e" },
    { dir: "E", angle: 90, color: "#5d6d7e" },
    { dir: "SE", angle: 135, color: "#5d6d7e" },
    { dir: "S", angle: 180, color: "#5d6d7e" },
    { dir: "S0", angle: 225, color: "#5d6d7e" },
    { dir: "0", angle: 270, color: "#5d6d7e" },
    { dir: "N0", angle: 315, color: "#5d6d7e" },
  ];

  return (
    <View style={styles.metrica}>
      <Text style={styles.titulo}>{titulo}</Text>
      <Svg height="120" width="120" viewBox="0 0 100 100">
        {/* Fondo del círculo */}
        <Circle cx="50" cy="50" r={radio} stroke="#e6e6e6" strokeWidth="10" fill="none" />
        {/* Progreso del círculo */}
        {maxValor && (
          <Circle
            cx="50"
            cy="50"
            r={radio}
            stroke={color}
            strokeWidth="10"
            fill="none"
            strokeDasharray={circunferencia}
            strokeDashoffset={offset}
          />
        )}
        {/* Texto en el centro */}
        {valor !== undefined && (
          <SvgText
            x="50"
            y="55"
            textAnchor="middle"
            fontSize="14"
            fill="#ffffff"
          >
            {`${valor}${unidad}`}
          </SvgText>
        )}
        {/* Puntos cardinales */}
        {direccionViento !== undefined &&
          cardinales.map(({ dir, angle, color }) => {
            const angleRad = (angle * Math.PI) / 180;
            const x = 50 + (radio + 15) * Math.cos(angleRad);
            const y = 50 - (radio + 15) * Math.sin(angleRad); // Eje Y invertido
            return (
              <SvgText
                key={dir}
                x={x}
                y={y + 5} // Ajustar para centrar texto
                fontSize="12"
                fill={color}
                textAnchor="middle"
              >
                {dir}
              </SvgText>
            );
          })}
        {/* Aguja para el viento */}
        {direccionViento !== undefined && (
          <Line
            x1="50"
            y1="50"
            x2="50"
            y2="10"
            stroke={color}
            strokeWidth="2"
            transform={`rotate(${direccionViento} 50 50)`}
          />
        )}
      </Svg>
      {/* Texto adicional debajo del indicador */}
      {extraText !== "" && <Text style={styles.extraText}>{extraText}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  metrica: {
    alignItems: "center",
    margin: 10,
  },
  titulo: {
    color: "#ffffff",
    marginBottom: 5,
    fontSize: 16,
  },
  extraText: {
    color: "#ffffff",
    marginTop: 5,
    fontSize: 14,
  },
});

export default IndicadorCircular;



