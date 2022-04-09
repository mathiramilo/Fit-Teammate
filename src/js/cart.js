// Import Modules
import Product from "./classes/Product.js";
import Inventary from "./classes/Inventary.js";
import ShoppingCart from "./classes/ShoppingCart.js";

import {darkMode, brightMode} from "./app.js"


// The object Inventary contains an array of all the prodcuts
let inventary = new Inventary([]);

// Verifies if Inventary is in Session Storage
if (sessionStorage.getItem('inventary')) {
    // The inventary is stored in Session Storage
    let sessionStorageInventaryString = sessionStorage.getItem('inventary');
    let sessionStorageInventary = JSON.parse(sessionStorageInventaryString);
    inventary['products'] = sessionStorageInventary;
} else {
    // Create Inventary
    let productList = createInventary();
    inventary['products'] = productList;
}


// Get the cart from session storage
let cart = new ShoppingCart([]);

// Verifies if Cart is in Session Storage
if (sessionStorage.getItem('cart')) {
    // The cart is stored in Session Storage
    let sessionStorageCartString = sessionStorage.getItem('cart');
    let sessionStorageCart = JSON.parse(sessionStorageCartString);
    cart['products'] = sessionStorageCart;
} else {
    // Set empty cart in session storage
    sessionStorage.setItem('cart', "");
}

let chestBench = inventary.getProduct(1);
cart.addProduct(chestBench);

// Cart offCanvas
const cartOverlay = document.getElementById('cart-overlay');
const emptyCartToast = document.getElementById('empty-cart-toast');

const cartButton = document.getElementById('shopping-cart-button');

cartButton.addEventListener('click', () => {
    if (cart.products.length != 0) {
        cartOverlay.style.transform = "translateX(0)";
    } else {
        // The Cart is empty
        emptyCartToast.style.opacity = 1;
        emptyCartToast.style.pointerEvents = "all";
        emptyCartToast.style.animation = "toastAlert 0.8s ease";

        setTimeout(() => {
            emptyCartToast.style.opacity = 0;
            emptyCartToast.style.pointerEvents = "none";
            emptyCartToast.style.animation = "none";
        }, 2500);
    }
});

const closeCartButton = document.getElementById('close-cart-button');
closeCartButton.onclick = () => {
    cartOverlay.style.transform = "translateX(460px)";
}