import React from 'react';

function Hijo(props) {
  return (
    <div>
      <h2>Componente Hijo</h2>
      <p>{props.mensaje}</p>
    </div>
  );
}

export default Hijo;
