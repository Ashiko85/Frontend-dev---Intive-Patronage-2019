function clearRegions() {
    const regions = [
        'heroesList-region',
        'addHeroForm-region'
    ];

    regions.forEach(region => {
        const DOMelement = document.getElementById(region);
        DOMelement.innerHTML = '';
    })
}

function attachMenuListeners() {
    const addHeroButton = document.getElementById('addHero-button');

    addHeroButton.addEventListener('click', showHeroCreateView);
}

function showHeroCreateView(event) {
    event.preventDefault();

    clearRegions();

    const addHeroRegion = document.getElementById('addHeroForm-region'), addHeroFormTemplate = `
    
    <div class="form-container">
                <form id="heroCreate-form">
                <h1>Dodaj Herosa</h1>
            <div class="form-group">
                <input type="text" name="name" />
                <label class="control-label" for="name">Nazwa Bohatera</label><i class="bar"></i>
            </div>
            <div class="form-group">
                <input type="text" name="photo" />
                <label class="control-label" for="photo">Adres/nazwa zdjęcia</label><i class="bar"></i>
            </div>
            <div class="form-group">
                <input type="text" name="price" />
                <label class="control-label" for="price">Cena wynajmu /h</label><i class="bar"></i>
            </div>
            <div class="form-group">
                <textarea></textarea>
                <label class="control-label" for="textarea">Opis Bohatera</label><i class="bar"></i>
            </div>
            </form>
            <div class="button-container">
                <button class="button" type="button" id="submitHero-button"><span>Submit</span></button>
            </div>
            </div>,
`, HTMLelement = document.createElement('div');

    HTMLelement.innerHTML = addHeroFormTemplate;
    addHeroRegion.appendChild(HTMLelement);

    // after show actions

    const submitHeroButton = document.getElementById('submitHero-button');

    submitHeroButton.addEventListener('click', event => {
        event.preventDefault();

        const heroForm = document.forms['heroCreate-form'], heroData = prepareCreateHeroData(heroForm);

        addHero(heroData);
        clearRegions();
        showHeroListView();
    })
}

function showHeroListView() {
    const heroesListRegion = document.getElementById('heroesList-region');

    heroesList.forEach(hero => {
        const element = document.createElement('div');
        const template = `
<div class="hero-item">
    <div>
        <a class="cta" href="#hero-modal"><img src=pics/${hero.img} alt=${hero.name}></a>
        <div id="hero-modal" class="modaloverlay">
            <div class="modal">
                <a href="#" class="close">&times;</a>
                <div id="modal" class="modal-window">
                    <img src=pics/${hero.img} alt=${hero.name}></a>
                    <div>
                        <span>${hero.name}</span>
                        <span>${hero.price}zł/h</span>
                        <span>${hero.price}</span>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <span>${hero.name}</span>
            <span>${hero.price}zł/h</span>
        </div>
    </div>
</div>
`;

        element.innerHTML = template;
        heroesListRegion.appendChild(element);
    });
}

let heroesList = [];

function prepareCreateHeroData(heroForm) {
    return {
        name: heroForm.name.value,
        price: heroForm.price.value,
        img: heroForm.photo.value,
        desc: 'desc'
    };
}

function addHero(hero) {
    heroesList.push(hero);

    saveToLocalStorage();
}


// local storage functions
function saveToLocalStorage() {
    const listToObject = {data: heroesList}, heroesString = JSON.stringify(listToObject);

    localStorage.setItem('heroesList', heroesString)
}

function loadFromLocalStorage() {
    let localStorageData = localStorage.getItem('heroesList'), parsedLocalStorageData;

    if (!localStorageData) {
        parsedLocalStorageData = {data: []}
    } else {
        parsedLocalStorageData = JSON.parse(localStorageData);
    }

    heroesList = parsedLocalStorageData.data;
}

loadFromLocalStorage();

attachMenuListeners();
showHeroListView();