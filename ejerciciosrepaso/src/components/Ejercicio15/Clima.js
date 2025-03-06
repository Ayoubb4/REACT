/* Consulta de Clima con API  
Crea Clima.js que obtenga la temperatura de una ciudad desde OpenWeatherMap. 

Mostrar Fecha y Hora con API 
Crea FechaHoy.js que obtenga la hora desde una api (buscad una por internet) y la  actualice cada segundo. 
 */

import React, { useEffect, useState } from "react";
import axios from 'axios';

function Clima(){

    const[temperatura, setTemperatura] = useState(null);
    const [fechaHora, setFechaHora] = useState("");

    useEffect(function(){
        axios
        .get("https://api.openweathermap.org/data/2.5/weather?q=Calatayud&appid=21979135905a8cbbfaa6021da42c5150&units=metric&lang=es")
        .then(function(respuesta){
            setTemperatura(respuesta.data.main.temp);
        })
        .catch(function(error){
            alert("Error al obtener los datos del clima:", error);
        });
    }, []);
    
    return(
        <div>
            <h2>Temperatura: {temperatura}ºC</h2>

        </div>
    )
}

export default Clima;