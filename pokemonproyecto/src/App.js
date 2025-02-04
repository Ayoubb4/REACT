import React, { useState } from 'react';
import PokemonList from './components/PokemonList';
import PokemonSearch from './components/PokemonSearch';
import './App.css';

function App() {
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  return (
    <div className="app-container">
      <PokemonSearch onSelectPokemon={setSelectedPokemon} />
      <PokemonList onSelectPokemon={setSelectedPokemon} />

      {selectedPokemon && (
        <div className="modal-overlay" onClick={() => setSelectedPokemon(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={() => setSelectedPokemon(null)}>X</button>
            <h2>{selectedPokemon.name}</h2>
            <img src={selectedPokemon.image} alt={selectedPokemon.name} />
            <p><strong>Altura:</strong> {selectedPokemon.height / 10} m</p>
            <p><strong>Peso:</strong> {selectedPokemon.weight / 10} kg</p>
            <p><strong>Tipo:</strong> {selectedPokemon.types.join(', ')}</p>
            <h3>Estadísticas</h3>
            <ul>
              {selectedPokemon.stats.map((stat, index) => (
                <li key={index}><strong>{stat.name}:</strong> {stat.value}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
