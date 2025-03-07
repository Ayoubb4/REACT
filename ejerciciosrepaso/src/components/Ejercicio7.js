/* Cambio de Tema (Modo Oscuro 
Crea un botón “Modo Oscuro” que guarde la preferencia en LocalStorage. 
 */
import React from 'react';

function Ejercicio7({ setColorFondo }) {
  function cambiarColor() {
    setColorFondo(prevColor => {
      const newColor = prevColor === 'black' ? 'white' : 'black';
      return newColor;
    });
  }

  return (
    <div>
      <button onClick={cambiarColor}>
        Cambiar a {setColorFondo === 'black' ? 'Modo Claro' : 'Modo Oscuro'}
      </button>
    </div>
  );
}

export default Ejercicio7;
