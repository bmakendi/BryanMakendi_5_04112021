let cart = JSON.parse(localStorage.getItem("cart"));
let totalPrice = 0;
let totalQty = 0;

console.log(cart);

/**
 * 
 * @param {array} cart An array containing the localStorage's item
 * @description Runs through the array and displays everything the cart contains including prices and quantities.
 */
function displayCart(cart) {
    let totalQtySpan = document.getElementById("totalQuantity");
    let totalPriceSpan = document.getElementById("totalPrice");
    for (const item of cart) {
        addToDOM(item);
        totalQty += item.quantity;
        totalPrice += item.price;
    }
    totalQtySpan.innerText = totalQty;
    totalPriceSpan.innerText = parseFloat(totalPrice).toFixed(2);
}

/**
 * 
 * @param {object} item a sofa
 * @description Adds HTML elements to the DOM using the item's properties.
 */
function addToDOM(item) {
    let section = document.getElementById("cart__items");
    let article = document.createElement("article");   
    article.classList.add("cart__item");
    article.setAttribute("data-id", item._id);
    article.setAttribute("data-color", item.color);
    article.appendChild(cartItemImg(item));
    article.appendChild(cartItemContent(item));
    section.appendChild(article);
}

const cartItemImg = (item) => {
    let div = document.createElement("div"); 
    let img = document.createElement("img");
    div.classList.add("cart__item__img");
    img.setAttribute("src", item.imgUrl);
    img.setAttribute("alt", item.altTxt);
    div.appendChild(img);
    return div;
}

const cartItemContent = (item) => {
    let div = document.createElement("div"); 
    div.classList.add("cart__item__content");
    div.appendChild(cartItemDesc(item));
    div.appendChild(cartItemSetting(item));
    return div;
}

const cartItemDesc = (item) => {
    let div = document.createElement("div"); 
    let productName = document.createElement("h2"); 
    let color = document.createElement("p");
    let price = document.createElement("p");
    div.classList.add("cart__item__content_description");
    productName.innerText = item.name;
    color.innerText = item.color;
    price.innerText = parseFloat(item.price).toFixed(2) + " €"; 
    div.appendChild(productName);
    div.appendChild(color);
    div.appendChild(price);
    return div;
}

const cartItemSetting = (item) => {
    let div = document.createElement("div");
    div.classList.add("cart__item__content__settings");
    div.appendChild(cartItemQuantity(item));
    div.appendChild(cartItemDelete(item));
    return div;
}

const cartItemQuantity = (item) => {
    let div = document.createElement("div");
    let quantity = document.createElement("p");
    let input = document.createElement("input");
    div.classList.add("cart__item__content__settings__quantity");
    quantity.innerText = "Qté : ";
    input.classList.add("itemQuantity");
    input.setAttribute("type", "number");
    input.setAttribute("name", "itemQuantity");
    input.setAttribute("min", "1");
    input.setAttribute("max", "100");
    input.setAttribute("value", item.quantity);
    div.appendChild(quantity);
    div.appendChild(input);
    return div;
}

const cartItemDelete = (item) => {
    let div = document.createElement("div");
    let p = document.createElement("p");
    div.classList.add("cart__item__content__settings__delete");
    p.classList.add("deleteItem");
    p.innerText = "Supprimer";
    div.appendChild(p);
    return div;
}

displayCart(cart);