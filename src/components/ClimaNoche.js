import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

// Mapeo estático de fases lunares a imágenes
const iconosLuna = {
  0: require("../../assets/luna/lunanueva.png"),
  creciente: require("../../assets/luna/creciente.png"),
  cuartoCreciente: require("../../assets/luna/cuarto-creciente.png"),
  gibosaCreciente: require("../../assets/luna/gibosa-creciente.png"),
  llena: require("../../assets/luna/lunallena.png"),
  gibosaMenguante: require("../../assets/luna/gibosa-menguante.png"),
  cuartoMenguante: require("../../assets/luna/cuarto-menguante.png"),
  menguante: require("../../assets/luna/creciente-menguante.png"),
};

const ClimaNoche = ({ datosNoche }) => {
  if (!datosNoche || !datosNoche.faseLunar || !datosNoche.salidaLuna || !datosNoche.puestaLuna) {
    return <Text style={styles.text}>No hay datos nocturnos disponibles.</Text>;
  }

  const { faseLunar, salidaLuna, puestaLuna } = datosNoche;

  // Determinar la clave para el icono según la fase lunar
  const obtenerClaveFase = (fase) => {
    if (fase === 0) return 0;
    if (fase > 0 && fase < 0.25) return "creciente";
    if (fase === 0.25) return "cuartoCreciente";
    if (fase > 0.25 && fase < 0.5) return "gibosaCreciente";
    if (fase === 0.5) return "llena";
    if (fase > 0.5 && fase < 0.75) return "gibosaMenguante";
    if (fase === 0.75) return "cuartoMenguante";
    return "menguante";
  };

  const claveFase = obtenerClaveFase(faseLunar);
  const icono = iconosLuna[claveFase];

  return (
    <View style={styles.card}>
      <Text style={styles.heading}>Fase Lunar</Text>
      {icono && <Image source={icono} style={styles.icon} />}
      <Text style={styles.text} >Fase actual: {claveFase}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: "#2c3e50",
    borderRadius: 10,
    paddingVertical: 10,
    margin: 5,
    alignItems: "center",
    maxWidth: 500,
    width: "90%",
    justifyContent: 'center',
    marginHorizontal: 'auto',
    marginBottom: 20,
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#fff",
  },
  icon: {
    width: 120,
    height: 120,
    marginBottom: 10,
  },
  text: {
    color: "#bdc3c7",
    fontSize: 14,
    textAlign: "center",
  },
});

export default ClimaNoche;


