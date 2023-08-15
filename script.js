let currentPokemon;
let allPokemons = [];
let firstLimit = 50;
let maxLimit = 0;
let offset = 300;
let filterOn = false;

function init() {
    renderAllPokemons();
    renderFilterOptions();
}


async function loadPokemons() {
    let url = `https://pokeapi.co/api/v2/pokemon?offset=0&limit=${firstLimit}`;
    let response = await fetch(url);
    let tempPokemons = await response.json();
    maxLimit = tempPokemons.count;

    const pokemonUrls = tempPokemons.results.map(pokemon => pokemon.url);

    await fetchPokemonsUrls(pokemonUrls)
        .then(data => {
            allPokemons = allPokemons.concat(data);
        })
        .catch(error => {
            console.error('Ein Fehler ist aufgetreten:', error);
        });
}

async function loadTheRest() {
    for (let i = 0; i < Math.ceil((maxLimit - firstLimit) / offset); i++) {
        let url = `https://pokeapi.co/api/v2/pokemon?offset=${firstLimit+offset*i}&limit=${offset}`;
        let response = await fetch(url);
        let tempPokemons = await response.json();
        const pokemonUrls = tempPokemons.results.map(pokemon => pokemon.url);
        await fetchPokemonsUrls(pokemonUrls)
            .then(data => {
                allPokemons = allPokemons.concat(data);
            })
            .catch(error => {
                console.error('Ein Fehler ist aufgetreten:', error);
            });
    }
}

async function fetchPokemonsUrls(urls) {
    try {
        // Erzeugen von Array mit Fetch-Promises für jede URL
        const fetchPromises = urls.map(url => fetch(url));

        // Warten auf alle Fetch-Anfragen, indem wir sie parallel ausführen
        const responses = await Promise.all(fetchPromises);

        // Überprüfen auf erfolgreiche Antworten (Status 200-299) und Extrahieren des JSON-Inhalts
        const validResponses = responses.filter(response => response.ok);
        const jsonPromises = validResponses.map(response => response.json());

        // Warten auf alle JSON-Promises und Extrahieren der JSON-Daten
        const jsonData = await Promise.all(jsonPromises);

        return jsonData;
    } catch (error) {
        console.error('Fehler beim Abrufen der URLs:', error);
        throw error;
    }
}

async function renderAllPokemons() {
    await loadPokemons();
    let content = document.getElementById('main-content');
    content.innerHTML = ``;
    allPokemons.forEach(pokemon => {
        pokemon.name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
        pokemon.id = ("0000" + pokemon.id).slice(-4);
        currentPokemon = pokemon;
        renderPokemon(content);
    });
    loadTheRest();
}

function renderPokemon(content) {
    let img = currentPokemon.sprites.other.dream_world.front_default != null ? currentPokemon.sprites.other.dream_world.front_default : currentPokemon.sprites.front_default;

    content.innerHTML +=
        `<div class="card-small-wrapper" onclick="renderSinglePokemon(${Number(currentPokemon.id)}-1);">
            <div class="card-small ${currentPokemon.types[0].type.name}" onmouseenter="rotateYAxis(this);">
                <div class="card-front-small">
                    <div class="card-header-small">
                        <h4>#${currentPokemon.id}</h4>
                        <h2>${currentPokemon.name}</h2>
                    </div>
                    <div class="pokemon-pic"style="background-image: url('${img}');">
                    </div>
                    <div class="element-icon" id="element-icon">${generateElementIcons()}
                    </div>
                </div>
                <div class="card-back-small">              
                </div>
            </div>
        </div>`;
}

function showMore() {
    // get latest pokemon
    let content = document.getElementById('main-content');
    let currentCount = document.querySelector('#main-content').childElementCount;
    if (filterOn) {
        return;
    }
    for (let i = currentCount; i < currentCount + 100; i++) {
        const pokemon = allPokemons[i];
        pokemon.name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
        pokemon.id = ("0000" + pokemon.id).slice(-4);
        currentPokemon = pokemon;
        renderPokemon(content);
    }
}

function generateElementIcons() {
    let content = '';
    for (let i = 0; i < currentPokemon.types.length; i++) {
        const type = currentPokemon.types[i];
        content += `<img src="grafiken/icons/${type.type.name}.svg">`;
    }
    return content;
}

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
        <div class="element-pic" id="element-pic"></div>
    </div>
    <div class="card-pic">
    <img src="${img}"></div>
    <div class="card-info">
        <div class="card-info-header"><h3 onclick="loadAbout()">About</h3><h3 onclick="loadBaseStats()">Base Stats</h3><h3 onclick="loadMoves()">Moves</h3></div>
        <div id="pokemonStats">        
    </div>
</div>`;
    generateElementPics();
}

function generateElementPics() {
    let content = document.getElementById('element-pic');
    content.innerHTML = ``;

    for (let i = 0; i < currentPokemon.types.length; i++) {
        const type = currentPokemon.types[i];
        content.innerHTML += `<img src="grafiken/icons/${type.type.name}.svg">`;
    }
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

function openFilterOptions() {
    document.getElementById('filter-options').classList.remove('d-none');
}

function closeFilterOptions() {
    document.getElementById('filter-options').classList.add('d-none');
}

window.onmousedown = function(e) {
    if (e.target == document.getElementById('pokemonInfo')) {
        document.getElementById('pokemonInfo').classList.add('d-none');
    }
}

window.addEventListener('scroll', () => {
    let currentCount = document.querySelector('#main-content').childElementCount;
    if (allPokemons.length > currentCount &&
        window.scrollY + 1 + window.innerHeight >=
        document.documentElement.scrollHeight) {
        showMore();
    }
})

function rotateYAxis(element) {
    element.style.transition = "none"; // Remove transition temporarily
    element.style.transform = "rotateY(0deg)"; // Reset rotation
    getComputedStyle(element).transform; // Trigger reflow
    element.style.transition = "transform 1.5s linear"; // Restore transition
    element.style.transform = "rotateY(360deg)";
}