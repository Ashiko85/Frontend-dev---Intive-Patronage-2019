let heroesList = [];

function prepareCreateHeroData(heroForm) {
    const textarea = document.querySelector("#heroCreate-form textarea");
    return {
        name: heroForm.name.value,
        price: heroForm.price.value,
        img: heroForm.photo.value,
        desc: heroForm.textarea.value
    };
}

function prepareEditHeroData(heroForm) {
    const textarea = document.querySelector("#heroEdit-form textarea");
    return {
        name: heroForm.hero.value,
        price: heroForm.price.value,
        img: heroForm.photo.value,
        desc: heroForm.textarea.value
    }
}

function addHero(hero) {
    heroesList.push(hero);

    saveToLocalStorage();
}

function editHero(heroName, heroPrice, heroPicture, heroDescription) {

    heroesList.forEach(hero => {
        if (heroName === hero.name) {
            if (!heroPrice) {
                return hero.price;
            }
            if (heroPrice !== hero.price) {
                hero.price = heroPrice;
            }
            if (!heroPicture) {
                return hero.img;
            }
            if (heroPicture !== hero.img) {
                hero.img = heroPicture;
            }
            if (!heroDescription) {
                return hero.img;
            }
            if (heroDescription !== hero.desc) {
                hero.desc = heroDescription;
            }
        }
    });

    saveToLocalStorage();
    clearRegions();
    showHeroListView();
}

function removeHero(heroName) {
    const newHeroesList = [];

    heroesList.forEach(hero => {
        if (heroName !== hero.name) {
            newHeroesList.push(hero);
        }
    });

    heroesList = newHeroesList;

    saveToLocalStorage();
    clearRegions();
    showHeroListView();
}

function loadMockHeroes(event) {
    const mockHeroesList = [
        {
            name: "Iron Man",
            price: 3000,
            img: 'Iron_Man.jpg',
            desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        },
        {
            name: "Spider-Man",
            price: 4000,
            img: 'Spider-Man.jpg',
            desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        },
        {
            name: "Star Lord",
            price: 9000,
            img: 'Star-Lord.jpg',
            desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        },
        {
            name: "Thor",
            price: 6000,
            img: 'Thor.jpg',
            desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        },
        {
            name: "Black Widow",
            price: 5000,
            img: 'Black_Widow.jpg',
            desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        },
        {
            name: "Doctor Strange",
            price: 7000,
            img: 'Doctor_Strange.jpg',
            desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        }
    ];

    heroesList = heroesList.concat(mockHeroesList);
    saveToLocalStorage();
    // event.preventDefault();     // <- here added prevent default
    clearRegions();
    showHeroListView();
}

function clearHeroesList() {
    heroesList = [];
    saveToLocalStorage();
    clearRegions();
    showHeroListView();
}

// local storage functions

function saveToLocalStorage() {
    const listToObject = {data: heroesList}, heroesString = JSON.stringify(listToObject);

    localStorage.setItem("heroesList", heroesString)
}

function loadFromLocalStorage() {
    let localStorageData = localStorage.getItem("heroesList"), parsedLocalStorageData;

    if (!localStorageData) {
        parsedLocalStorageData = {data: []}
    } else {
        parsedLocalStorageData = JSON.parse(localStorageData);
    }

    heroesList = parsedLocalStorageData.data;
}