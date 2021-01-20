import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [location, setLocation] = useState(false);
  const [clima, setClima] = useState(false);

  let getClima = async (lat, long) => {
    let res = await axios.get(
      "http://api.openweathermap.org/data/2.5/weather",
      {
        params: {
          lat: lat,
          lon: long,
          appid: process.env.REACT_APP_OPEN_WHEATHER_KEY,
          lang: "pt",
          units: "metric",
        },
      }
    );
    setClima(res.data);
    console.log(res.data)
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      getClima(position.coords.latitude, position.coords.longitude);
      setLocation(true);
    });
  }, []);

  if (location == false) {
    return (
      <Fragment>Você precisa habilitar a localização no browser!</Fragment>
    );
  } else {
    return (
      <Fragment>
        <h3>Clima em Coordenadas (Exemplo)</h3>
        <hr />
        <ul>
          <li>Temperatura atual: x°</li>
          <li>Temperatura máxima: x°</li>
          <li>Temperatura minima: x°</li>
          <li>Pressão: x hpa</li>
          <li>Umidade: x%</li>
        </ul>
      </Fragment>
    );
  }
}

export default App;
