export const fetchPokemonData = (pokemonName) => {
    return fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
      .then(response => response.json())
      .then(data => ({
        name: data.name,
        image: data.sprites.front_default,
        types: data.types.map(type => type.type.name),
        stats: data.stats.map(stat => ({
          name: stat.stat.name,
          value: stat.base_stat,
        })),
        damage: data.stats[1].base_stat,
      }))
      .catch(error => {
        console.error('Error al obtener los datos del Pokémon:', error);
        return null;
      });
  };
  
  export const fetchPokemonList = () => {
    return fetch('https://pokeapi.co/api/v2/pokemon?limit=1000')
      .then(response => response.json())
      .then(data => data.results)
      .catch(error => {
        console.error('Error al obtener la lista de Pokémon:', error);
        return [];
      });
  };
  