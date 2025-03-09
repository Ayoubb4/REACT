import React, { useState } from 'react';
import PokemonList from './PokemonList';
import './PokemonSearch.css';

function Battle({ onBack, onBackToPokedex }) {
  // Estados que controlan los Pokémon seleccionados, el estado de la batalla y el log
  const [selectedPokemon1, setSelectedPokemon1] = useState(null);
  const [selectedPokemon2, setSelectedPokemon2] = useState(null);
  const [choosingFor, setChoosingFor] = useState(1); // Indica si se está eligiendo el Pokémon 1 o 2
  const [showConfirmModal, setShowConfirmModal] = useState(false); // Para mostrar el modal de confirmación de selección
  const [showBattleStartModal, setShowBattleStartModal] = useState(false); // Para mostrar el modal de inicio de la batalla
  const [showResultModal, setShowResultModal] = useState(false); // Para mostrar el modal de resultados
  const [battleResult, setBattleResult] = useState(null); // Para guardar el resultado de la batalla
  const [battleLog, setBattleLog] = useState([]); // Log de la batalla

  // Maneja la selección de un Pokémon para la batalla
  function handleSelectPokemon(pokemon) {
    if (choosingFor === 1) {
      setSelectedPokemon1(pokemon); // Selecciona el primer Pokémon
    } else {
      setSelectedPokemon2(pokemon); // Selecciona el segundo Pokémon
    }
    setShowConfirmModal(true); // Muestra el modal de confirmación
  }

  // Confirma la selección y cambia al siguiente Pokémon o inicia la batalla
  function confirmSelection() {
    if (choosingFor === 1) {
      setChoosingFor(2); // Cambia al segundo Pokémon
    } else {
      setShowBattleStartModal(true); // Inicia la batalla
    }
    setShowConfirmModal(false); // Cierra el modal de confirmación
  }

  // Obtiene el movimiento especial o básico de un Pokémon
  function getMove(pokemon) {
    return pokemon.moves && pokemon.moves.length > 0
      ? pokemon.moves.find(move => move.special) || pokemon.moves[0] // Busca un movimiento especial, si no tiene, usa el primero
      : { move: { name: 'Ataque básico' } }; // Si no tiene movimientos, devuelve "Ataque básico"
  }

  // Obtiene la imagen del Pokémon
  function getPokemonImage(pokemon) {
    return pokemon.image || (pokemon.sprites ? pokemon.sprites.front_default : ''); // Devuelve la imagen del Pokémon
  }

  // Calcula el daño de un ataque entre dos Pokémon
  function attack(pokemonAttacker, pokemonDefender) {
    const hpAttacker = pokemonAttacker.stats.find(stat => stat.name === 'hp').value; // HP del atacante
    const attackPower = pokemonAttacker.stats.find(stat => stat.name === 'attack').value; // Poder de ataque del atacante
    const defensePower = pokemonDefender.stats.find(stat => stat.name === 'defense').value; // Poder de defensa del defensor
    const move = getMove(pokemonAttacker).move.name; // Nombre del movimiento

    // Calcula el daño (la fórmula simple)
    const damage = Math.max(attackPower - defensePower, 1); // El daño no puede ser menor que 1
    const remainingHp = Math.max(hpAttacker - damage, 0); // Calcula el HP restante del atacante

    return { damage, remainingHp, move }; // Devuelve el daño, el HP restante y el nombre del movimiento
  }

  // Maneja el combate entre los dos Pokémon
  function handleBattle() {
    if (!selectedPokemon1 || !selectedPokemon2) return; // Si no se han seleccionado los dos Pokémon, no empieza la batalla

    let pokemon1 = selectedPokemon1;
    let pokemon2 = selectedPokemon2;
    let logs = []; // Inicializa el log de batalla
    let turn = 1; // Define el primer turno

    // Pelea alternada hasta que uno de los Pokémon se quede sin HP
    while (pokemon1.stats.find(stat => stat.name === 'hp').value > 0 && pokemon2.stats.find(stat => stat.name === 'hp').value > 0) {
      let attackResult;

      if (turn % 2 !== 0) {
        // Turno del Pokémon 1
        attackResult = attack(pokemon1, pokemon2); // Realiza el ataque
        logs.push(`${pokemon1.name} usó ${attackResult.move}, infligiendo ${attackResult.damage} de daño. HP restante: ${attackResult.remainingHp}`);
        pokemon2 = { ...pokemon2, stats: pokemon2.stats.map(stat => stat.name === 'hp' ? { ...stat, value: stat.value - attackResult.damage } : stat) }; // Actualiza el HP del Pokémon defensor
      } else {
        // Turno del Pokémon 2
        attackResult = attack(pokemon2, pokemon1); // Realiza el ataque
        logs.push(`${pokemon2.name} usó ${attackResult.move}, infligiendo ${attackResult.damage} de daño. HP restante: ${attackResult.remainingHp}`);
        pokemon1 = { ...pokemon1, stats: pokemon1.stats.map(stat => stat.name === 'hp' ? { ...stat, value: stat.value - attackResult.damage } : stat) }; // Actualiza el HP del Pokémon defensor
      }

      turn++; // Cambia el turno
    }

    // Determinamos el ganador
    const winner = pokemon1.stats.find(stat => stat.name === 'hp').value > 0 ? pokemon1 : pokemon2;
    setBattleLog(logs); // Guarda el log de la batalla
    setBattleResult(winner ? { winner } : null); // Establece el resultado de la batalla
    setShowBattleStartModal(false); // Cierra el modal de inicio de la batalla
    setShowResultModal(true); // Muestra el modal con el resultado
  }

  // Resetea la batalla y los estados
  function resetBattle() {
    setSelectedPokemon1(null);
    setSelectedPokemon2(null);
    setChoosingFor(1);
    setBattleResult(null);
    setBattleLog([]); // Resetea el log de batalla
    setShowResultModal(false); // Cierra el modal de resultados
  }

  return (
    <div className="pokemon-list-container">
      <h2>⚔️ Batalla Pokémon</h2>

      {/* Componente para seleccionar los Pokémon */}
      <PokemonList onSelectPokemon={handleSelectPokemon} />

      <div className="selected-pokemon-container">
        {selectedPokemon1 && (
          <div className="pokemon-details">
            <h3>Pokémon 1</h3>
            <p>{selectedPokemon1.name}</p>
            <img src={getPokemonImage(selectedPokemon1)} alt={selectedPokemon1.name} />
            <p>Vida: {selectedPokemon1.stats.find(stat => stat.name === 'hp').value}</p>
            <p>Ataque: {selectedPokemon1.stats.find(stat => stat.name === 'attack').value}</p>
            <p>Defensa: {selectedPokemon1.stats.find(stat => stat.name === 'defense').value}</p>
          </div>
        )}
        {selectedPokemon2 && (
          <div className="pokemon-details">
            <h3>Pokémon 2</h3>
            <p>{selectedPokemon2.name}</p>
            <img src={getPokemonImage(selectedPokemon2)} alt={selectedPokemon2.name} />
            <p>Vida: {selectedPokemon2.stats.find(stat => stat.name === 'hp').value}</p>
            <p>Ataque: {selectedPokemon2.stats.find(stat => stat.name === 'attack').value}</p>
            <p>Defensa: {selectedPokemon2.stats.find(stat => stat.name === 'defense').value}</p>
          </div>
        )}
      </div>

      {/* Modal para confirmar la selección del Pokémon */}
      {showConfirmModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>✅ Confirmar Selección</h3>
            <p>Has seleccionado a <strong>{choosingFor === 1 ? selectedPokemon1.name : selectedPokemon2.name}</strong></p>
            <img 
              src={getPokemonImage(choosingFor === 1 ? selectedPokemon1 : selectedPokemon2)} 
              alt={choosingFor === 1 ? selectedPokemon1.name : selectedPokemon2.name} 
              className="pokemon-image"
            />
            <button onClick={confirmSelection}>Confirmar</button>
          </div>
        </div>
      )}

      {/* Modal para el inicio de la batalla */}
      {showBattleStartModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>🔥 ¡Batalla Lista!</h3>
            <p>{selectedPokemon1.name} 🆚 {selectedPokemon2.name}</p>
            <img src={getPokemonImage(selectedPokemon1)} alt={selectedPokemon1.name} className="pokemon-image" />
            <img src={getPokemonImage(selectedPokemon2)} alt={selectedPokemon2.name} className="pokemon-image" />
            <button onClick={handleBattle}>⚔️ Empezar Batalla</button>
          </div>
        </div>
      )}

      {/* Modal para mostrar el resultado de la batalla */}
      {showResultModal && battleResult && (
        <div className="modal">
          <div className="modal-content">
            <h3>🏆 Resultado</h3>
            {battleResult.winner ? (
              <>
                <p>¡El ganador es <strong>{battleResult.winner.name}</strong>!</p>
                <img src={getPokemonImage(battleResult.winner)} alt={battleResult.winner.name} className="pokemon-image" />
              </>
            ) : (
              <p>🤝 ¡Empate!</p>
            )}
            <button onClick={resetBattle}>🔄 Jugar de nuevo</button>
          </div>
        </div>
      )}

      {/* Log de la Batalla */}
      {battleLog.length > 0 && (
        <div className="battle-log">
          <h4>🔔 Log de la Batalla:</h4>
          <ul>
            {battleLog.map((logEntry, index) => (
              <li key={index}>{logEntry}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Battle;
