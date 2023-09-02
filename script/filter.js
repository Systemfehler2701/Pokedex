let checkboxes = [];
let types = ['Bug', 'Dark', 'Dragon', 'Electric', 'Fairy', 'Fighting', 'Fire', 'Flying', 'Ghost', 'Grass', 'Ground', 'Ice', 'Normal', 'Poison', 'Psychic', 'Rock', 'Steel', 'Water'];

function openFilterOptions() {
    document.getElementById('filter-options').classList.remove('d-none');
}

function closeFilterOptions() {
    document.getElementById('filter-options').classList.add('d-none');
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

//übergibt den gefilterten Typ
function getFilterType() {
    if (document.querySelector('.type:checked') != null) {
        return document.querySelector('.type:checked').value;
    }
    return '';
}

//überprüft den Filterstatus
function checkFilterStatus(filterName, filterType) {
    filterOn = true;
    if (filterType == '' && filterName == '') {
        filterOn = false;
    }
}

// sucht alle Pokemon mit dem gefilterten Typ
function renderFilteredPokemons(filterName, filterType, content) {
    allPokemons.forEach(pokemon => {
        if ((filterType == '' || pokemon.types.map(pokemonType => pokemonType.type.name).indexOf(filterType) >= 0) && pokemon.name.toLowerCase().indexOf(filterName.toLowerCase()) == 0) {
            changeHeaderView(pokemon);
            renderPokemon(content);
        }
    });
    addAllElementsToListener();
}

//rendert alle Pokemon nach gefiltertem Typ
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