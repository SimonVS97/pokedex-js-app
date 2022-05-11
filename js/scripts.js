let pokemonList = [{name:'Bulbasaur', height: 7, types:['grass', 'poison']},
                    {name:'Ivysaur', height: 1, types:['grass', 'poison']},
                    {name: 'Venusaur', height: 2, types: ['grass', 'poison']}
];

// iterate over the list of objects
// checking for the height of a specific object
// writing name and height onto the doc
pokemonList.forEach(function(pokemon) {
  if(pokemon.height >= 5) {
    document.write(pokemon.name + ' (height: ' + pokemon.height + ')' + ' - Wow, that\'s big!');
    document.write('<br>');
  } else {
    document.write(pokemon.name + ' (height: ' + pokemon.height + ')');
    document.write('<br>')
  }
});


