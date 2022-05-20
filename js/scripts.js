// IIFE to wrap array

let pokemonRespository = (function () {
  let pokemonList = [];
  let apiURL = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  
  // fetch creates a promise to load the data
  // after this promise is resolved, the data is part of the response object
  // response.json method returns a promise that parses body of response into JSON
  // once that is resolved, we acces the results array inside the json
  // we iterate over that array and create a pokemon object
  // then we call the add function to add that into our pokemon list
  function loadList() {
    return fetch(apiURL).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsURL: item.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }

  // method to add a pokemon to pokemonList
  // check if keys are correct
  function add(pokemon) {
    if (
      typeof pokemon === 'object' &&
      "name" in pokemon 
      ) {
      return pokemonList.push(pokemon);
    }
  }

  // method to return arrary pokemonList
  function getAll() {
    return pokemonList;
  }

  // method to add a pokemon as a list item
  // create the listItem, create the cutton
  // fill the button with the parameter name
  // append button to list item
  // append listitem to pokemon list
  function addListItem(pokemon) {
    let pokemonList = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let button =  document.createElement('button');
  
    button.innerHTML = ''+pokemon.name;
    button.classList.add('buttonStyle');
    button.addEventListener('click', function() {
      showDetails(pokemon);
    });
  
    listItem.appendChild(button);
  
    pokemonList.appendChild(listItem);
  }

  // on click showDetails is activated
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon);
      console.log(pokemon);
    });
  }

  // showDetails calls loadDetails on click and passes the pokemon
  // showDetails adds to pokemon object
  function loadDetails(pokemon) {
    let url = pokemon.detailsURL;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      pokemon.imageURL = details.sprites.front_default;
      pokemon.height = details.height;
      pokemon.types = details.types;
    }).catch(function (e) {
      console.log(e);
    });
  }

  // 
  function showModal(pokemon) {
    let modalContainer = document.querySelector('#modal-container');
    modalContainer.classList.add('is-visible');

    // clear existing modal content
    modalContainer.innerHTML = '';

    let modal = document.createElement('div');
    modal.classList.add('modal');

    let closeButton = document.createElement('button');
    closeButton.classList.add('modal-close');
    closeButton.innerHTML = 'Close';

    console.log(pokemon.height);

    let pokemonHeight = document.createElement('div');
    pokemonHeight.innerText = pokemon.height;

    modal.appendChild(pokemonHeight);
    modal.appendChild(closeButton);
    modalContainer.appendChild(modal);

    modalContainer.classList.add('is-visible');
  }



  // method to filter pokemon out of pokemonList with matching name
  function filterPokemon(pokemonName) {
    return pokemonList.filter(pokemon => pokemon.name === pokemonName);
  }

  return {
    getAll: getAll,
    add: add,
    filterPokemon: filterPokemon,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails
  };

})();

pokemonRespository.loadList().then(function() {
  // Now the data is loaded!
  pokemonRespository.getAll().forEach(function(pokemon){
    pokemonRespository.addListItem(pokemon);
  });
});







