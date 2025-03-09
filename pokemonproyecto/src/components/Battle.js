import React, { useState } from 'react';
import PokemonList from './PokemonList';
import './PokemonSearch.css';

function Battle({ onBack, onBackToPokedex }) {
  const [selectedPokemon1, setSelectedPokemon1] = useState(null);
  const [selectedPokemon2, setSelectedPokemon2] = useState(null);
  const [choosingFor, setChoosingFor] = useState(1);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showBattleStartModal, setShowBattleStartModal] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);
  const [battleResult, setBattleResult] = useState(null);
  const [battleLog, setBattleLog] = useState([]); // Log de batalla

  function handleSelectPokemon(pokemon) {
    if (choosingFor === 1) {
      setSelectedPokemon1(pokemon);
    } else {
      setSelectedPokemon2(pokemon);
    }
    setShowConfirmModal(true);
  }

  function confirmSelection() {
    if (choosingFor === 1) {
      setChoosingFor(2);
    } else {
      setShowBattleStartModal(true);
    }
    setShowConfirmModal(false);
  }

  function getMove(pokemon) {
    return pokemon.moves && pokemon.moves.length > 0
      ? pokemon.moves.find(move => move.special) || pokemon.moves[0]
      : { move: { name: 'Ataque básico' } };
  }

  function getPokemonImage(pokemon) {
    return pokemon.image || (pokemon.sprites ? pokemon.sprites.front_default : '');
  }

  function attack(pokemonAttacker, pokemonDefender) {
    const hpAttacker = pokemonAttacker.stats.find(stat => stat.name === 'hp').value;
    const attackPower = pokemonAttacker.stats.find(stat => stat.name === 'attack').value;
    const defensePower = pokemonDefender.stats.find(stat => stat.name === 'defense').value;
    const move = getMove(pokemonAttacker).move.name;
    
    const damage = Math.max(attackPower - defensePower, 1);
    const remainingHp = Math.max(hpAttacker - damage, 0);

    return { damage, remainingHp, move };
  }

  function handleBattle() {
    if (!selectedPokemon1 || !selectedPokemon2) return;

    let pokemon1 = selectedPokemon1;
    let pokemon2 = selectedPokemon2;
    let logs = [];
    let turn = 1;

    // Pelea alternada hasta que uno de los Pokémon se quede sin HP
    while (pokemon1.stats.find(stat => stat.name === 'hp').value > 0 && pokemon2.stats.find(stat => stat.name === 'hp').value > 0) {
      let attackResult;

      if (turn % 2 !== 0) {
        // Turno del Pokémon 1
        attackResult = attack(pokemon1, pokemon2);
        logs.push(`${pokemon1.name} usó ${attackResult.move}, infligiendo ${attackResult.damage} de daño. HP restante: ${attackResult.remainingHp}`);
        pokemon2 = { ...pokemon2, stats: pokemon2.stats.map(stat => stat.name === 'hp' ? { ...stat, value: stat.value - attackResult.damage } : stat) };
      } else {
        // Turno del Pokémon 2
        attackResult = attack(pokemon2, pokemon1);
        logs.push(`${pokemon2.name} usó ${attackResult.move}, infligiendo ${attackResult.damage} de daño. HP restante: ${attackResult.remainingHp}`);
        pokemon1 = { ...pokemon1, stats: pokemon1.stats.map(stat => stat.name === 'hp' ? { ...stat, value: stat.value - attackResult.damage } : stat) };
      }

      turn++; // Cambiar el turno de los Pokémon
    }

    // Determinamos el ganador
    const winner = pokemon1.stats.find(stat => stat.name === 'hp').value > 0 ? pokemon1 : pokemon2;
    setBattleLog(logs); // Guardamos el log de batalla
    setBattleResult(winner ? { winner } : null);
    setShowBattleStartModal(false);
    setShowResultModal(true);
  }

  function resetBattle() {
    setSelectedPokemon1(null);
    setSelectedPokemon2(null);
    setChoosingFor(1);
    setBattleResult(null);
    setBattleLog([]); // Reseteamos el log de batalla
    setShowResultModal(false);
  }

  return (
    <div className="pokemon-list-container">
      <h2>⚔️ Batalla Pokémon</h2>

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

      {/* Log de Batalla */}
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

      <button className="close-button" onClick={onBack}>⬅ Volver</button>
      <button className="pokedex-button" onClick={onBackToPokedex}>📖 Volver a la Pokédex</button>
    </div>
  );
}

export default Battle;
