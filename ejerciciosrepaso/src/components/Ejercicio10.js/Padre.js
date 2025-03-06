import React from 'react';
import Hijo from './Hijo';

function Padre() {
  var mensaje = "Hola desde el padre!";

  return (
    <div>
      <h1>Componente Padre</h1>
      <Hijo mensajeDelPadre={mensaje} />
    </div>
  );
}

export default Padre;
