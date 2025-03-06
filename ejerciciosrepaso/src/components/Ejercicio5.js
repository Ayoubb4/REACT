/*  Evento en Botón 
Crea un botón que, al hacer clic, cambie el color de fondo de la página. */

import React, { useState } from 'react';

function App() {
  const [color, setColor] = useState('white');

  const cambiarColor = () => {
    setColor(color === 'white' ? 'lightblue' : 'white');
  };

  return (
    <div style={{ backgroundColor: color, height: '100vh' }}>
      <button onClick={cambiarColor}>Cambiar Color de Fondo</button>
    </div>
  );
}

export default App;
