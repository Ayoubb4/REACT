/* Agregar y Eliminar Elementos de una Lista  
Crea un componente ListaTareas.js donde el usuario pueda agregar y eliminar tareas. Filtrar Elementos en una Lista  
Agrega una barra de búsqueda a ListaTareas.js para filtrar las tareas por nombre. 
 */


import React, { useState } from 'react';

function ListaTareas() {
  // Usamos useState para crear dos estados: uno para la tarea que estamos escribiendo (tarea) 
  // y otro para las tareas que tenemos en la lista (tareas).
  const [tarea, setTarea] = useState(''); // Aquí se guarda lo que escribimos para agregar una tarea
  const [tareas, setTareas] = useState([]); // Aquí se guarda la lista de todas las tareas que agregamos
  const [filtro, setFiltro] = useState(''); // Este es el estado para la barra de búsqueda

  // Esta función se ejecuta cuando le damos al botón "Agregar"
  // Simplemente agrega la tarea que escribimos a la lista de tareas.
  const agregarTarea = () => {
    setTareas([...tareas, tarea]); // Añadimos la nueva tarea a la lista de tareas
    setTarea(''); // Limpiamos el campo de texto después de agregar la tarea
  };

  // Esta función elimina la tarea que clicamos en "Eliminar"
  // Lo que hace es filtrar la lista de tareas y eliminar la tarea que seleccionamos.
  const eliminarTarea = (index) => {
    const nuevasTareas = tareas.filter((_, i) => i !== index); // Creamos una nueva lista sin la tarea eliminada
    setTareas(nuevasTareas); // Actualizamos la lista de tareas
  };

  return (
    <div>
      {/* Aquí ponemos un input para que el usuario busque tareas por su nombre */}
      <input 
        type="text" 
        value={filtro} // El valor de la búsqueda está guardado en el estado "filtro"
        onChange={(e) => setFiltro(e.target.value)} // Cuando el usuario escribe, se actualiza el estado "filtro"
        placeholder="Buscar tarea"
      />
      
      {/* Esta lista muestra todas las tareas que coinciden con lo que escribe el usuario en la barra de búsqueda */}
      <ul>
        {tareas.filter(t => t.includes(filtro)) // Filtramos las tareas para que solo se muestren las que coinciden con el filtro
          .map((tarea, index) => ( // Recorremos la lista de tareas filtradas
            <li key={index}>
              {tarea} {/* Aquí mostramos el nombre de la tarea */}
              <button onClick={() => eliminarTarea(index)}>Eliminar</button> {/* Y este botón elimina la tarea */}
            </li>
          ))}
      </ul>

      {/* Este es el input donde el usuario escribe la nueva tarea */}
      <input 
        type="text" 
        value={tarea} // El valor del input de la tarea está guardado en el estado "tarea"
        onChange={(e) => setTarea(e.target.value)} // Cuando el usuario escribe, actualizamos el estado "tarea"
        placeholder="Nueva tarea" // Este es el texto que aparece en el campo antes de escribir
      />
      
      {/* Este botón agrega la tarea a la lista cuando se hace clic */}
      <button onClick={agregarTarea}>Agregar</button>
    </div>
  );
}

export default ListaTareas;
