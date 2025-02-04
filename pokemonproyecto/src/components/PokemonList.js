import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PokemonSearch.css';

//	•	function PokemonList: Declara un componente funcional llamado PokemonList.
function PokemonList({ onSelectPokemon }) {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState('');

  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const limit = 50; // Número de Pokémon a cargar por tanda

  /*
    •	useEffect: Ejecuta una función cuando el componente se monta.
    •	axios.get: Realiza una solicitud HTTP GET para obtener una lista de Pokémon.
    •	[]. El arreglo vacío indica que el efecto solo se ejecutará una vez (cuando el componente se monte).
  */

  useEffect(() => {
    // Función para cargar más Pokémon en bloques de 50
    const loadMorePokemons = () => {
      if (!hasMore) return;
    
      axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
        .then(response => {
          const fetches = response.data.results.map(pokemon => 
            axios.get(pokemon.url).then(res => ({
              name: res.data.name,
              image: res.data.sprites.front_default,
              height: res.data.height,
              weight: res.data.weight,
              types: res.data.types.map(t => t.type.name),
              color: getColor(res.data.types[0].type.name),
              stats: res.data.stats.map(s => ({ name: s.stat.name, value: s.base_stat }))
            }))
          );

          Promise.all(fetches).then(newPokemons => {
            setPokemons(prev => [...prev, ...newPokemons]); // Agrega nuevos Pokémon a la lista
            setOffset(prev => prev + limit); // Aumenta el offset para la siguiente carga
            setHasMore(response.data.next !== null); // Si no hay más Pokémon, deshabilita la carga
            setLoading(false);
          });
        })
        .catch(() => setError('Error al obtener los datos.'));
    };  

    loadMorePokemons(); // Llamar a la función al montar el componente

    // Obtener lista de tipos de Pokémon
    axios.get('https://pokeapi.co/api/v2/type')
      .then(response => {
        setTypes(response.data.results.map(t => t.name));
      })
      .catch(() => {
        setTypes([]);
      });

  }, []);

  

  /*
    •	Si loading es true, muestra un mensaje de “Cargando…”.
    •	Si error no está vacío, muestra el mensaje de error.
  */

  // Función para asignar colores según el tipo
  function getColor(type) {
    const colors = {
      fire: '#F08030', water: '#6890F0', grass: '#78C850', electric: '#F8D030',
      ice: '#98D8D8', fighting: '#C03028', poison: '#A040A0', ground: '#E0C068',
      flying: '#A890F0', psychic: '#F85888', bug: '#A8B820', rock: '#B8A038',
      ghost: '#705898', dragon: '#7038F8', dark: '#705848', steel: '#B8B8D0',
      fairy: '#EE99AC', normal: '#A8A878'
    };
    return colors[type] || '#A8A878'; // Color por defecto si no se encuentra
  }

  if (loading) return <p>Cargando...</p>;
  if (error) return <p className="error-message">{error}</p>;

  // Filtrar Pokémon por tipo seleccionado
  const filteredPokemons = selectedType
    ? pokemons.filter(pokemon => pokemon.types.includes(selectedType))
    : pokemons;

  return (
    <div className="pokemon-list-container">
      <h1>Lista de Pokémon</h1>

      {/* Selector de tipo */}
      <select onChange={(e) => setSelectedType(e.target.value)} value={selectedType} className="filter">
        <option value="">Todos los tipos</option>
        {types.map((type, index) => (
          <option key={index} value={type}>{type}</option>
        ))}
      </select>

      {/* Grid de Pokémon */}
      <div className="pokemon-grid">
        {filteredPokemons.map((pokemon, index) => (
          <div 
            key={index} 
            className="pokemon-card" 
            style={{ backgroundColor: pokemon.color }}
            onClick={() => onSelectPokemon(pokemon)}
          >
            <h2>{pokemon.name}</h2>
            <img src={pokemon.image} alt={pokemon.name} />
            <p><strong>Tipo:</strong> {pokemon.types.join(', ')}</p>
          </div>
        ))}
      </div>

      {/* Botón para cargar más Pokémon */}
      {hasMore && (
        <button className="load-more" onClick={() => setOffset(prev => prev + limit)}>
          Cargar más Pokémon
        </button>
      )}
    </div>
  );
}

export default PokemonList;
