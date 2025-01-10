import React, { useState } from "react";
<<<<<<< HEAD
import { Platform, Dimensions, View, Text, StyleSheet, TextInput, ScrollView, ActivityIndicator, TouchableOpacity } from "react-native";
import { obtenerDatosClima } from "./lib/Visual";
=======
import { Platform, Dimensions, View, Text, StyleSheet, TextInput, ScrollView, ActivityIndicator } from "react-native";
import { obtenerDatosClima } from "./lib/Visual";
import { FontAwesome } from "@expo/vector-icons";
>>>>>>> 9330a5f44ba7ac80405ec0e212eece924d30315f
import IndicadorCircular from "./components/IndicadorCircular";
import IndicadorAmanecerAtardecer from "./components/IndicadorAmanecerAtardecer";
import Icon from "./components/Icon";
import ClimaNoche from "./components/ClimaNoche";
import ListaClimaPorHoras from "./components/ListaClimaPorHoras";
import PronosticoDias from "./components/PronosticoDias";
import Avisos from "./components/Avisos";

export function Main() {
  const [searchText, setSearchText] = useState("");
  const [datosClima, setDatosClima] = useState(null);
  const [datosNoche, setDatosNoche] = useState(null);
  const [pronosticoHoras, setPronosticoHoras] = useState(null);
  const [pronosticoCincoDias, setPronosticoCincoDias] = useState();
  const [avisos, setAvisos] = useState();
   const [loading, setLoading] = useState(false);
   const { width } = Dimensions.get("window");
  //  const { height } = Dimensions.get('window');

  const handleSearch = async () => {
    if (searchText.trim()) {
      setSearchText('');
      setLoading(true); // Mostrar indicador de carga
      try {
        const data = await obtenerDatosClima(searchText.trim());    
        if (data && data.days && data.days.length > 0) {
          const datosHoy = {
            ubicacion: data.resolvedAddress,
            fecha: new Date(data.days[0].datetime).toLocaleDateString("es-ES", {
              weekday: "long",
              day: "numeric",
              month: "long",
            }),
            temperatura: data.days[0]?.temp ?? 0,
            temperaturaMax: data.days[0]?.tempmax ?? 0,
            temperaturaMin: data.days[0]?.tempmin ?? 0,
            condicion: data.days[0]?.conditions ?? "Desconocido",
            humedad: data.days[0]?.humidity ?? 0,
            viento: `${data.days[0]?.windspeed ?? 0} km/h`,
            direccionViento: data.days[0]?.winddir ?? "N/A",
            icono: data.days[0]?.icon || "clear-day.png",
            presion: data.days[0]?.pressure ?? 0,
            amanecer: data.days[0]?.sunrise ?? "N/A",
            atardecer: data.days[0]?.sunset ?? "N/A",
            sensacionTermica: data.days[0]?.feelslike ?? 0,
            uv: data.days[0]?.uvindex ?? 0,
            lluvia: data.days[0]?.precip ?? 0,
            lluviaposibilidad: data.days[0]?.precipprob ?? 0,
            nieve: data.days[0]?.snow ?? 0,
            grosornieve: data.days[0]?.snowdepth ?? 0,

          };
          
          const datosNoche = {
            ubicacion: data.resolvedAddress,
            faseLunar: data.days[0]?.moonphase ?? "N/A",
            salidaLuna: data.days[0]?.moonrise ?? "N/A",
            puestaLuna: data.days[0]?.moonset ?? "N/A",
          };

          const pronosticoHoras = data.days[0].hours.map((hora) => ({
            hora: hora.datetime.split(":")[0],
            temperatura: hora.temp ?? "--",
            icono: hora.icon ?? "default.png",
          }));

          const pronosticoCincoDias = data.days.slice(1, 6).map((dia) => ({
            fecha: `${new Date(dia.datetime).getDate()}/${
              new Date(dia.datetime).getMonth() + 1
            }`,
            temperaturaMax: dia.tempmax,
            temperaturaMin: dia.tempmin,
            condicion: dia.conditions,
            icono: dia.icon,
          }));
          const avisos = data.alerts || [];

          setDatosClima(datosHoy);
          setDatosNoche(datosNoche);
          setPronosticoHoras(pronosticoHoras);
          setPronosticoCincoDias(pronosticoCincoDias);
          setAvisos(avisos);
        } else {
          console.error("Los datos del clima no contienen información válida.");
        }
      } catch (error) {
        alert("Error al buscar el clima:", error);
      } finally {
        setLoading(false); // Ocultar indicador de carga
      }
    } else {
      alert("Por favor, ingresa una ciudad.");
    }
  };
  

  // Función para calcular el color según el índice UV
  const obtenerColorUV = (valor) => {
    return valor <= 2
      ? "#00FF00"
      : valor <= 5
      ? "#FFFF00"
      : valor <= 7
      ? "#FFA500"
      : valor <= 10
      ? "#FF0000"
      : "#800080";
  };

  return (
    <View
    style={[
      styles.container,
      width > 600 && Platform.OS === "web" ? styles.webContainer : null,
    ]}
  >
      {/* Header Superior */}
      <View style={styles.searchHeader}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar ciudad"
          value={searchText}
          onChangeText={setSearchText}
          autoCapitalize="words"
        />
<<<<<<< HEAD
  <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
    <Text style={styles.searchButtonText}>Buscar</Text>
  </TouchableOpacity>
=======
        <FontAwesome
          style={styles.search}
          name="search"
          size={24}
          color="#000"
          onPress={handleSearch}
        />
>>>>>>> 9330a5f44ba7ac80405ec0e212eece924d30315f
      </View>
      {/* Indicador de carga */}
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
      {!loading && datosClima && (
        <ScrollView contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>
          {/* Header Central */}
          <View style={styles.centralHeader}>
            <Text style={styles.cityName}>{datosClima.ubicacion}</Text>
            <Text style={styles.date}>{datosClima.fecha}</Text>
          </View>

          {/* Header Inferior */}
          <View style={styles.bottomHeader}>
            <View style={styles.iconogrande}>
            <Icon datosClima={datosClima} width={180} height={150} />
            </View>
            <View style={styles.estado}>
              <Text style={styles.description}>{datosClima.condicion}</Text>
              <Text style={styles.temperature}>{datosClima.temperatura}°C</Text>
              <Text style={styles.minMax}>
                {datosClima.temperaturaMax}° / {datosClima.temperaturaMin}°
              </Text>
            </View>
          </View>

          {/* Grid con Información Detallada */}
          <View style={styles.grid}>
            <View style={styles.gridItem}>
              <IndicadorCircular
                titulo="Sensación Térmica"
                valor={datosClima.sensacionTermica}
                maxValor={40}
                unidad="°C"
              />
            </View>

            <View style={styles.gridItem}>
              <IndicadorCircular
                titulo="Humedad"
                valor={datosClima.humedad}
                maxValor={100}
                unidad="%"
                color="#00c6ff"
              />
            </View>
            <View style={styles.gridItem}>
              <IndicadorCircular
                titulo="Viento"
                valor={parseFloat(datosClima.viento)}
                maxValor={50}
                unidad=" km/h"
                color="#00c6ff"
                direccionViento={datosClima.direccionViento}
              />
            </View>
            <View style={styles.gridItem}>
              <IndicadorCircular
                titulo="Presión"
                valor={datosClima.presion}
                maxValor={1100}
                unidad="hPa"
              />
            </View>
            <View style={styles.gridItem}>
              <IndicadorAmanecerAtardecer
                amanecer={datosClima.amanecer}
                atardecer={datosClima.atardecer}
              />
            </View>

            <View style={styles.gridItem}>
              <IndicadorCircular
                titulo="Radiación UV"
                valor={datosClima.uv}
                maxValor={11}
                unidad=""
                color={obtenerColorUV(datosClima.uv)}
              />
            </View>
            {avisos.length > 0 && <Avisos avisos={avisos} />}
            <View style={styles.horas}>
            <ListaClimaPorHoras pronosticoHoras={pronosticoHoras} />
            </View>

            <View style={styles.precipitacionCard}>
              <Text style={styles.cardTitle}>Precipitación</Text>
              <View style={styles.row}>
                <Text style={styles.textLabel}>Probabilidad:</Text>
                <Text style={styles.textValue}>
                  {datosClima.lluviaposibilidad}%
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.textLabel}>Lluvia:</Text>
                <Text style={styles.textValue}>{datosClima.lluvia} mm</Text>
              </View>
            </View>

            <View style={styles.precipitacionCard}>
              <Text style={styles.cardTitle}>Nevadas</Text>
              <View style={styles.row}>
                <Text style={styles.textLabel}>Probabilidad:</Text>
                <Text style={styles.textValue}>{datosClima.nieve}%</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.textLabel}>Grosor:</Text>
                <Text style={styles.textValue}>
                  {datosClima.grosornieve} mm
                </Text>
              </View>
            </View>
          </View>
          <PronosticoDias pronosticoCincoDias={pronosticoCincoDias} />
          <ClimaNoche datosNoche={datosNoche} />
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#34495e", paddingTop: 45 },
  webContainer: {
  maxWidth: 600, 
  width: "100%", 
  height: "height",
  flex: 1,
  alignItems: 'center',
  marginHorizontal: 'auto',
  },
  searchHeader: {
<<<<<<< HEAD
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#34495e',
    borderWidth: 1,
    borderColor: '#5d6d7e',
    borderRadius: 8,
    width: '90%',
    marginHorizontal: 'auto',
=======
    flexDirection: "row",
    marginBottom: 16,
    alignSelf: "center",
    width: "90%",
>>>>>>> 9330a5f44ba7ac80405ec0e212eece924d30315f
  },
  searchInput: {
    flex: 1,
    padding: 8,
<<<<<<< HEAD
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#5d6d7e',
    borderRadius: 8,
    marginRight: 10,
    backgroundColor: '#5d6d7e',
    color: '#FFF',
  },
  searchButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
=======
    borderWidth: 1,
    borderColor: "#5d6d7e",
    borderRadius: 8,
    backgroundColor: "#5d6d7e",
    fontSize: 16,
    color: "#fff",
  },
  search: { position: "absolute", top: 10, right: 20, size: 24 },
>>>>>>> 9330a5f44ba7ac80405ec0e212eece924d30315f
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  centralHeader: { 
    alignItems: "center", 
    marginBottom: 16,
    maxWidth: 500, 
  },
  cityName: { fontSize: 20, fontWeight: "bold", color: "#fff" },
  date: { fontSize: 18, color: "#fff" },
  bottomHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 12,
    maxWidth: 500,
  },
  iconogrande: {
    width: '52%',
    justifyContent: "center",
    alignItems: "center",
  },

  estado: {
    width: "50%",
    flexDirection: "column",
    flexWrap: "wrap",
    alignItems: "flex-start",
    paddingRight: 6,
  },
  description: { fontSize: 16, color: "#fff" },
  temperature: { fontSize: 24, fontWeight: "bold", color: "#fff" },
  minMax: { fontSize: 16, color: "#fff" },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    maxWidth: 500,
    marginHorizontal: 'auto',
  },
  gridItem: {
    backgroundColor: "#2c3e50",
    width: "49%",
    marginBottom: 16,
    borderColor: "#5d6d7e",
    borderWidth: 1,
    borderRadius: 12,
    elevation: 3,
    marginHorizontal: 'auto',
  },
  precipitacionCard: {
    width: "49%",
    backgroundColor: "#2c3e50",
    borderRadius: 10,
    padding: 10,
    borderColor: "#5d6d7e",
    borderWidth: 1,
    alignItems: "center",
    maxWidth: 500,
    marginHorizontal: 'auto',
  },
  cardTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 5,
  },
  textLabel: {
    color: "#bdc3c7",
    fontSize: 14,
  },
  textValue: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

});
