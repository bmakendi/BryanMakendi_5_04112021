const url = new URL(window.location.href);
let id = "";
let cart = [];
let productName = "";
let imgUrl = "";
let altTxt = "";
let price = 0;

/**
 * Calls API fetch with the global variable url and fills DOM with the correct data.
 */
function callFetch() {
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
            altTxt = data.altTxt;
            typesData(data);
            setUpOptions(data.colors);
        })
        .catch(err => {
            console.log("Erreur: " + err);
        });
}

/**
 * Uses array colorsArray to have html option elements of each color
 * @param {Array<string>} colorsArray  an array of string colors
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
 * Uses properties from the data object to add elements to the DOM.
 * @param {object} data
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

///Adding elements to the cart///
/**
 * Builds the cart by adding the correct amount and color of the selected item.
 */
function buildCart() {
    let color = "";
    let quantity = 0;
    let product = {};
    document.getElementById("addToCart").addEventListener("click", e => {
        quantity = parseInt(document.getElementById("quantity").value);
        color = document.getElementById("colors").value;
        if (quantity > 0 && quantity <= 100 && color != "") {
            addItem(id, quantity, color);
            alert("Ajouté au panier !");
        }
        console.log(localStorage);
    });
}

/**
 * Creates an object containing the parameters, and adds it to an array.
 * Adds this array to the localStorage with the "cart" key.
 * @param {string} id an item's id
 * @param {number} quantity an item's quantity
 * @param {string} color an item's color
 */
function addItem(id, quantity, color) {
    let product = {
        _id: id,
        color: color,
        quantity: quantity,
        price: price,
        imgUrl: imgUrl,
        altTxt: altTxt,
        name: productName,
    };
    let duplicate;
    if (localStorage.getItem("cart") != null)
        cart = JSON.parse(localStorage.getItem("cart"));
    console.log(cart);
    duplicate = sameProduct(product, cart);
    if (duplicate[0]) {
        duplicate[1].quantity += parseInt(quantity);
    } else cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
}

/**
 * Checks if there's an item in cart that has the same id and color as product.
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

callFetch();
buildCart();
