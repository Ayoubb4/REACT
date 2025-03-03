/* Contador con Estado  
Crea un componente Contador.js con un número en pantalla y botones Incrementar y  Decrementar.  */

import React, { useState } from "react";

function Ejercicio3(){

    const[contador, setContador] = useState(0);

    function incrementar(){
        setContador(contador + 1); 
    }

    function decrementar(){
        setContador(contador - 1);
    }

    return(
        <div>
            <h2>Contador</h2>
            <h3>{contador}</h3>
            <button onClick={incrementar}>Incrementar</button>
            <button onClick={decrementar}>Decrementar</button>
        </div>
    )

}

export default Ejercicio3;