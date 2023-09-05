let currentPokemon;
let allPokemons = [];
const firstLimit = 50;
const maxLimit = 1010;
const offset = 300;
let filterOn = false;
let animationSpeed = 1;

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
    await generateGermanNames(tempPokemons);
}

async function generateGermanNames(tempPokemons) {
    const gerPokemonUrls = tempPokemons.results.map(pokemon => pokemon.url.replace('pokemon', 'pokemon-species'));
    await fetchPokemonsUrls(gerPokemonUrls)
        .then(data => {
            for (let i = 0; i < data.length; i++) {
                const pokemonTranslated = data[i];
                if (pokemonTranslated.names == null || pokemonTranslated.names[5] == null || pokemonTranslated.names[5].name == null) {
                    return;
                }
                const germanName = pokemonTranslated.names[5].name;
                allPokemons[pokemonTranslated.id - 1].name = germanName;
            }
        })
        .catch(error => {
            console.error('Ein Fehler ist aufgetreten:', error);
        });

}


//holt Details zu jedem Pokemon
async function fetchPokemonsUrls(urls) {
    try {
        const fetchPromises = urls.map(url => fetch(url)); // Erzeugen von Array mit Fetch-Promises für jede URL        
        const responses = await Promise.all(fetchPromises); // Warten auf alle Fetch-Anfragen, indem wir sie parallel ausführen        
        const validResponses = responses.filter(response => response.ok); // Überprüfen auf erfolgreiche Antworten (Status 200-299) und Extrahieren des JSON-Inhalts
        const jsonPromises = validResponses.map(response => response.json());
        const jsonData = await Promise.all(jsonPromises); // Warten auf alle JSON-Promises und Extrahieren der JSON-Daten
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
    addAllElementsToListener();
}

//veränder Ansicht von Namen und ID
function changeHeaderView(pokemon) {
    pokemon.name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    pokemon.id = ("0000" + pokemon.id).slice(-4);
    currentPokemon = pokemon;
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
        window.scrollY + 1 + window.innerHeight >= document.documentElement.scrollHeight) {
        showMore();
    }
})

window.onscroll = function(e) {
    let scrollTop = document.querySelector("html").scrollTop;
    if (scrollTop >= 1) {
        document.getElementById('backtotop').classList.remove('d-none');
    } else {
        document.getElementById('backtotop').classList.add('d-none');
    }
}