import React, { useContext } from 'react';
import { AgendaContext } from './AgendaContext';

function Contactos() {
  const { contactos, añadirContacto } = useContext(AgendaContext); // Usamos el contexto

  // Función para agregar un nuevo contacto
  function agregarNuevoContacto() {
    añadirContacto({ nombre: 'Juan', telefono: '123456789' });
  }

  return (
    <div>
      <h2>Contactos</h2>
      <button onClick={agregarNuevoContacto}>Añadir Contacto</button>
      <ul>
        {contactos.map(function(contacto, index) {
          return <li key={index}>{contacto.nombre} - {contacto.telefono}</li>;
        })}
      </ul>
    </div>
  );
}

export default Contactos;
