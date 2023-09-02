function renderSinglePokemon(pokemonId, content) {
    currentPokemon = allPokemons[pokemonId];
    content.innerHTML = '';
    generatePokemonInfo(content);
    loadAbout();
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