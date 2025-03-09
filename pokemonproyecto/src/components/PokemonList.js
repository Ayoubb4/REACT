import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PokemonSearch.css';

// Componente para mostrar una lista de Pokémon
function PokemonList({ onSelectPokemon }) {
  // Estados para manejar la información de los Pokémon y su estado de carga
  const [pokemons, setPokemons] = useState([]); // Pokémon que se mostrarán
  const [allPokemons, setAllPokemons] = useState([]); // Guardamos todos los Pokémon originales aquí
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(''); // Mensaje de error si algo falla
  const [types, setTypes] = useState([]); // Tipos de Pokémon disponibles para el filtro
  const [selectedType, setSelectedType] = useState(''); // Tipo de Pokémon seleccionado para filtrar
  const [offset, setOffset] = useState(0); // Desplazamiento para la paginación de los Pokémon
  const limit = 20; // Número máximo de Pokémon por carga

  // useEffect se ejecuta cuando el componente se monta y obtiene los tipos de Pokémon
  useEffect(() => {
    loadPokemons(); // Cargar los primeros Pokémon
    axios.get('https://pokeapi.co/api/v2/type')
      .then(response => {
        setTypes(response.data.results.map(t => t.name)); // Establecer los tipos de Pokémon
      })
      .catch(() => setTypes([])); // Manejo de error si no se pueden cargar los tipos
  }, []);

  // Función para cargar los Pokémon sin ningún filtro
  const loadPokemons = () => {
    setLoading(true); // Comenzamos a cargar
    setError(''); // Limpiamos cualquier error anterior
    axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
      .then(response => {
        // Obtenemos más detalles de cada Pokémon (incluyendo imagen, estadísticas, etc.)
        const fetches = response.data.results.map(pokemon =>
          axios.get(pokemon.url).then(res => ({
            name: res.data.name,
            image: res.data.sprites?.other["official-artwork"]?.front_default || res.data.sprites?.front_default || 'https://via.placeholder.com/150',
            height: res.data.height,
            weight: res.data.weight,
            types: res.data.types.map(t => t.type.name),
            color: getColor(res.data.types[0]?.type.name), // Obtenemos el color del tipo
            stats: res.data.stats.map(s => ({ name: s.stat.name, value: s.base_stat })) // Estadísticas del Pokémon
          }))
        );

        // Una vez que todos los Pokémon han sido obtenidos, los almacenamos
        Promise.all(fetches).then(allFetchedPokemons => {
          const allPokemonsList = [...pokemons, ...allFetchedPokemons]; // Concatenamos los Pokémon obtenidos
          setPokemons(allPokemonsList); // Establecemos los Pokémon actuales
          setAllPokemons(allPokemonsList); // Guardamos los Pokémon originales para reiniciar el filtro
          setLoading(false); // Terminamos la carga
          setOffset(prevOffset => prevOffset + limit); // Actualizamos el offset para la siguiente carga
        });
      })
      .catch(() => {
        setError('Error al obtener los datos.'); // Si hay error en la carga
        setLoading(false); // Terminamos la carga con error
      });
  };

  // Función para filtrar los Pokémon por tipo
  const filterPokemonsByType = (type) => {
    setSelectedType(type); // Establecemos el tipo seleccionado
    setLoading(true); // Iniciamos el proceso de carga

    // Llamada a la API para obtener los Pokémon de un tipo específico
    axios.get(`https://pokeapi.co/api/v2/type/${type}`)
      .then(response => {
        const fetches = response.data.pokemon.map(pokemon =>
          axios.get(pokemon.pokemon.url).then(res => ({
            name: res.data.name,
            image: res.data.sprites?.other["official-artwork"]?.front_default || res.data.sprites?.front_default || 'https://via.placeholder.com/150',
            height: res.data.height,
            weight: res.data.weight,
            types: res.data.types.map(t => t.type.name),
            color: getColor(res.data.types[0]?.type.name), // Obtenemos el color del tipo
            stats: res.data.stats.map(s => ({ name: s.stat.name, value: s.base_stat }))
          }))
        );

        // Una vez que todos los Pokémon del tipo seleccionado son obtenidos
        Promise.all(fetches).then(filteredPokemons => {
          setPokemons(filteredPokemons); // Actualizamos la lista con los Pokémon filtrados
          setLoading(false); // Terminamos la carga
        });
      })
      .catch(() => {
        setError('Error al obtener los Pokémon del tipo seleccionado.'); // Si hay error en la carga por tipo
        setLoading(false); // Terminamos la carga con error
      });
  };

  // Función para volver a cargar todos los Pokémon originales
  const handleBackToStart = () => {
    setSelectedType(''); // Reseteamos el tipo seleccionado
    setPokemons(allPokemons); // Volvemos a la lista original de Pokémon
  };

  // Función para obtener el color correspondiente a cada tipo de Pokémon
  function getColor(type) {
    const colors = {
      fire: '#F08030', water: '#6890F0', grass: '#78C850', electric: '#F8D030',
      ice: '#98D8D8', fighting: '#C03028', poison: '#A040A0', ground: '#E0C068',
      flying: '#A890F0', psychic: '#F85888', bug: '#A8B820', rock: '#B8A038',
      ghost: '#705898', dragon: '#7038F8', dark: '#705848', steel: '#B8B8D0',
      fairy: '#EE99AC', normal: '#A8A878'
    };
    return colors[type] || '#A8A878'; // Si no tiene color, devuelve un color por defecto
  }

  // Si los Pokémon están cargando y no hay ninguno aún, mostramos un mensaje
  if (loading && pokemons.length === 0) return <p>Cargando...</p>;

  // Si ocurre un error, mostramos el mensaje de error
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="pokemon-list-container">
      <h1>Lista de Pokémon</h1>

      {/* Filtro por tipo de Pokémon */}
      <select onChange={(e) => filterPokemonsByType(e.target.value)} value={selectedType} className="filter">
        <option value="">Todos los tipos</option>
        {types.map((type, index) => (
          <option key={index} value={type}>{type}</option>
        ))}
      </select>

      {/* Mostramos la lista de Pokémon en formato grid */}
      <div className="pokemon-grid">
        {pokemons.map((pokemon, index) => (
          <div 
            key={index} 
            className="pokemon-card" 
            style={{ backgroundColor: pokemon.color }} // Fondo de la tarjeta según el color del tipo
            onClick={() => onSelectPokemon(pokemon)} // Al hacer clic, seleccionamos el Pokémon
          >
            <h2>{pokemon.name}</h2>
            <img src={pokemon.image} alt={pokemon.name} onError={(e) => e.target.src = 'https://via.placeholder.com/150'} />
            <p><strong>Tipo:</strong> {pokemon.types.join(', ')}</p>
          </div>
        ))}
      </div>

      {/* Botón para cargar más Pokémon o volver al inicio si estamos filtrando por tipo */}
      {selectedType ? (
        <button className="load-more" onClick={handleBackToStart}>
          Volver al inicio
        </button>
      ) : (
        <button className="load-more" onClick={loadPokemons}>
          Cargar más Pokémon
        </button>
      )}
    </div>
  );
}

export default PokemonList;
