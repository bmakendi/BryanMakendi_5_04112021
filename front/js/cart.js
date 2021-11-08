let cart = [];
if (localStorage != null) cart = JSON.parse(localStorage.getItem("cart"));
let itemTotalPrice = 0;
let cartTotalPrice = 0;
let totalQty = 0;

console.log(cart);

/**
 * Sorts the cart by its item's _id value.
 */
function sortCart() {
    cart.sort((a, b) => {
        if (a._id < b._id) 
            return -1;
        if (a._id > b._id) 
            return 1;
        return 0;
    })
}

/**
 * Runs through the array and displays everything the cart contains including prices and quantities.
 * @param {array} cart An array containing the localStorage's item
 */
function displayCart(cart) {
    let totalQtySpan = document.getElementById("totalQuantity");
    let totalPriceSpan = document.getElementById("totalPrice");
    if (cart != null && cart.length > 0) {
        sortCart();
        for (const item of cart) {
            addToDOM(item);
            totalQty += item.quantity;
            itemTotalPrice = parseFloat(item.price) * parseFloat(item.quantity);
            cartTotalPrice += itemTotalPrice;
        }
        totalQtySpan.innerText = totalQty;
        totalPriceSpan.innerText = parseFloat(cartTotalPrice).toFixed(2);
        quantitySettings();
        deleteSettings();
    } else {
        totalQtySpan.innerText = "0";
        totalPriceSpan.innerText = "0";
    }
}

/**
 *  Adds HTML elements to the DOM using the item's properties.
 * @param {object} item a sofa
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

///Creating div elements///

const cartItemImg = item => {
    let div = document.createElement("div");
    let img = document.createElement("img");
    div.classList.add("cart__item__img");
    img.setAttribute("src", item.imgUrl);
    img.setAttribute("alt", item.altTxt);
    div.appendChild(img);
    return div;
};

const cartItemContent = item => {
    let div = document.createElement("div");
    div.classList.add("cart__item__content");
    div.appendChild(cartItemDesc(item));
    div.appendChild(cartItemSetting(item));
    return div;
};

const cartItemDesc = item => {
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
};

const cartItemSetting = item => {
    let div = document.createElement("div");
    div.classList.add("cart__item__content__settings");
    div.appendChild(cartItemQuantity(item));
    div.appendChild(cartItemDelete(item));
    return div;
};

const cartItemQuantity = item => {
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
};

const cartItemDelete = () => {
    let div = document.createElement("div");
    let p = document.createElement("p");
    div.classList.add("cart__item__content__settings__delete");
    p.classList.add("deleteItem");
    p.innerText = "Supprimer";
    div.appendChild(p);
    return div;
};

///Cart modifications///

/**
 * Runs through cart and listens to click event on an input
 * to know if the user increases or decreases and item's quantity.
 */
function quantitySettings() {
    let inputs = document.querySelectorAll(".itemQuantity");
    for (const input of inputs) {
        input.addEventListener("change", e => {
            let article = input.closest("article");
            for (const item of cart) {
                if (
                    item._id == article.dataset.id &&
                    item.color == article.dataset.color
                ) {
                    item.quantity = e.target.value;
                    updateCart();
                    location.reload();
                }
            }
        });
    }
}

/**
 * Runs through cart and listens to click event
 * to know if an item should be deleted.
 */
function deleteSettings() {
    let deleteItems = document.querySelectorAll(".deleteItem");
    for (const deleteItem of deleteItems) {
        deleteItem.addEventListener("click", e => {
            let article = deleteItem.closest("article");
            let i = 0;
            for (const item of cart) {
                if (
                    item._id == article.dataset.id &&
                    item.color == article.dataset.color
                ) {
                    if (
                        confirm("Voulez-vous supprimer cet élément du panier ?")
                    ) {
                        cart.splice(i, 1);
                        updateCart();
                        location.reload();
                    }
                }
                i += 1;
            }
        });
    }
}

function updateCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

///Testing form and its entries///

let firstName = document.getElementById("firstName");
let lastName = document.getElementById("lastName");
let address = document.getElementById("address");
let city = document.getElementById("city");
let email = document.getElementById("email");

