let pokemonList = [{name:'Bulbasaur', height: 7, types:['grass', 'poison']},
                    {name:'Ivysaur', height: 1, types:['grass', 'poison']},
                    {name: 'Venusaur', height: 2, types: ['grass', 'poison']}
];

// iterate over the list of objects
// checking for the height of a specific object
// writing name and height onto the doc
for (let i=0; i<pokemonList.length; i++) {
  if (pokemonList[i].height >= 5) {
    document.write(pokemonList[i].name + ' (height: ' + pokemonList[i].height + ')' + ' - Wow, that\'s big!');
    document.write('<br>');
  } else {
    document.write(pokemonList[i].name + ' (height: ' + pokemonList[i].height + ')');
    document.write('<br>');
  }
}