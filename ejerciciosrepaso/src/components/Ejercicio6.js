/* Agregar y Eliminar Elementos de una Lista  
Crea un componente ListaTareas.js donde el usuario pueda agregar y eliminar tareas. Filtrar Elementos en una Lista  
Agrega una barra de búsqueda a ListaTareas.js para filtrar las tareas por nombre. 
 */


import React, { useState } from 'react';

function Ejercicio6() {
  var [tarea, setTarea] = useState('');
  var [tareas, setTareas] = useState([]);
  var [filtro, setFiltro] = useState('');

  function agregarTarea() {
    setTareas([...tareas, tarea]);
    setTarea('');
  }

  function eliminarTarea(index) {
    var nuevasTareas = tareas.filter(function(_, i) {
      return i !== index;
    });
    setTareas(nuevasTareas);
  }

  function actualizarFiltro(evento) {
    setFiltro(evento.target.value);
  }

  function actualizarTarea(evento) {
    setTarea(evento.target.value);
  }

  return (
    <div>
      <input 
        type="text" 
        value={filtro} 
        onChange={actualizarFiltro} 
        placeholder="Buscar tarea"
      />
      
      <ul>
        {tareas.filter(function(t) {
          return t.includes(filtro);
        }).map(function(tarea, index) {
          return (
            <li key={index}>
              {tarea}
              <button onClick={function() { eliminarTarea(index); }}>Eliminar</button>
            </li>
          );
        })}
      </ul>

      <input 
        type="text" 
        value={tarea} 
        onChange={actualizarTarea} 
        placeholder="Nueva tarea"
      />
      
      <button onClick={agregarTarea}>Agregar</button>
    </div>
  );
}

export default Ejercicio6;
