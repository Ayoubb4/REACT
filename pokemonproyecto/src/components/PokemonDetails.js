import React from 'react';
import './PokemonSearch.css';

function PokemonDetails({ pokemon, onClose }) {
  if (!pokemon) return null;

  return (
    <div className="modal">
      <div className="modal-content small-details">
        <button className="close-button" onClick={onClose}>X</button>
        <h2>{pokemon.name}</h2>
        <div className="image-container">
          <img src={pokemon.image} alt={pokemon.name} className="small-image" />
        </div>
        <p><strong>Altura:</strong> {pokemon.height}</p>
        <p><strong>Peso:</strong> {pokemon.weight}</p>
        <p><strong>Tipo:</strong> {pokemon.types.join(', ')}</p>
        <h3>Estadísticas</h3>
        <ul>
          {pokemon.stats.map((stat, index) => (
            <li key={index}><strong>{stat.name}:</strong> {stat.value}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default PokemonDetails;
