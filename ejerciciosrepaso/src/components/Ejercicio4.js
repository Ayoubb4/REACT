/* Lista de Elementos 
Crea un componente ListaFrutas.js que mues	tre una lista de frutas (["Manzana",  "Pera", "Banana"]). 
 */

import React from "react";

function Ejercicio4 (){
    const frutas = ["Manzana", "Pera", "Banana"];

    return(
        <ul>
            {frutas.map((fruta, index) => (
            <li key={index}>{fruta}</li>
            ))}
        </ul>
    );
}

export default Ejercicio4;
