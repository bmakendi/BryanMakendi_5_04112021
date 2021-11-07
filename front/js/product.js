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
        typesData(data);
        setUpOptions(data.colors);
    })
    .catch(err => {
        console.log("Erreur: " + err);
    });

/**
 *
 * @param {*} colorsArray
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
 * @param {*} data
 * Uses properties from the data object to add elements to the DOM
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

document.getElementById("addToCart").addEventListener("click", (e) => {
    quantity = document.getElementById("quantity").value;
    color = document.getElementById("colors").value;
    if ((quantity > 0 && quantity <= 100) && color != "") 
        addItem(id, quantity, color);
    console.log(localStorage);
});

function addItem(id, quantity, color) {
    let product = {
        _id: id,
        color: color,
        quantity: quantity
    };
    if (localStorage.getItem("cart") != null)
        cart = JSON.parse(localStorage.getItem("cart"));
    if(sameProduct(product, cart)) {
        cart.find((item) => {
            item._id == product._id;
        }).quantity += parseFloat(quantity);
    } else
        cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
}

function sameProduct(product, cart) {
    cart.find((item) => {
        console.log(cart);
        return (item._id == product._id) && (item.color == product.color);
    })
}


