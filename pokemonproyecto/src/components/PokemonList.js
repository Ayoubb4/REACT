// Ejemplo 1: Obtener una lista de Pokémon con useEffect y useState
/*
	•	import React: Importa la librería React para crear componentes.
	•	useState, useEffect: Son hooks de React:
	•	useState maneja el estado dentro del componente.
	•	useEffect permite realizar efectos secundarios, como una solicitud HTTP al montar el componente.
	•	axios: Librería para hacer peticiones HTTP.
*/

import React, { useState, useEffect } from 'react';
import axios from 'axios';

//	•	function PokemonList: Declara un componente funcional llamado PokemonList.
function PokemonList() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

/*
	•	useEffect: Ejecuta una función cuando el componente se monta.
	•	axios.get: Realiza una solicitud HTTP GET para obtener una lista de Pokémon (10 en este caso).
	•	.then(response => {...}): Si la solicitud tiene éxito:
	•	Actualiza el estado pokemons con los datos obtenidos.
	•	Cambia el estado loading a false.
	•	.catch(() => {...}): Si la solicitud falla:
	•	Actualiza el estado error con un mensaje.
	•	Cambia el estado loading a false.
	•	[]: El arreglo vacío indica que el efecto solo se ejecutará una vez (cuando el componente se monte).
*/

  useEffect(() => {
    axios.get('https://pokeapi.co/api/v2/pokemon?limit=10')
      .then(response => {
        setPokemons(response.data.results);
        setLoading(false);
      })
      .catch(() => {
        setError('Error al obtener los datos.');
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;
/*
	•	Si loading es true, muestra un mensaje de “Cargando…”.
	•	Si error no está vacío, muestra el mensaje de error.
*/

  return (
    <div>
      <h1>Lista de Pokémon</h1>
      <ul>
        {pokemons.map((pokemon, index) => (
          <li key={index}>{pokemon.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default PokemonList;

