import React, { createContext, useState } from 'react';

// Crear el contexto
const AgendaContext = createContext();

// Proveedor de contexto que maneja el estado global
function AgendaProvider({ children }) {
  // Estado para contactos y citas
  const [contactos, setContactos] = useState([]);
  const [citas, setCitas] = useState([]);

  // Función para agregar un contacto
  function añadirContacto(contacto) {
    setContactos([...contactos, contacto]);
  }

  // Función para agregar una cita
  function añadirCita(cita) {
    setCitas([...citas, cita]);
  }

  // Pasamos los estados y las funciones al contexto
  return (
    <AgendaContext.Provider value={{ contactos, citas, añadirContacto, añadirCita }}>
      {children}
    </AgendaContext.Provider>
  );
}

export { AgendaContext, AgendaProvider };
