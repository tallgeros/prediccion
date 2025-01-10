import React, { useEffect, useState } from 'react';
import { Image } from 'react-native';

const iconosClima = {
  "clear-day": require("../../assets/icons/clear-day.png"),
  "clear-night": require("../../assets/icons/clear-night.png"),
  "cloudy": require("../../assets/icons/cloudy.png"),
  "fog": require("../../assets/icons/fog.png"),
  "hail": require("../../assets/icons/hail.png"),
  "partly-cloudy-day": require("../../assets/icons/partly-cloudy-day.png"),
  "partly-cloudy-night": require("../../assets/icons/partly-cloudy-night.png"),
  "rain-snow-showers-day": require("../../assets/icons/rain-snow-showers-day.png"),
  "rain-snow-showers-night": require("../../assets/icons/rain-snow-showers-night.png"),
  "rain-snow": require("../../assets/icons/rain-snow.png"),
  "rain": require("../../assets/icons/rain.png"),
  "showers-day": require("../../assets/icons/showers-day.png"),
  "showers-night": require("../../assets/icons/showers-night.png"),
  "snow": require("../../assets/icons/snow.png"),
  "sleet": require("../../assets/icons/sleet.png"),
  "snow-showers-day": require("../../assets/icons/snow-showers-day.png"),
  "snow-showers-night": require("../../assets/icons/snow-showers-night.png"),
  "thunder-rain": require("../../assets/icons/thunder-rain.png"),
  "thunder-showers-day": require("../../assets/icons/thunder-showers-day.png"),
  "thunder-showers-night": require("../../assets/icons/thunder-showers-night.png"),
  "thunder": require("../../assets/icons/thunder.png"),
  "wind": require("../../assets/icons/wind.png"),

};

const Icon = ({ datosClima, width = 50, height = 50 }) => {
  const [icono, setIcono] = useState(null);

  useEffect(() => {

    if (datosClima && datosClima.icono) {
      const iconoEncontrado = iconosClima[datosClima.icono];
      if (iconoEncontrado) {
        setIcono(iconoEncontrado);
      }
    }
  }, [datosClima]); 

  if (!icono) {
    return null;
  }

  return <Image source={icono} style={{ width: Number(width), height: Number(height) }} />;
};

export default Icon;

