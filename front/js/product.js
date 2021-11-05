const url = new URL(window.location.href);
let id = "";

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

let cart = [];
let color = "";
let quantity = 0;

document.getElementById("quantity").addEventListener("change", (e) => {
    quantity = e.target.value;
});

document.getElementById("colors").addEventListener("change", (e) => {
    color = e.target.value;
})

document.getElementById("addToCart").addEventListener("click", (e) => {
    console.log(quantity + " canapé(s) de couleur " + color);
    let obj = {
        id: id,
        quantities: quantity,
        color: color
    };
    JSON.stringify(obj);
    localStorage.setItem(id, obj);
    console.log(localStorage);
});
