import React from 'react';

function Hijo(props) {
  return (
    <div>
      <h2>Componente Hijo</h2>
      <p>{props.mensajeDelPadre}</p>
    </div>
  );
}

export default Hijo;
