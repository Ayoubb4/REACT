// Ejemplo 2: Buscar un Pokémon específico
import React, { useState } from 'react';
import axios from 'axios';
import './PokemonSearch.css';

function PokemonSearch({ onSelectPokemon }) {
  const [search, setSearch] = useState(''); // Almacena el valor ingresado por el usuario en el campo de búsqueda.
  const [loading, setLoading] = useState(false); // Estado para mostrar si estamos cargando la información.
  const [error, setError] = useState(''); // Almacena un mensaje de error si no se encuentra el Pokémon.

  /*
    • search: Almacena el valor ingresado por el usuario en el campo de búsqueda.
    • setSearch: Función para actualizar el estado search.
    • pokemon: Estado que almacena los datos del Pokémon encontrado.
    • setPokemon: Función para actualizar el estado pokemon.
    • error: Almacena un mensaje de error si no se encuentra el Pokémon.
    • setError: Función para actualizar el estado error.
  */

  function fetchPokemon() {
    if (!search.trim()) return; // Si el campo de búsqueda está vacío, no hacer nada.

    setLoading(true); // Empezamos a cargar los datos.
    setError(''); // Limpiamos cualquier error previo.

    axios.get(`https://pokeapi.co/api/v2/pokemon/${search.toLowerCase()}`) // Realizamos la solicitud GET para obtener datos del Pokémon ingresado.
      .then(response => {
        // Si la respuesta es exitosa, procesamos los datos.
        const pokemon = {
          name: response.data.name,
          image: response.data.sprites.front_default, // Imagen del Pokémon.
          height: response.data.height, // Altura del Pokémon.
          weight: response.data.weight, // Peso del Pokémon.
          types: response.data.types.map(t => t.type.name), // Tipos del Pokémon.
          stats: response.data.stats.map(s => ({ name: s.stat.name, value: s.base_stat })), // Estadísticas del Pokémon.
          color: getColor(response.data.types[0].type.name) // Color basado en el tipo del Pokémon.
        };
        onSelectPokemon(pokemon); // Llamamos a la función onSelectPokemon para pasarle los datos del Pokémon.
      })
      .catch(() => setError('Pokémon no encontrado.')) // Si ocurre un error, mostramos un mensaje.
      .finally(() => setLoading(false)); // Finalmente, dejamos de mostrar el estado de carga.
  }

  function getColor(type) {
    const colors = {
      fire: '#F08030', water: '#6890F0', grass: '#78C850', electric: '#F8D030',
      ice: '#98D8D8', fighting: '#C03028', poison: '#A040A0', ground: '#E0C068',
      flying: '#A890F0', psychic: '#F85888', bug: '#A8B820', rock: '#B8A038',
      ghost: '#705898', dragon: '#7038F8', dark: '#705848', steel: '#B8B8D0',
      fairy: '#EE99AC', normal: '#A8A878'
    };
    return colors[type] || '#A8A878'; // Si el tipo no está en el objeto colors, devolvemos un color por defecto.
  }

  /*
    • fetchPokemon: Función que busca un Pokémon usando la API.
    • setError(''): Limpia cualquier error previo.
    • axios.get: Realiza una solicitud GET para obtener datos del Pokémon ingresado.
    • .then(response => {...}):
    • setPokemon: Almacena los datos obtenidos en el estado pokemon.
    • .catch: Si ocurre un error (p. ej., el Pokémon no existe):
    • setError: Almacena un mensaje de error en el estado.
  */

  return (
    <div className="pokemon-search-container">
      <h1><img src={require('./poke-removebg-preview.png')} alt="PokeDex_Image" className="h1-image" /></h1>
      <input
        type="text"
        placeholder="Nombre o ID"
        value={search}
        onChange={(e) => setSearch(e.target.value)} // Actualiza el estado search con el texto ingresado por el usuario.
      />
      <button onClick={fetchPokemon} disabled={loading}>Buscar</button>
      {loading && <p>Cargando...</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default PokemonSearch;

/*
  • <input>:
    • value={search}: El valor del input está sincronizado con el estado search.
    • onChange: Actualiza el estado search con el texto ingresado por el usuario.
  • <button>:
    • onClick={fetchPokemon}: Llama a la función fetchPokemon cuando se hace clic.
    • error && <p>{error}</p>: Si hay un error, muestra el mensaje de error.
  • pokemon && (...): Si se encuentra un Pokémon, muestra:
    • <h2>: Nombre del Pokémon.
    • <img>: Imagen del Pokémon.
    • <p>: Tipo del Pokémon.
*/
