import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PokemonSearch.css';

function PokemonList({ onSelectPokemon }) {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState('');
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const limit = 20; 

  useEffect(() => {
    loadMorePokemons(0);

    axios.get('https://pokeapi.co/api/v2/type')
      .then(response => {
        setTypes(response.data.results.map(t => t.name));
      })
      .catch(() => setTypes([]));
  }, []);

  const loadMorePokemons = (newOffset) => {
    if (!hasMore) return;
    setLoading(true);
    axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${newOffset}`)
      .then(response => {
        const fetches = response.data.results.map(pokemon =>
          axios.get(pokemon.url).then(res => ({
            name: res.data.name,
            image: res.data.sprites?.other["official-artwork"]?.front_default || res.data.sprites?.front_default || 'https://via.placeholder.com/150',
            height: res.data.height,
            weight: res.data.weight,
            types: res.data.types.map(t => t.type.name),
            color: getColor(res.data.types[0]?.type.name),
            stats: res.data.stats.map(s => ({ name: s.stat.name, value: s.base_stat }))
          }))
        );

        Promise.all(fetches).then(newPokemons => {
          setPokemons(prev => [...prev, ...newPokemons]);
          setOffset(newOffset + limit);
          setHasMore(response.data.next !== null);
          setLoading(false);
        });
      })
      .catch(() => {
        setError('Error al obtener los datos.');
        setLoading(false);
      });
  };

  function getColor(type) {
    const colors = {
      fire: '#F08030', water: '#6890F0', grass: '#78C850', electric: '#F8D030',
      ice: '#98D8D8', fighting: '#C03028', poison: '#A040A0', ground: '#E0C068',
      flying: '#A890F0', psychic: '#F85888', bug: '#A8B820', rock: '#B8A038',
      ghost: '#705898', dragon: '#7038F8', dark: '#705848', steel: '#B8B8D0',
      fairy: '#EE99AC', normal: '#A8A878'
    };
    return colors[type] || '#A8A878';
  }

  if (loading && pokemons.length === 0) return <p>Cargando...</p>;
  if (error) return <p className="error-message">{error}</p>;

  const filteredPokemons = selectedType
    ? pokemons.filter(pokemon => pokemon.types.includes(selectedType))
    : pokemons;

  return (
    <div className="pokemon-list-container">
      <h1>Lista de Pokemon</h1>
      <select onChange={(e) => setSelectedType(e.target.value)} value={selectedType} className="filter">
        <option value="">Todos los tipos</option>
        {types.map((type, index) => (
          <option key={index} value={type}>{type}</option>
        ))}
      </select>
      <div className="pokemon-grid">
        {filteredPokemons.map((pokemon, index) => (
          <div 
            key={index} 
            className="pokemon-card" 
            style={{ backgroundColor: pokemon.color }}
            onClick={() => onSelectPokemon(pokemon)}
          >
            <h2>{pokemon.name}</h2>
            <img src={pokemon.image} alt={pokemon.name} onError={(e) => e.target.src = 'https://via.placeholder.com/150'} />
            <p><strong>Tipo:</strong> {pokemon.types.join(', ')}</p>
          </div>
        ))}
      </div>
      {hasMore && !loading && (
        <button className="load-more" onClick={() => loadMorePokemons(offset)}>
          Cargar mas Pokemon
        </button>
      )}
      {loading && <p>Cargando mas Pokemon...</p>}
    </div>
  );
}

export default PokemonList;
