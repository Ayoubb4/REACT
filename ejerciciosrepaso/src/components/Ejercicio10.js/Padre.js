import React from 'react';
import Hijo from './Hijo';

function Padre() {
  const mensaje = "Hola desde el Padre";

  return (
    <div>
      <h1>Componente Padre</h1>
      <Hijo mensaje={mensaje} />
    </div>
  );
}

export default Padre;
