import React, { useState, useEffect } from 'react';
import PokemonList from './components/PokemonList';
import PokemonSearch from './components/PokemonSearch';
import Battle from './components/Battle'; // Importamos el componente de batalla
import './App.css';

function App() {
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [showBattleScreen, setShowBattleScreen] = useState(false); // Estado para mostrar la pantalla de batalla

  useEffect(() => {
    // Detecta el scroll para mostrar u ocultar el botón de subir
    const handleScroll = () => {
      if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Función para desplazar al principio de la página
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app-container">
      {!showBattleScreen ? (
        <>
          <PokemonSearch onSelectPokemon={setSelectedPokemon} />
          <PokemonList onSelectPokemon={setSelectedPokemon} />

          {/* Botón para iniciar la batalla */}
          <button className="battle-button" onClick={() => setShowBattleScreen(true)}>
            Ir a Batalla
          </button>


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

          {/* Botón de "Subir" */}
          {isVisible && (
            <button className="scroll-to-top" onClick={scrollToTop}>↑</button>
          )}
        </>
      ) : (
        <>
          <Battle />
          <button className="battle-back-button" onClick={() => setShowBattleScreen(false)}>
            Volver a la Pokédex
          </button>
        </>
      )}
    </div>
  );
}

export default App;
