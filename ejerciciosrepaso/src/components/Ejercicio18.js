import React, { useState } from "react";
import axios from "axios";

function Clima() {

  const [ciudad, setCiudad] = useState("");
  const [datos, setDatos] = useState(null);
  const [error, setError] = useState(null);

  const key = "3c7a7f1dd108b28b8121828172f0fe54"


  const mostrar = () => {

    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${key}&units=metric`)

      .then((response) => {

        setDatos(response.data)
        setError(null)

      })
      .catch((error) => {

        setError("No se pudo encontrar ningun dato")
        setDatos(null)
      })
  }

  let contenido;

  if (error) {

    contenido = (<p>Ciudad no encontrada</p>)
  } else if (datos) {
    contenido = (
      <div>
        <h3>Datos:</h3>
        <p>Ciudad:{datos.name}</p>
        <p>Temperatura:{datos.main.temp} Grados</p>
        <p>Humedad: {datos.main.humidity}%</p>
      </div>
    )

  } else {

    contenido = (<p>Introduce una ciudad</p>)

  }

  return (

    <div>


      <h1>Consultas climaticas</h1>

      <input type="text" id="ciudad" name="ciudad" placeholder="Introduce una ciudad" onChange={(e) => setCiudad(e.target.value)}></input>

      <button onClick={mostrar}>buscar</button>

      {contenido}


    </div>



  )

}

export default Clima;