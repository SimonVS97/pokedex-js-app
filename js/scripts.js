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
    listItem.classList.add('list-group-item');
    let button =  document.createElement('button');
  
    button.innerHTML = ''+pokemon.name;
    button.classList.add('btn');
    button.classList.add('btn-primary');
    button.setAttribute('data-bs-toggle','modal');
    button.setAttribute('data-bs-target','exampleModal');

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

  let modalContainer = document.querySelector('#modal-container');

  function showModal(pokemon) {

    let modalBody = document.querySelector('.modal-body');
    let modalTitle = document.querySelector('.modal-title');

    // clear existing modal content
    modalBody.innerHTML = '';
    modalTitle.innerHTML = '';

    let pokemonName = document.createElement('h1');
    pokemonName.innerText = pokemon.name;

    pokemonImg = document.createElement('img');
    pokemonImg.classList.add('modal-img');
    pokemonImg.setAttribute('src', pokemon.imageURL);

    let pokemonHeight = document.createElement('div');
    pokemonHeight.innerText = 'Height: '+pokemon.height;

    modalTitle.appendChild(pokemonName);
    modalBody.appendChild(pokemonImg);
    modalBody.appendChild(pokemonHeight);

  }

  // close modal if the user clicks close
  function hideModal() {
    modalContainer.classList.remove('is-visible');
  }

  // close modal if the user hits Esc
  window.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();  
    }
  });


  // method to filter pokemon out of pokemonList with matching name
  function filterPokemon(pokemonName) {
    return pokemonList.filter(pokemon => pokemon.name === pokemonName);
  }

  modalContainer.addEventListener('click', (e) => {
    // Since this is also triggered when clicking INSIDE the modal
    // We only want to close if the user clicks directly on the overlay
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });

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







