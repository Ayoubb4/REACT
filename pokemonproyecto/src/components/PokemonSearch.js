// Ejemplo 2: Buscar un Pokémon específico
import React, { useState } from 'react';
import axios from 'axios';

function PokemonSearch() {
  const [search, setSearch] = useState('');
  const [pokemon, setPokemon] = useState(null);
  const [error, setError] = useState('');
/*
	•	search: Almacena el valor ingresado por el usuario en el campo de búsqueda.
	•	setSearch: Función para actualizar el estado search.
	•	pokemon: Estado que almacena los datos del Pokémon encontrado.
	•	setPokemon: Función para actualizar el estado pokemon.
	•	error: Almacena un mensaje de error si no se encuentra el Pokémon.
	•	setError: Función para actualizar el estado error.
*/

  function fetchPokemon() {
    setError('');
    axios.get(`https://pokeapi.co/api/v2/pokemon?limit=10/${search.toLowerCase()}`)
      .then(response => {
        setPokemon({
          name: response.data.name,
          image: response.data.sprites.front_default,
          type: response.data.types.map(t => t.type.name).join(', ')
        });
      })
      .catch(() => setError('Pokémon no encontrado.'));
  }

  /*
  	•	fetchPokemon: Función que busca un Pokémon usando la API.
	•	setError(''): Limpia cualquier error previo.
	•	axios.get: Realiza una solicitud GET para obtener datos del Pokémon ingresado.
	•	.then(response => {...}):
	•	setPokemon: Almacena los datos obtenidos en el estado pokemon.
	•	.catch: Si ocurre un error (p. ej., el Pokémon no existe):
	•	setError: Almacena un mensaje de error en el estado.
  */

  return (
    <div>
      <h1>Buscar Pokémon</h1>
      <input
        type="text"
        placeholder="Nombre o ID"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button onClick={fetchPokemon}>Buscar</button>

      {error && <p>{error}</p>}
      {pokemon && (
        <div>
          <h2>{pokemon.name}</h2>
          <img src={pokemon.image} alt={pokemon.name} />
          <p>Tipo: {pokemon.type}</p>
        </div>
      )}
    </div>
  );
}
/*
	•	<input>:
	•	value={search}: El valor del input está sincronizado con el estado search.
	•	onChange: Actualiza el estado search con el texto ingresado por el usuario.
	•	<button>:
	•	onClick={fetchPokemon}: Llama a la función fetchPokemon cuando se hace clic.
    	•	error && <p>{error}</p>: Si hay un error, muestra el mensaje de error.
	•	pokemon && (...): Si se encuentra un Pokémon, muestra:
	•	<h2>: Nombre del Pokémon.
	•	<img>: Imagen del Pokémon.
	•	<p>: Tipo del Pokémon.
*/

export default PokemonSearch;


