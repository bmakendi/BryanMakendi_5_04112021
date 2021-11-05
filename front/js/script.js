const sectionItems = document.getElementById("items");

function displayProducts() {
    fetch("http://localhost:3000/api/products")
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data);
            for (const object of data) {
                createElements(object);
            }
        })
        .catch(err => {
            console.log("Erreur: " + err);
        });
}

function createElements(object) {

    //Declaring variables
    let link = document.createElement("a");
    let article = document.createElement("article");
    let image = document.createElement("img");
    let productName = document.createElement("h3");
    let productDescription = document.createElement("p");
    
    //Setting attributes, classes and text
    console.log(object);
    link.setAttribute("href", "./product.html?id=" + object._id);
    image.setAttribute("src", object.imageUrl);
    image.setAttribute("alt", object.altTxt);
    productName.classList.add("productName");
    productName.innerText = object.name;
    productDescription.classList.add("productDescription");
    productDescription.innerText = object.description;

    //Adding the elements to the DOM
    sectionItems.appendChild(link);
    link.appendChild(article);
    article.appendChild(image);
    article.appendChild(productName);
    article.appendChild(productDescription);
    

    console.log(sectionItems);
}

displayProducts();
