function fetchPokemon() {
    const pokedexNumber = document.getElementById('pokedexNumber').value;
    const pokemonContainer = document.getElementById('pokemonContainer');
    const errorMessage = document.getElementById('errorMessage');
    
    // Clear previous results or error messages
    pokemonContainer.innerHTML = '';
    errorMessage.innerHTML = '';
    
    if (pokedexNumber === '') {
      errorMessage.textContent = 'Please enter a Pokédex number!';
      return;
    }

    fetch(`https://pokeapi.co/api/v2/pokemon/${pokedexNumber.toLowerCase()}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Pokémon not found');
        }
        return response.json();
      })
      .then(pokemon => {
        const pokemonName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
        const pokemonImage = pokemon.sprites.front_default;

        pokemonContainer.innerHTML = `
          <h2>${pokemonName}</h2>
          <img src="${pokemonImage}" alt="${pokemonName}">
          <p>Height: ${pokemon.height / 10} m</p>
          <p>Weight: ${pokemon.weight / 10} kg</p>
          <p>Type: ${pokemon.types.map(type => type.type.name).join(', ')}</p>
        `;
      })
      .catch(error => {
        errorMessage.textContent = error.message;
      });
  }