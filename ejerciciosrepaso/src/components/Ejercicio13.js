/* Ordenar Elementos en una Lista  
Modifica ListaTareas.js para ordenar las tareas por orden alfabético o por fecha de  creación. 
 */


/* Agregar y Eliminar Elementos de una Lista  
Crea un componente ListaTareas.js donde el usuario pueda agregar y eliminar tareas. Filtrar Elementos en una Lista  
Agrega una barra de búsqueda a ListaTareas.js para filtrar las tareas por nombre. 
 */


import React, { useState } from 'react';

function Ejercicio13() {
  var [tarea, setTarea] = useState('');
  var [tareas, setTareas] = useState([]);
  var [filtro, setFiltro] = useState('');

  function agregarTarea() {
    const nuevaTarea = {
        nombre : tarea, 
        fecha : Date.now(),
    };

    setTareas([...tareas, nuevaTarea]);
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

  function ordenarTareas(){
        return tareas
            .filter(function(t){
            return t.nombre.includes(filtro);})//se filtra por nombre

            .sort(function(a,b){
                return a.fecha -b.fecha;})//Ordena por Fecha
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
        {ordenarTareas().map(function(tarea, index) {
          return (
            <li key={index}>
              {tarea.nombre}
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

export default Ejercicio13;
