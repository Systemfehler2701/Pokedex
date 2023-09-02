function generateCardPosition(element) {
    let pokeCard = element.getBoundingClientRect(); // Fügt eine Klasse hinzu, um das Element zu transformieren
    const centerX = window.innerWidth / 2; // Berechnet die Mitte des Bildschirms dynamisch
    const centerY = window.innerHeight / 2;
    const elementWidth = element.offsetWidth / 2; // Berechnet die Verschiebung des Elements relativ zur Mitte des Bildschirms
    const elementHeight = element.offsetHeight / 2;
    let coordinates = {
        offsetX: centerX - pokeCard.x - elementWidth,
        offsetY: centerY - pokeCard.y - elementHeight
    };
    return coordinates;
}

function rotateAndZoom(e, parentElement, pokemonId) {
    let element = parentElement.querySelector('.card-small');
    if (e.srcElement.tagName == 'H3' || e.srcElement.classList.contains('arrow-left') || e.srcElement.classList.contains('arrow-right')) {
        return;
    }
    element.classList.add('animation-running');
    let cardCoordinates = generateCardPosition(element);
    if (element.classList.contains("open")) {
        closeSingleCrad();
    } else {
        openSingleCard(element, pokemonId, cardCoordinates);
    }
}

function openSingleCard(element, pokemonId, cardCoordinates) {
    element.style.transition = `transform ${animationSpeed}s`;
    element.style.transform = `rotateY(360deg) translate(${cardCoordinates.offsetX}px, ${cardCoordinates.offsetY}px) scale(2)`;
    element.classList.add("open");
    element.classList.add('animation-running');
    document.querySelector('.background-blur').classList.remove("d-none");
    document.querySelector('body').classList.add("overflow-hidden");
    renderSinglePokemon(pokemonId, element.querySelector('div.details'));
    setTimeout(() => {
        loadAbout();
    }, 255);
}

function closeSingleCrad() {
    let element = document.querySelector('.open');
    element.style.transform = ``;
    element.style.transition = `transform ${animationSpeed}s`;
    element.classList.remove("open");
    element.classList.add('animation-running');
    document.querySelector('.background-blur').classList.add("d-none");
    document.querySelector('body').classList.remove("overflow-hidden");
    setTimeout(() => {
        element.querySelector('div.details').innerHTML = '';
    }, 245);
}

// lässt Element um die Y Achse rotieren wenn Cursor darüber
function rotateYAxis(parentElement) {
    let element = parentElement.querySelector('.card-small');
    if (element.classList.contains('open') || element.classList.contains('animation-running')) {
        return;
    }
    element.classList.add('animation-running');
    element.style.transition = `transform ${animationSpeed}s cubic-bezier(0.2, 0.5, 0.9, 0.5)`;
    element.style.transform = "rotateY(360deg)";
}

function addAnimationListener(element) {
    element.addEventListener('transitionend', (event) => {
        if (event.propertyName == 'opacity') {
            return;
        }
        element.classList.remove('animation-running');
        if (element.classList.contains("open")) {
            return;
        }
        element.style.transition = "none"; // entfernt Rotation
        element.style.transform = "rotateY(0deg) scale(1)"; // setzt Rotation zurück
        getComputedStyle(element).transform;
    });
}

function addAllElementsToListener() {
    let e = document.querySelectorAll('.card-small');
    e.forEach(element => {
        if (element.ontransitionend == null) {
            addAnimationListener(element);
        }
    });
}