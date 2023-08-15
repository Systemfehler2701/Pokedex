let checkboxes = [];

function renderFilterOptions() {
    let content = document.getElementById('filter-window');
    content.innerHTML = '';
    content.innerHTML = `<div class="filter-options d-none" id="filter-options">
    <div class="close-filter-options" onclick="closeFilterOptions()">x</div>
    <div><input type="checkbox" id="bug" value="bug" class="type"><label for="bug">Bug</label></div>
    <div><input type="checkbox" id="dark" value="dark" class="type"><label for="dark">Dark</label></div>
    <div><input type="checkbox" id="dragon" value="dragon" class="type"><label for="dragon">Dragon</label></div>
    <div><input type="checkbox" id="electric" value="electric" class="type"><label for="electric">Electric</label></div>
    <div><input type="checkbox" id="fairy" value="fairy" class="type"><label for="fairy">Fairy</label></div>
    <div><input type="checkbox" id="fighting" value="fighting" class="type"><label for="fighting">Fighting</label></div>
    <div><input type="checkbox" id="fire" value="fire" class="type"><label for="fire">Fire</label></div>
    <div><input type="checkbox" id="flying" value="flying" class="type"><label for="flying">Flying</label></div>
    <div><input type="checkbox" id="ghost" value="ghost" class="type"><label for="ghost">Ghost</label></div>
    <div><input type="checkbox" id="grass" value="grass" class="type"><label for="grass">Grass</label></div>
    <div><input type="checkbox" id="ground" value="ground" class="type"><label for="ground">Ground</label></div>
    <div><input type="checkbox" id="ice" value="ice" class="type"><label for="ice">Ice</label></div>
    <div><input type="checkbox" id="normal" value="normal" class="type"><label for="normal">Normal</label></div>
    <div><input type="checkbox" id="poison" value="poison" class="type"><label for="poison">Poison</label></div>
    <div><input type="checkbox" id="psychic" value="psychic" class="type"><label for="psychic">Psychic</label></div>
    <div><input type="checkbox" id="rock" value="rock" class="type"><label for="rock">Rock</label></div>
    <div><input type="checkbox" id="steel" value="steel" class="type"><label for="steel">Steel</label></div>
    <div><input type="checkbox" id="water" value="water" class="type"><label for="water">Water</label></div>
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