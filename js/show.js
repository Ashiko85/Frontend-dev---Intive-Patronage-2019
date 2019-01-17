function showHeroListView() {
    const heroesListRegion = document.getElementById("heroesList-region");

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
                        <span>${hero.desc}</span>
                        <button class="btn btn--primary" data-action="ADD_TO_CART">Dodaj do koszyka</button>
                    </div>
                </div>
            </div>
        </div>
                       <span>${hero.name}</span>
                       <span>${hero.price}zł/h</span>
    </div>
</div>
`;

        element.innerHTML = template;
        heroesListRegion.appendChild(element);
    });
}