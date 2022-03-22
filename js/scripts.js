//media query via javascript
const mediaQuerySmall = window.matchMedia("(min-width: 1000px)");

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
    let isMobile;

    pokemonCard.classList.add("pokemon-card");

    // capitalize first letter of pokemon name
    pokemonCard.innerText = `${pokemon.name[0].toUpperCase()}${pokemon.name
      .slice(1)
      .toLowerCase()}`;

    handleMediaChange(mediaQuerySmall);

    function handleMediaChange(e) {
      // Check if the media query is being matched (min-width: 1000px)
      if (e.matches) {
        isMobile = false;
      } else {
        isMobile = true;
      }
    }

    mediaQuerySmall.addEventListener("change", handleMediaChange);

    listOfPokemon.appendChild(pokemonCard);

    pokemonCard.addEventListener("click", function () {
      if (isMobile) {
        // if mobile, show modal
        showModal(pokemon);
      } else {
        // if desktop, show details
        showDetails(pokemon);
      }
    });
  }

  // Generate details to consume
  async function loadDetails(item) {
    let url = item.detailsUrl;
    try {
      const response = await fetch(url);
      const details = await response.json();
      // add details to the item
      item.imageUrl = details.sprites.other.dream_world.front_default;
      item.height = details.height;
      item.types = details.types;
    } catch (e) {
      console.error(e);
    }
  }

  // Show detail page on right side on bigger screens
  function showDetails(pokemon) {
    let title = document.getElementById("detail-title");
    let img = document.getElementById("detail-img");
    let height = document.getElementById("detail-height");

    loadDetails(pokemon).then(function () {
      //console.log(pokemon);
      console.log("normal stuff");
      title.innerText = `${pokemon.name[0].toUpperCase()}${pokemon.name
        .slice(1)
        .toLowerCase()}`;

      height.innerText = `Height: ${pokemon.height}`;
      img.style.display = "block";
      img.src = pokemon.imageUrl;
      img.alt = `Image of ${pokemon.name}`;
    });
  }

  // Modal for smaller screens if pokemon is clicked
  function showModal(pokemon) {
    // Closes modal if close button is clicked
    let close = document.getElementById("close");
    let modal = document.getElementById("modal");
    let title = document.getElementById("modal-title");
    let height = document.getElementById("modal-height");
    let img = document.getElementById("modal-img");

    modal.style.display = "block";

    loadDetails(pokemon).then(function () {
      console.log(pokemon);
      console.log("Modal stuff");
      height.innerText = `Height: ${pokemon.height}`;
      img.src = pokemon.imageUrl;
      img.alt = `Image of ${pokemon.name}`;
      title.innerText = `${pokemon.name[0].toUpperCase()}${pokemon.name
        .slice(1)
        .toLowerCase()}`;
    });

    close.addEventListener("click", function () {
      modal.style.display = "none";
    });

    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    };

    window.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && modal.style.display === "block") {
        modal.style.display = "none";
      }
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

//When a pokemon card is clicked show the details page
//or
//When a mobile pokemon card is clicked show the modal

//-----------------------------------------------------

/*   
Define mediaQuerySmall
define isMobile

Add pokemon cards to the page
  Add event listener to each pokemon card
    When a pokemon card is clicked show the details of that pokemon
    - if(isMobile) showModal();
    - else showDetails();

  showDetails function:
    - etc
    
  showModal function:
    - etc

When the screen size changes
  Change the function that is called (set isMobile to true or false)
  If the breakpoint has changed, close current details & open other type

*/
