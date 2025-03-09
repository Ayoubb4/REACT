// Función que obtiene los datos de un Pokémon específico
export const fetchPokemonData = (pokemonName) => {
  // Realiza una solicitud a la API de Pokémon usando el nombre del Pokémon
  return fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
    .then(response => response.json()) // Convierte la respuesta en formato JSON
    .then(data => ({
      // Extrae los datos necesarios de la respuesta
      name: data.name, // Nombre del Pokémon
      image: data.sprites.front_default, // Imagen del Pokémon (sprite frontal)
      types: data.types.map(type => type.type.name), // Tipos del Pokémon (agua, fuego, etc.)
      stats: data.stats.map(stat => ({
        name: stat.stat.name, // Nombre de la estadística (por ejemplo, "ataque", "defensa")
        value: stat.base_stat, // Valor de la estadística (por ejemplo, el valor de ataque)
      })),
      damage: data.stats[1].base_stat, // Daño (utiliza la segunda estadística que se supone es el ataque)
    }))
    .catch(error => {
      // Si ocurre un error, lo captura y muestra en la consola
      console.error('Error al obtener los datos del Pokémon:', error);
      return null; // Devuelve null si hay un error
    });
};

// Función que obtiene una lista de Pokémon
export const fetchPokemonList = () => {
  // Realiza una solicitud a la API de Pokémon para obtener una lista de Pokémon
  return fetch('https://pokeapi.co/api/v2/pokemon?limit=1000')
    .then(response => response.json()) // Convierte la respuesta en formato JSON
    .then(data => data.results) // Extrae la propiedad 'results' que contiene la lista de Pokémon
    .catch(error => {
      // Si ocurre un error, lo captura y muestra en la consola
      console.error('Error al obtener la lista de Pokémon:', error);
      return []; // Devuelve un arreglo vacío si hay un error
    });
};
