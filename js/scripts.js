// create IIFE with PokemonList and methods to avoid polluting global namespace
let pokemonRepository = (function () {
    let pokemonList = [
        { name: "Scyther", types: [ "Bug", "Flying" ], height: 5, hp: 45, attack: 49, defense: 49 },
        { name: "Jigglypuff", types: [ "Fairy", "Normal" ], height: 3, hp: 60, attack: 62, defense: 63 },
        { name: "Dragonite", types: [ "Dragon", "Flying" ], height: 6, hp: 80, attack: 82, defense: 83 },
        { name: "Charizard", types: [ "Fire", "Flying" ], height: 7, hp: 78, attack: 84, defense: 78 },
    ];

    function getAll() {
        return pokemonList;
    }

    function add(item) {
        pokemonList.push(item);
    }

    return {
        getAll: getAll,
        add: add
    };

})();

// Iterate over pokemonList and print out the name & height of each pokemon
pokemonRepository.getAll().forEach(function(pokemon) {
    if (pokemon.height > 6) {
        document.write(`<p>${pokemon.name} (height: ${pokemon.height}) - Wow, that's a tallll Pokemon.</p>`);
    } else {
        document.write(`<p>${pokemon.name} (height: ${pokemon.height})</p>`);
    }
});
