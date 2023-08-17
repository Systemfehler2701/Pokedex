let checkboxes = [];
let types = ['Bug', 'Dark', 'Dragon', 'Electric', 'Fairy', 'Fighting', 'Fire', 'Flying', 'Ghost', 'Grass', 'Ground', 'Ice', 'Normal', 'Poison', 'Psychic', 'Rock', 'Steel', 'Water'];

function renderFilterOptions() {
    let content = document.getElementById('filter-window');
    content.innerHTML = '';
    let typeFilter = '';
    for (let i = 0; i < types.length; i++) {
        const element = types[i];
        typeFilter += `<div><input type="checkbox" id="${element.toLowerCase()}" value="${element.toLowerCase()}" class="type"><label for="${element.toLowerCase()}">${element}</label></div>`;
    }
    content.innerHTML = `<div class="filter-options d-none" id="filter-options">
    <div class="close-filter-options" onclick="closeFilterOptions()">x</div>${typeFilter}
    </div>`;
    checkboxes = document.querySelectorAll('.type');
    addEventListeners();
}


function addEventListeners() {
    // Füge jedem Checkbox-Element einen Event Listener hinzu
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('click', function() {
            // Deaktiviere alle anderen Checkboxen
            checkboxes.forEach(otherCheckbox => {
                if (otherCheckbox !== checkbox) {
                    otherCheckbox.checked = false;
                }
            });
            renderAllPokemonsWithFilter();
        });
    });
}

function renderAllPokemonsWithFilter() {
    filterOn = true;
    let type = '';
    let name = document.getElementById('pokemon-input').value;
    if (document.querySelector('.type:checked') != null) {
        type = document.querySelector('.type:checked').value;
    }
    let content = document.getElementById('main-content');
    content.innerHTML = ``;
    if (type == '' && name == '') {
        filterOn = false;
        showMore();
        return;
    }
    allPokemons.forEach(pokemon => {
        currentPokemon = pokemon;
        if ((type == '' || currentPokemon.types.map(pokemonType => pokemonType.type.name).indexOf(type) >= 0) && pokemon.name.toLowerCase().indexOf(name.toLowerCase()) == 0) {
            pokemon.name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
            pokemon.id = ("0000" + pokemon.id).slice(-4);
            renderPokemon(content);
        }
    });
}