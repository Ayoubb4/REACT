/*  Evento en Botón 
Crea un botón que, al hacer clic, cambie el color de fondo de la página. */
import React from 'react';

function Ejercicio5({ color, setColorFondo }) {
  function cambiarColor() {
    setColorFondo(prevColor => (prevColor === 'red' ? 'white' : 'red'));
  }

  return (
    <div>
      <button onClick={cambiarColor}>Cambiar Color</button>
    </div>
  );
}

export default Ejercicio5;