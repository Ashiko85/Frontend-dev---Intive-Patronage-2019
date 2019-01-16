let cart = (JSON.parse(localStorage.getItem('cart')) || []);
const cartDOM = document.querySelector('.cart');
const addToCartButtonsDOM = document.querySelectorAll('[data-action="ADD_TO_CART"]');

if (cart.length > 0) {
  cart.forEach(cartItem => {
    const hero = cartItem;
    insertItemToDOM(hero);

    addToCartButtonsDOM.forEach(addToCartButtonDOM => {
      const heroDOM = addToCartButtonDOM.parentNode;

      if (heroDOM.querySelector('.hero_name').innerText === hero.name) {
        handleActionButtons(addToCartButtonDOM, hero);
      }
    });

  });
}

addToCartButtonsDOM.forEach(addToCartButtonDOM => {
  addToCartButtonDOM.addEventListener('click', () => {
    const heroDOM = addToCartButtonDOM.parentNode;
    const hero = {
      image: heroDOM.querySelector('.hero_image').getAttribute('src'),
      name: heroDOM.querySelector('.hero_name').innerText,
      price: heroDOM.querySelector('.hero_price').innerText,
    };

    const isInCart = (cart.filter(cartItem => (cartItem.name === hero.name)).length > 0);

    if (!isInCart) {
      insertItemToDOM(hero);
      cart.push(hero);
      localStorage.setItem('cart', JSON.stringify(cart));
      handleActionButtons(addToCartButtonDOM, hero);
    }
  });
});

function insertItemToDOM(hero) {
  cartDOM.insertAdjacentHTML('beforeend', `
    <div class="cart_item">
      <img class="cart_item_image" src="${hero.image}" alt="${hero.name}">
      <h3 class="cart_item_name">${hero.name}</h3>
      <h3 class="cart_item_price">${hero.price}</h3>
      <button class="btn btn--danger btn--big" data-action="REMOVE_ITEM">USUN Z KOSZYKA | &times;</button>
    </div>
  `);
}

function handleActionButtons(addToCartButtonDOM, hero) {
  addToCartButtonDOM.innerText = 'Wypożyczony';
  addToCartButtonDOM.disabled = true;

  const cartItemsDOM = cartDOM.querySelectorAll('.cart_item');
  cartItemsDOM.forEach(cartItemDOM => {
    if (cartItemDOM.querySelector('.cart_item_name').innerText === hero.name) {
      cartItemDOM.querySelector('[data-action="REMOVE_ITEM"]').addEventListener('click', () => removeItem(hero, cartItemDOM, addToCartButtonDOM));
    }
  });
}

function removeItem(hero, cartItemDOM, addToCartButtonDOM) {
  cartItemDOM.classList.add('cart_item--removed');
  setTimeout(() => cartItemDOM.remove(), 250);
  cart = cart.filter(cartItem => cartItem.name !== hero.name);
  localStorage.setItem('cart', JSON.stringify(cart));
  addToCartButtonDOM.innerText = 'Dodaj do koszyka';
  addToCartButtonDOM.disabled = false;
}

