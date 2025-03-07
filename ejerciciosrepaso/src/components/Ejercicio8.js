/* Temporizador con useEffect  
Crea un temporizador que aumente cada segundo y se detenga cuando llegue a 10. 
 */

import React, { useState, useEffect } from 'react';

function Ejercicio8() {
  const [contador, setContador] = useState(0);

    useEffect(() => {
      if (contador < 10) {
        const intervalo = setTimeout(() => setContador(contador + 1), 1000);
        return () => clearTimeout(intervalo);
      }
    }, [contador]); // Se ejecuta cada vez que cambia "contador"

  return (
    <div>
      <h1>Tiempo: {contador}</h1>
    </div>
  );
}

export default Ejercicio8;
