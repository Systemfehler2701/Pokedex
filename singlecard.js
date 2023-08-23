function renderSinglePokemon(pokemonId) {
    document.getElementById('pokemonInfo').classList.remove('d-none');
    let content = document.getElementById('pokemonInfo');
    currentPokemon = allPokemons[pokemonId];
    content.innerHTML = '';
    generatePokemonInfo(content);
    loadAbout();
}

function generatePokemonInfo(content) {
    let img = currentPokemon.sprites.other.dream_world.front_default != null ? currentPokemon.sprites.other.dream_world.front_default : currentPokemon.sprites.front_default;
    content.innerHTML = `<div class="card ${currentPokemon.types[0].type.name}">
    <div class="card-header">
        <h4>#${currentPokemon.id}</h4>
        <h2>${currentPokemon.name}</h2>
        <div class="element-pic" id="element-pic">${generateElementIcons()}</div>
    </div>
    <div class="card-pic">
    <img src="${img}"></div>
    <div class="card-info">
        <div class="card-info-header"><h3 onclick="loadAbout()">About</h3><h3 onclick="loadBaseStats()">Base Stats</h3><h3 onclick="loadMoves()">Moves</h3></div>
        <div id="pokemonStats">        
    </div>
</div>`;
}

function loadAbout() {
    let content = document.getElementById('pokemonStats');
    content.innerHTML = '';
    content.innerHTML = `<div class="about-info"><span>Height: </span><span>${currentPokemon.height / 10} m</span></div>
    <div class="about-info"><span>Weight: </span><span>${currentPokemon.weight / 10} kg</span></div>`;

    for (let i = 0; i < currentPokemon.abilities.length; i++) {
        const ability = currentPokemon.abilities[i];
        content.innerHTML += `<div class="about-info"><span>Ability ${i+1}: </span><span>${ability.ability.name}</span></div>`;
    }
}

function loadBaseStats() {
    let content = document.getElementById('pokemonStats');
    content.innerHTML = '';
    generateStats(content);
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

function loadMoves() {
    let content = document.getElementById('pokemonStats');
    content.innerHTML = '';

    for (let i = 0; i < currentPokemon.moves.length; i++) {
        const move = currentPokemon.moves[i].move.name;
        generateMove(content, move);
    }
}

function generateMove(content, move) {
    content.innerHTML += `<div class="moves"><span>${move}</span></div>`;
}