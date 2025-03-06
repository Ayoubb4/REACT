/* Formulario con useState  
Crea un formulario con nombre y edad y muestra los valores ingresados en pantalla.
 */

import React, { useState } from 'react';

function Formulario() {
  const [nombre, setNombre] = useState('');
  const [edad, setEdad] = useState('');

  return (
    <div>
      <input 
        type="text" 
        placeholder="Nombre" 
        value={nombre} 
        onChange={(e) => setNombre(e.target.value)} 
      />
      <input 
        type="number" 
        placeholder="Edad" 
        value={edad} 
        onChange={(e) => setEdad(e.target.value)} 
      />
      <p>Nombre: {nombre}</p>
      <p>Edad: {edad}</p>
    </div>
  );
}

export default Formulario;