/**
 * Tests parameters' value to see if they match regexp.
 * @param {string} inputFirstName first name input's value
 * @param {string} inputName last nameinput's value
 * @param {string} inputAddress address input's value
 * @param {string} inputCity city input's value
 * @param {string} inputEmail email input's value
 * @returns false if any of the input fails to match regexp pattern, else true.
 */
function validForm(
    inputFirstName,
    inputName,
    inputAddress,
    inputCity,
    inputEmail
) {
    let emailRegExp = new RegExp(
        "^[a-zA-Z0-9._-]+[@]{1}[a-zA-Z0-9-]+[.]{1}[a-z]{2,3}$"
    );
    let textRegExp = new RegExp("[a-zA-Z]{2,}$", "i");
    let addressRegExp = /^[a-zA-Z0-9\s,.'-]{3,}$/;
    resetErrorMessages();
    if (!textRegExp.test(inputFirstName)) {
        document.getElementById("firstNameErrorMsg").innerText =
            "Veuillez écrire un prénom valide.";
        return false;
    }
    if (!textRegExp.test(inputName)) {
        document.getElementById("lastNameErrorMsg").innerText =
            "Veuillez écrire un nom valide.";
        return false;
    }
    if (!addressRegExp.test(inputAddress)) {
        document.getElementById("addressErrorMsg").innerText =
            "Veuillez écrire une adresse valide.";
        return false;
    }
    if (!textRegExp.test(inputCity)) {
        document.getElementById("cityErrorMsg").innerText =
            "Veuillez écrire un nom de ville valide.";
        return false;
    }
    if (!emailRegExp.test(inputEmail)) {
        document.getElementById("emailErrorMsg").innerText =
            "Veuillez écrire une adresse mail valide.";
        return false;
    }
    return true;
}

/**
 * Resets error messages to blank text.
 */
const resetErrorMessages = () => {
    document.getElementById("firstNameErrorMsg").innerText = "";
    document.getElementById("lastNameErrorMsg").innerText = "";
    document.getElementById("addressErrorMsg").innerText = "";
    document.getElementById("cityErrorMsg").innerText = "";
    document.getElementById("emailErrorMsg").innerText = "";
};

/**
 * Prevents submission on user's info if not everything is entered correctly.
 * Else, creates an array containing ids of the cart's items, and sends it via sendInfo function.
 */
function submitCart() {
    document.getElementById("order").addEventListener("click", e => {
        if (
            !validForm(
                firstName.value,
                lastName.value,
                address.value,
                city.value,
                email.value
            )
        ) {
            e.preventDefault();
        } else {
            resetErrorMessages();
            e.preventDefault();
            let productId = [];
            if (cart == null) console.log("erreur");
            else {
                for (let i = 0; i < cart.length; i++) {
                    productId.push(cart[i]._id);
                }
                sendInfo(productId);
            }
        }
    });
}

/**
 * Sends an object order containing an array of product ids,
 * and an object contact containing the user's info entered via form.
 * Uses fetch and method POST, and clears localStorage once its sent.
 * @param {Array<string>} productId
 */
function sendInfo(productId) {
    const order = {
        contact: {
            firstName: firstName.value,
            lastName: lastName.value,
            address: address.value,
            city: city.value,
            email: email.value,
        },
        products: productId,
    };
    fetch("http://localhost:3000/api/products/order", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
    })
        .then(response => {
            return response.json();
        })
        .then(data => {
            localStorage.clear();
            console.log(data.orderId);
            window.location.href = "confirmation.html" + "?id=" + data.orderId;
        })
        .catch(err => {
            console.log("Erreur lors du fetch: " + err);
        });
}

/**
 * Checks if user is on the cart or confirm page, and displays elements accordingly.
 */
function cartOrConfirmPage() {
    let url = new URL(window.location.href);
    let id = "";
    if (url.searchParams.has("id")) {
        console.log("Page de confirmation");
        id = url.searchParams.get("id");
        document.getElementById("orderId").innerText = id;
    } else {
        console.log("Page panier");
        displayCart(cart);
        submitCart();
    }
}

cartOrConfirmPage();