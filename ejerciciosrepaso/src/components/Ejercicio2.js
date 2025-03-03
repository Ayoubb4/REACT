/* Uso de Props  
Modifica Saludo.js para que reciba un nombre como prop y muestre "Hola,  [nombre]!". 
 */

import React from "react";

function Ejercicio2(props){
    return <h2>Hola {props.nombre}</h2>
}
export default Ejercicio2