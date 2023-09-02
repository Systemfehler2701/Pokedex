//baut die Karten für die Gesamtansicht
function renderPokemon(content) {
    let img = currentPokemon.sprites.other.home.front_default != null ? currentPokemon.sprites.other.home.front_default : currentPokemon.sprites.other["official-artwork"].front_default;
    content.innerHTML +=
        `<div class="card-small-wrapper" id="pokecard-${Number(currentPokemon.id)}" onclick="rotateAndZoom(event, this, ${Number(currentPokemon.id)-1})" onmouseenter="rotateYAxis(this)">
            <div class="card-small ${currentPokemon.types[0].type.name}">
                <div class="front">
                    <div class="card-header-small">
                        <h4>#${currentPokemon.id}</h4>
                        <h2>${currentPokemon.name}</h2>
                    </div>
                    <div class="pokemon-pic"style="background-image: url('${img}');">
                    </div>
                    <div class="element-icon" id="element-icon">${generateElementIcons()}
                    </div>
                </div>
                <div class="details"></div>
                <div class="back">              
                </div>
            </div>
        </div>`;
}

function renderFilterOptions() {
    let content = document.getElementById('filter-window');
    content.innerHTML = '';
    let typeFilter = '';
    for (let i = 0; i < types.length; i++) {
        const element = types[i];
        typeFilter += `<div><input type="checkbox" id="${element.toLowerCase()}" value="${element.toLowerCase()}" class="type"><label for="${element.toLowerCase()}">${element}</label></div>`;
    }
    content.innerHTML = `<div class="filter-options d-none" id="filter-options"><div class="close-filter-options">
    <img src="grafiken/close-white.png" onclick="closeFilterOptions()"></div><div class="filter-elements">${typeFilter}</div>
    </div>`;
    checkboxes = document.querySelectorAll('.type');
    addEventListeners();
}

function generatePokemonInfo(content) {
    let img = currentPokemon.sprites.other.home.front_default != null ? currentPokemon.sprites.other.home.front_default : currentPokemon.sprites.other["official-artwork"].front_default;
    content.innerHTML = `<div class="card ${currentPokemon.types[0].type.name}">
    <img class="arrow-right" src="/grafiken/arrow-black.png" onclick="nextPokemon(this)">
    <img class="arrow-left" src="/grafiken/arrow-black.png" onclick="prevPokemon(this)">
    <div class="card-header">
        <h4>#${currentPokemon.id}</h4>
        <h2>${currentPokemon.name}</h2>
        <div class="element-pic" id="element-pic">${generateElementIcons()}</div>
    </div>
    <div class="card-pic">
    <img src="${img}">
    </div>
    <div class="card-info">
        <div class="card-info-header"><h3 onclick="loadAbout(event)">About</h3><h3 onclick="loadBaseStats(event)">Base Stats</h3><h3 onclick="loadMoves(event)">Moves</h3></div>
        <div id="pokemonStats">        
    </div>
</div>`;
}

function loadAbout(e) {
    let content = document.getElementById('pokemonStats');
    content.innerHTML = '';
    content.innerHTML = `<div class="about-info"><span>Height: </span><span>${currentPokemon.height / 10} m</span></div>
    <div class="about-info"><span>Weight: </span><span>${currentPokemon.weight / 10} kg</span></div>`;
    for (let i = 0; i < currentPokemon.abilities.length; i++) {
        const ability = currentPokemon.abilities[i];
        content.innerHTML += `<div class="about-info"><span>Ability ${i+1}: </span><span>${ability.ability.name}</span></div>`;
    }
    return false;
}

function generateMove(content, move) {
    content.innerHTML += `<div class="moves"><span>${move}</span></div>`;
}

//erstellt die Elementbilder
function generateElementIcons() {
    let content = '';
    for (let i = 0; i < currentPokemon.types.length; i++) {
        const type = currentPokemon.types[i];
        content += `<img src="grafiken/icons/${type.type.name}.svg">`;
    }
    return content;
}