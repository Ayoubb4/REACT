import axios from "axios";
import React, { useState, useEffect } from "react";

function Ejercicio17() {
    const [pokemon1, setPokemon1] = useState('');
    const [pokemon2, setPokemon2] = useState('');
    const [pokemon1Stats, setPokemon1Stats] = useState(null);
    const [pokemon2Stats, setPokemon2Stats] = useState(null);
    const [error, setError] = useState(null);

    // Obtener las estadísticas del primer Pokémon
    useEffect(function () {
        if (pokemon1) {
            axios
                .get(`https://pokeapi.co/api/v2/pokemon/${pokemon1.toLowerCase()}`)
                .then(function (respuesta) {
                    setPokemon1Stats(respuesta.data.stats);
                })
                .catch(function (err) {
                    setError(`Error al obtener los datos de ${pokemon1}: ${err.message}`);
                });
        }
    }, [pokemon1]);

    // Obtener las estadísticas del segundo Pokémon
    useEffect(function () {
        if (pokemon2) {
            axios
                .get(`https://pokeapi.co/api/v2/pokemon/${pokemon2.toLowerCase()}`)
                .then(function (respuesta) {
                    setPokemon2Stats(respuesta.data.stats);
                })
                .catch(function (err) {
                    setError(`Error al obtener los datos de ${pokemon2}: ${err.message}`);
                });
        }
    }, [pokemon2]);

    return (
        <div>
            <h1>Comparador Pokémon</h1>

            <input
                type="text"
                placeholder="1º Pokémon"
                value={pokemon1}
                onChange={function (entrada) { setPokemon1(entrada.target.value); }}
            />
            <input
                type="text"
                placeholder="2º Pokémon"
                value={pokemon2}
                onChange={function (entrada) { setPokemon2(entrada.target.value); }}
            />

            <h2>Stats</h2>

            {error && <p>{error}</p>}

            {pokemon1Stats && (
                <div>
                    <h3>{pokemon1}</h3>
                    <ul>
                        {pokemon1Stats.map(function (estado) {
                            return (
                                <li key={estado.stat.name}>
                                    {estado.stat.name}: {estado.base_stat}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            )}

            {pokemon2Stats && (
                <div>
                    <h3>{pokemon2}</h3>
                    <ul>
                        {pokemon2Stats.map(function (estado) {
                            return (
                                <li key={estado.stat.name}>
                                    {estado.stat.name}: {estado.base_stat}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default Ejercicio17;
