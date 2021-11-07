const url = new URL(window.location.href);
let id = "";
let productName = "";
let imgUrl = "";
let price = 0;

if (url.searchParams.has("id")) {
    id = url.searchParams.get("id");
}

fetch("http://localhost:3000/api/products/" + id)
    .then(response => {
        return response.json();
    })
    .then(data => {
        console.log(data);
        price = data.price;
        imgUrl = data.imageUrl;
        productName = data.name;
        typesData(data);
        setUpOptions(data.colors);
    })
    .catch(err => {
        console.log("Erreur: " + err);
    });

/**
 *
 * @param {Array<string>} colorsArray  an array of string colors
 * @description
 * Uses array colorsArray to have html option elements of each color
 */
function setUpOptions(colorsArray) {
    let colors = document.getElementById("colors");
    for (const color of colorsArray) {
        let option = document.createElement("option");
        option.setAttribute("value", color);
        option.innerText = color;
        colors.appendChild(option);
    }
}

/**
 *
 * @param {object} data
 * @description Uses properties from the data object to add elements to the DOM
 */

function typesData(data) {
    let image = document.createElement("img");
    image.setAttribute("src", data.imageUrl);
    image.setAttribute("alt", data.altTxt);
    document.querySelector(".item__img").appendChild(image);
    document.getElementById("title").innerText = data.name;
    document.getElementById("price").innerText = data.price;
    document.getElementById("description").innerText = data.description;
}

//Adding elements to the cart

let color = "";
let quantity = 0;
let cart = [];
let product = {};

document.getElementById("addToCart").addEventListener("click", e => {
    quantity = parseInt(document.getElementById("quantity").value);
    color = document.getElementById("colors").value;
    if (quantity > 0 && quantity <= 100 && color != "")
        addItem(id, quantity, color);
    console.log(localStorage);
});

/**
 *
 * @param {string} id an item's id
 * @param {number} quantity an item's quantity
 * @param {string} color an item's color
 * @description
 * Creates an object containing the parameters, and adds it to an array.
 * Adds this array to the localStorage with the "cart" key.
 */
function addItem(id, quantity, color) {
    let product = {
        _id: id,
        color: color,
        quantity: quantity,
    };
    let duplicate;
    if (localStorage.getItem("cart") != null)
        cart = JSON.parse(localStorage.getItem("cart"));
    console.log(cart);
    duplicate = sameProduct(product, cart);
    if (duplicate[0]) {
        duplicate[1].quantity += parseInt(quantity);
    } else cart.push(product);
    console.log(JSON.stringify(cart));
    localStorage.setItem("cart", JSON.stringify(cart));
}

/**
 *
 * @param {*} product an object
 * @param {*} cart an array of objects
 * @returns an array [true, item], item being the first element having the same _id and color properties as product's,
 * else returns false if there's no item in cart that have these same properties
 */
function sameProduct(product, cart) {
    for (const item of cart) {
        if (item._id == product._id && item.color == product.color) {
            return [true, item];
        }
    }
    return false;
}
