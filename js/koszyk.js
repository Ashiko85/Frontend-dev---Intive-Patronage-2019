let cart = (JSON.parse(localStorage.getItem('cart')) || []);
const cartDOM = document.querySelector('.cart');
const addToCartButtonsDOM = document.querySelectorAll('[data-action="ADD_TO_CART"]');

if (cart.length > 0) {
    cart.forEach(cartItem => {
        const product = cartItem;
        insertItemToDOM(product);

        addToCartButtonsDOM.forEach(addToCartButtonDOM => {
            const productDOM = addToCartButtonDOM.parentNode;

            if (productDOM.querySelector('.product_name').innerText === product.name) {
                handleActionButtons(addToCartButtonDOM, product);
            }
        });

    });
}

addToCartButtonsDOM.forEach(addToCartButtonDOM => {
    addToCartButtonDOM.addEventListener('click', () => {
        const productDOM = addToCartButtonDOM.parentNode;
        const product = {
            image: productDOM.querySelector('.product_image').getAttribute('src'),
            name: productDOM.querySelector('.product_name').innerText,
            price: productDOM.querySelector('.product_price').innerText,
        };

        const isInCart = (cart.filter(cartItem => (cartItem.name === product.name)).length > 0);

        if (!isInCart) {
            insertItemToDOM(product);
            cart.push(product);
            localStorage.setItem('cart', JSON.stringify(cart));
            handleActionButtons(addToCartButtonDOM, product);
        }
    });
});

function insertItemToDOM(product) {
    cartDOM.insertAdjacentHTML('beforeend', `
    <div class="cart_item">
      <img class="cart_item_image" src="${product.image}" alt="${product.name}">
      <h3 class="cart_item_name">${product.name}</h3>
      <h3 class="cart_item_price">${product.price}</h3>
      <button class="btn btn--danger btn--big" data-action="REMOVE_ITEM">USUN Z KOSZYKA | &times;</button>
    </div>
  `);
}

function handleActionButtons(addToCartButtonDOM, product) {
    addToCartButtonDOM.innerText = 'Wypożyczony';
    addToCartButtonDOM.disabled = true;

    const cartItemsDOM = cartDOM.querySelectorAll('.cart_item');
    cartItemsDOM.forEach(cartItemDOM => {
        if (cartItemDOM.querySelector('.cart_item_name').innerText === product.name) {
            cartItemDOM.querySelector('[data-action="REMOVE_ITEM"]').addEventListener('click', () => removeItem(product, cartItemDOM, addToCartButtonDOM));
        }
    });
}

function removeItem(product, cartItemDOM, addToCartButtonDOM) {
    cartItemDOM.classList.add('cart_item--removed');
    setTimeout(() => cartItemDOM.remove(), 250);
    cart = cart.filter(cartItem => cartItem.name !== product.name);
    localStorage.setItem('cart', JSON.stringify(cart));
    addToCartButtonDOM.innerText = 'Dodaj do koszyka';
    addToCartButtonDOM.disabled = false;
}

