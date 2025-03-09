/* Ejercicio 1: Cambio de Tema (Modo Oscuro) con Preferencia Guardada (15 puntos)
Crea un botón "Modo Oscuro" que:

Cambie el color de fondo de la página entre claro y oscuro.
Al recargar la página, mantenga el último modo seleccionado usando LocalStorage.
Agrega una animación para que el cambio de tema sea suave. */

import React, { useEffect, useState } from "react";

function Prueba1(){
    var [oscuro, setOscuro] = useState(false);

    useEffect(function (){
        var fondoGuardado = localStorage.getItem("modoOscuro") === "true";
        setOscuro(fondoGuardado);
    }, []);

    function cambiarFondo(){
        var nuevoFondo=!oscuro;
        setOscuro(nuevoFondo);
        localStorage.getItem("modoOscuro",nuevoFondo);
    }

    return (
        <h1 style={{background: oscuro ? "black" : "white", color: oscuro ? "white" : "black"}}>

            <button onClick={cambiarFondo}>  Modo {oscuro ? "Claro" : "Oscuro"}</button>

        </h1>
    )
}

export default Prueba1;