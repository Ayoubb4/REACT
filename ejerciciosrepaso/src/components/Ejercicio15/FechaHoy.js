/* Consulta de Clima con API  
Crea Clima.js que obtenga la temperatura de una ciudad desde OpenWeatherMap. Mostrar Fecha y Hora con API 
Crea FechaHoy.js que obtenga la hora desde una api (buscad una por internet) y la  actualice cada segundo. 
 */

import React from "react";
import axios from 'axios';

function FechaHoy(){
    const [fechaHora, setFechaHora] = useState("");

    /* axios
            .get("http://worldtimeapi.org/api/timezone/Europe/Madrid")
            .then(function (respuesta) {
                let fecha = new Date(respuesta.data.datetime);
                let formatoFechaHora = fecha.toLocaleString("es-ES", { hour12: false });
                setFechaHora(formatoFechaHora);
            })
            .catch(function (error) {
                console.error("Error al obtener la fecha y hora:", error);
            });

    } */
}