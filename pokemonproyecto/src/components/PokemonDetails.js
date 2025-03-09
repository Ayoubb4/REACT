import React from 'react';
import './PokemonSearch.css';

// Componente para mostrar los detalles de un Pokémon.
function PokemonDetails({ pokemon, onClose }) {
  // Si no hay un Pokémon seleccionado, no renderiza nada.
  if (!pokemon) return null;

  return (
    <div className="modal">
      <div className="modal-content small-details">
        {/* Botón para cerrar el modal */}
        <button className="close-button" onClick={onClose}>X</button>
        {/* Nombre del Pokémon */}
        <h2>{pokemon.name}</h2>
        <div className="image-container">
          {/* Imagen del Pokémon */}
          <img src={pokemon.image} alt={pokemon.name} className="small-image" />
        </div>
        {/* Detalles del Pokémon como altura y peso */}
        <p><strong>Altura:</strong> {pokemon.height}</p>
        <p><strong>Peso:</strong> {pokemon.weight}</p>
        <p><strong>Tipo:</strong> {pokemon.types.join(', ')}</p>
        <h3>Estadísticas</h3>
        <ul>
          {/* Iteramos sobre las estadísticas del Pokémon y las mostramos */}
          {pokemon.stats.map((stat, index) => (
            <li key={index}><strong>{stat.name}:</strong> {stat.value}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default PokemonDetails;
