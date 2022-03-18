// create IIFE with PokemonList and methods to avoid polluting global namespace
let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  // fetch data from API
  async function loadList() {
    try {
      const response = await fetch(apiUrl);
      const json = await response.json();
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url,
        };
        add(pokemon);
      });
    } catch (e) {
      console.error(e);
    }
  }

  function getAll() {
    return pokemonList;
  }

  function add(item) {
    pokemonList.push(item);
  }

  function addListItem(pokemon) {
    let listOfPokemon = document.getElementById("pokemon-list");
    let pokemonCard = document.createElement("button");

    pokemonCard.classList.add("pokemon-card");

    // capitalize first letter of pokemon name
    pokemonCard.innerText = `${pokemon.name[0].toUpperCase()}${pokemon.name
      .slice(1)
      .toLowerCase()}`;

    pokemonCard.addEventListener("click", function () {
      showDetails(pokemon);
    });

    listOfPokemon.appendChild(pokemonCard);
  }

  async function loadDetails(item) {
    let url = item.detailsUrl;
    try {
      const response = await fetch(url);
      const details = await response.json();
      // Now we add the details to the item
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    } catch (e) {
      console.error(e);
    }
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      console.log(pokemon);
    });
  }

  return {
    loadList: loadList,
    getAll: getAll,
    add: add,
    loadDetails: loadDetails,
    addListItem: addListItem,
  };
})();

// Iterate over pokemonList and print out the name & height of each pokemon
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
