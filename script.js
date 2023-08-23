let currentPokemon;
let allPokemons = [];
const firstLimit = 50;
const maxLimit = 1010;
const offset = 300;
let filterOn = false;

function init() {
    renderAllPokemons();
    renderFilterOptions();
}

async function loadTheRest() {
    for (let i = 0; i < Math.ceil((maxLimit - firstLimit) / offset); i++) {
        let calculatedOffset = firstLimit + offset * i;
        let calculatedLimit = offset;
        if ((firstLimit + offset * i + offset) > maxLimit) {
            calculatedLimit = maxLimit - allPokemons.length;
        }
        let url = `https://pokeapi.co/api/v2/pokemon?offset=${calculatedOffset}&limit=${calculatedLimit}`;
        await loadPokemons(url);
    }
}

async function loadPokemons(url) {
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
    await loadFirstLimit();
    let content = document.getElementById('main-content');
    content.innerHTML = ``;
    renderPokemonsFromTill(content, 0, 50);
    loadTheRest();
}
async function loadFirstLimit() {
    let url = `https://pokeapi.co/api/v2/pokemon?offset=0&limit=${firstLimit}`;
    await loadPokemons(url);
}

//baut die Pokemonkarten in gewünschter Anzahl von gewünschten Startpunkt
function renderPokemonsFromTill(content, currentCount, limit) {
    for (let i = currentCount; i < currentCount + limit; i++) {
        let pokemon = allPokemons[i];
        changeHeaderView(pokemon);
        renderPokemon(content);
    }
}

//veränder Ansicht von Namen und ID
function changeHeaderView(pokemon) {
    pokemon.name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    pokemon.id = ("0000" + pokemon.id).slice(-4);
    currentPokemon = pokemon;
}

//baut die Karten für die Gesamtansicht
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

//erstellt die Elementbilder
function generateElementIcons() {
    let content = '';
    for (let i = 0; i < currentPokemon.types.length; i++) {
        const type = currentPokemon.types[i];
        content += `<img src="grafiken/icons/${type.type.name}.svg">`;
    }
    return content;
}

// läd am ende der seite 100 weitere Pokemon (nur wenn filter aus)
function showMore() {
    let content = document.getElementById('main-content');
    let currentCount = document.querySelector('#main-content').childElementCount;
    if (filterOn) {
        return;
    }
    renderPokemonsFromTill(content, currentCount, 100);
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

// lässt Element um die Y Achse rotieren wenn Cursor darüber
function rotateYAxis(element) {
    element.style.transition = "none"; // entfernt Rotation
    element.style.transform = "rotateY(0deg)"; // setzt Rotation zurück
    getComputedStyle(element).transform; // 
    element.style.transition = "transform 1.5s linear";
    element.style.transform = "rotateY(360deg)";
}