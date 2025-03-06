/* Cambio de Tema (Modo Oscuro 
Crea un botón “Modo Oscuro” que guarde la preferencia en LocalStorage. 
 */
import React, { useState, useEffect } from 'react';

function App() {
  // Inicializamos el estado con la preferencia guardada en localStorage o 'light' si no hay ninguna
  const [modoOscuro, setModoOscuro] = useState(localStorage.getItem('modoOscuro') === 'true');

  // Al cambiar el modo, guardamos la preferencia en localStorage
  useEffect(() => {
    localStorage.setItem('modoOscuro', modoOscuro);
  }, [modoOscuro]);

  // Cambia el tema entre modo claro y oscuro
  const cambiarModo = () => {
    setModoOscuro(!modoOscuro);
  };

  return (
    <div style={{ backgroundColor: modoOscuro ? 'black' : 'white', color: modoOscuro ? 'white' : 'black', height: '100vh' }}>
      <button onClick={cambiarModo}>
        {modoOscuro ? 'Modo Claro' : 'Modo Oscuro'}
      </button>
    </div>
  );
}

export default App;
