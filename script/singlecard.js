function renderSinglePokemon(pokemonId, content) {
    currentPokemon = allPokemons[pokemonId];
    content.innerHTML = '';
    generatePokemonInfo(content);
    loadAbout();
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

function loadBaseStats(e) {
    let content = document.getElementById('pokemonStats');
    content.innerHTML = '';
    generateStats(content);
    return false;
}

function generateStats(content) {
    content.innerHTML = `<canvas id="myChart" width="280" height="180"></canvas>`;
    apiData = [];
    apiLabels = [];

    for (let i = 0; i < currentPokemon.stats.length; i++) {
        const base_stat = currentPokemon.stats[i].base_stat;
        const stat_name = currentPokemon.stats[i].stat.name;
        apiData.push(base_stat);
        apiLabels.push(stat_name);
    }
    drawChart();
}

function loadMoves(e) {
    let content = document.getElementById('pokemonStats');
    content.innerHTML = '';

    for (let i = 0; i < currentPokemon.moves.length; i++) {
        const move = currentPokemon.moves[i].move.name;
        generateMove(content, move);
    }
    return false;
}

function generateMove(content, move) {
    content.innerHTML += `<div class="moves"><span>${move}</span></div>`;
}

function nextPokemon(element) {
    let parentElement = element.closest(".card-small-wrapper");
    let nextElement = parentElement.nextElementSibling;
    if (nextElement == null) {
        nextElement = document.querySelector('#main-content>div:first-child');
    }
    parentElement.querySelector('.card-small').click();
    nextElement.querySelector('.card-small').click();
}

function prevPokemon(element) {
    let parentElement = element.closest(".card-small-wrapper");
    let nextElement = parentElement.previousElementSibling;
    if (nextElement == null) {
        nextElement = document.querySelector('#main-content>div:last-child');
    }
    parentElement.querySelector('.card-small').click();
    nextElement.querySelector('.card-small').click();
}