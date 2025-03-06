/* Notificaciones de Citas  
Muestra un alerta si hay una cita programada para el día de hoy hazlo con la hora para casa. 
 */

import React, { useEffect, useState } from "react";

function Ejercicio14(){
    const [citas, setCitas] = useState([
        {nombre:"Cita con el doctor" , fecha: "2025-05-23"},
        {nombre: "Itv Coche", fecha:"2025-10-22"},
        {nombre: "Estudiar Examen", fecha:"2025-03-06"},
    ]);

    useEffect(function(){
        const hoy = new Date().toISOString().split("T")[0];

        const citaHoy = citas.find(function(cita){
            return cita.fecha === hoy;
        });

        if(citaHoy){
            alert(`Tienes una cita hoy ${citaHoy.nombre}`)
        }
    }, [citas]);
    
    return (
        <div>
          <h1>Notificaciones de Citas</h1>
        </div>
      );

}

export default Ejercicio14;