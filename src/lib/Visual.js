import axios from "axios";

const BASE_URL =
  "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline";
const API_KEY = "R3XZV2B6CAZHN5A3B7U5LUUH6";

export const obtenerDatosClima = async (ciudad) => {
  try {
    const url = `${BASE_URL}/${encodeURIComponent(ciudad)}?key=${API_KEY}&unitGroup=metric&include=days,hours,alerts,current&iconSet=icons2&contentType=json&lang=es`;

    const response = await axios.get(url);
    return response.data; // Devuelve el JSON completo
  } catch (error) {
    console.error("Error al obtener datos del clima:", error.message);
    throw error;
  }
};
