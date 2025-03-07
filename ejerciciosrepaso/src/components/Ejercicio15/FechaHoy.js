/* Consulta de Clima con API  
Crea Clima.js que obtenga la temperatura de una ciudad desde OpenWeatherMap. Mostrar Fecha y Hora con API 
Crea FechaHoy.js que obtenga la hora desde una api (buscad una por internet) y la  actualice cada segundo. 
 */

import React, { useState, useEffect } from "react"; // Agregamos 'useState' y 'useEffect'
import axios from "axios";

function FechaHoy() {
    const [fechaHora, setFechaHora] = useState(null);

    useEffect(function () {

        function obtenerFecha(){
            axios
            .get("http://worldtimeapi.org/api/timezone/Europe/Madrid")
            .then(function (respuesta) {
                let fecha = new Date(respuesta.data.datetime);
                let formatoFecha = fecha.toLocaleString("es-ES", { hour12: false });
                setFechaHora(formatoFecha);
            })
            .catch(function (error) {
                console.log("Error al obtener datos", error);
            });
        }

            obtenerFecha(); // Llama a la función inmediatamente para mostrar la hora al cargar
            const intervalo = setInterval(obtenerFecha, 1000);

        return function limpieza(){
            clearInterval(intervalo);
        }
    }, []); // El array vacío asegura que useEffect se ejecute solo una vez al cargar el componente

    return (
        <div>
            <h2>Fecha y Hora: {fechaHora}</h2>
        </div>
    );
}

export default FechaHoy; // Asegúrate de exportarlo para poder usarlo en otros archivos