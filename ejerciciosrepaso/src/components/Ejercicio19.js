
import React, { useState } from "react";

import axios from "axios";

function Pokemon() {

    const [pokemon, setPokemon] = useState("")
    const [datos, setDatos] = useState(null)
    const [error, setError] = useState(null)

    const buscar = () => {

        axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`)
            .then((response) => {

                setDatos(response.data)
                setError(null)
            })
            .catch((error) => {

                setDatos(null)
                setError("No se pudo encontrar nada")
            })
    }

    let contenido;

    if (error) {
        contenido = (<p>Error, no se encontro un pokemon</p>)
    } else if (datos) {
        contenido = (
            <div>
                <h3>Nombre:{datos.name}</h3>
                <img src={datos.sprites.front_default}></img>
            </div>
        )

    } else {

        contenido = (<p>Introduce un pokemon</p>)
    }

    return (

        <div>
            <h1>Pokeapi</h1>
            <input type="text" id="pokemon" name="pokemon" placeholder="Introduce un pokemon..." value={pokemon} onChange={(e) => setPokemon(e.target.value)}></input>

            <button onClick={buscar}>Buscar</button>


            {contenido}
        </div>



    )

}

export default Pokemon;