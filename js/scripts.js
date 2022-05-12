// IIFE to wrap array

let pokemonRespository = (function () {
  let pokemonList = [{name:'Bulbasaur', height: 7, types:['grass', 'poison']},
                    {name:'Ivysaur', height: 1, types:['grass', 'poison']},
                    {name: 'Venusaur', height: 2, types: ['grass', 'poison']}
  ];
  function getAll() {
    return pokemonList;
  }

  function add(pokemon) {
    if (typeof pokemon === 'object' 
    && Object.keys(pokemon)[0]=='name' && Object.keys(pokemon)[1] == 'height' && Object.keys(pokemon[2] == 'types')) {
      return pokemonList.push(pokemon);
    }
  }

  function filterPokemon(pokemonName) {
    return pokemonList.filter(pokemon => pokemon.name === pokemonName);
  }

  return {
    getAll: getAll,
    add: add,
    filterPokemon: filterPokemon
  };

})();

// Retrieve array from IIFE
// iterate over the list of objects
// checking for the height of a specific object
// writing name and height onto the doc
pokemonRespository.getAll().forEach(function(pokemon) {
  if(pokemon.height >= 5) {
    document.write(pokemon.name + ' (height: ' + pokemon.height + ')' + ' - Wow, that\'s big!');
    document.write('<br>');
  } else {
    document.write(pokemon.name + ' (height: ' + pokemon.height + ')');
    document.write('<br>')
  }
});


