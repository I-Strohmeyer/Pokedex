let pokemonList = [
    { name: "Scyther", types: [ "Bug", "Flying" ], height: 5, hp: 45, attack: 49, defense: 49 },
    { name: "Jigglypuff", types: [ "Fairy", "Normal" ], height: 3, hp: 60, attack: 62, defense: 63 },
    { name: "Dragonite", types: [ "Dragon", "Flying" ], height: 6, hp: 80, attack: 82, defense: 83 },
    { name: "Charizard", types: [ "Fire", "Flying" ], height: 7, hp: 78, attack: 84, defense: 78 },
];

// iterate over pokemonList and print out the name & height of each pokemon
for (let i = 0; i < pokemonList.length; i++) {
    if (pokemonList[i].height > 6) {
        document.write(`<p>${pokemonList[i].name} (height: ${pokemonList[i].height}) - Wow, that's a tall Pokemon.</p>`);
    } else {
        document.write(`<p>${pokemonList[i].name} (height: ${pokemonList[i].height})</p>`);
    }

}