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

// sucht alle Pokemon mit dem gefilterten Typ
function renderAllPokemonsWithFilter() {
    let content = document.getElementById('main-content');
    let filterType = getFilterType();
    let filterName = document.getElementById('pokemon-input').value;
    content.innerHTML = ``;
    checkFilterStatus(filterName, filterType);
    if (filterOn) {
        renderFilteredPokemons(filterName, filterType, content);
    } else {
        showMore();
    }
}

function getFilterType() {
    if (document.querySelector('.type:checked') != null) {
        return document.querySelector('.type:checked').value;
    }
    return '';
}

function checkFilterStatus(filterName, filterType) {
    filterOn = true;
    if (filterType == '' && filterName == '') {
        filterOn = false;
    }
}

function renderFilteredPokemons(filterName, filterType, content) {
    allPokemons.forEach(pokemon => {
        currentPokemon = pokemon;
        if ((filterType == '' || currentPokemon.types.map(pokemonType => pokemonType.type.name).indexOf(filterType) >= 0) && pokemon.name.toLowerCase().indexOf(filterName.toLowerCase()) == 0) {
            pokemon.name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
            pokemon.id = ("0000" + pokemon.id).slice(-4);
            renderPokemon(content);
        }
    });
}