
// function fillMe() {
//     const filler = [{"colors":"Green","_id":"055743915a544fde83cfdfc904935ee7","name":"Kanap Calycé","price":3199,"imageUrl":"http://localhost:3000/images/kanap03.jpeg","description":"Pellentesque fermentum arcu venenatis ex sagittis accumsan. Vivamus lacinia fermentum tortor.Mauris imperdiet tellus ante.","altTxt":"Photo d'un canapé d'angle, vert, trois places","quantity":"4"},{"colors":"Red","_id":"055743915a544fde83cfdfc904935ee7","name":"Kanap Calycé","price":3199,"imageUrl":"http://localhost:3000/images/kanap03.jpeg","description":"Pellentesque fermentum arcu venenatis ex sagittis accumsan. Vivamus lacinia fermentum tortor.Mauris imperdiet tellus ante.","altTxt":"Photo d'un canapé d'angle, vert, trois places","quantity":"3"},{"colors":"Black","_id":"107fb5b75607497b96722bda5b504926","name":"Kanap Sinopé","price":1849,"imageUrl":"http://localhost:3000/images/kanap01.jpeg","description":"Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.","altTxt":"Photo d'un canapé bleu, deux places","quantity":"2"},{"colors":"Blue","_id":"107fb5b75607497b96722bda5b504926","name":"Kanap Sinopé","price":1849,"imageUrl":"http://localhost:3000/images/kanap01.jpeg","description":"Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.","altTxt":"Photo d'un canapé bleu, deux places","quantity":"2"},{"colors":"White","_id":"107fb5b75607497b96722bda5b504926","name":"Kanap Sinopé","price":1849,"imageUrl":"http://localhost:3000/images/kanap01.jpeg","description":"Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.","altTxt":"Photo d'un canapé bleu, deux places","quantity":"5"},{"colors":"White","_id":"a557292fe5814ea2b15c6ef4bd73ed83","name":"Kanap Autonoé","price":1499,"imageUrl":"http://localhost:3000/images/kanap04.jpeg","description":"Donec mattis nisl tortor, nec blandit sapien fermentum at. Proin hendrerit efficitur fringilla. Lorem ipsum dolor sit amet.","altTxt":"Photo d'un canapé rose, une à deux place","quantity":"5"}]
//     window.localStorage.setItem('basket', JSON.stringify(filler))
// }

// const fillerBtn = document.createElement('button')
// fillerBtn.textContent = 'remplis moi ce panier'
// fillerBtn.addEventListener('click', fillMe())
// document.querySelector('.cart').appendChild(fillerBtn)


// Récupération du localstorage
let basket = JSON.parse(localStorage.getItem("basket"));
console.log(basket);



function displayBasket() {
    if (basket) {
        // Récupération des infos manquantes via l'API
        for (let product of basket) {
            // console.log(product);
            // fetch(`http://localhost:3000/api/products/${product._id}`)
            //     .then((response) => response.json())
            //     .then(function (product) {
            //         console.log(product)

                    // Création de la balise article et insertion dans la section
                    let productArticle = document.createElement("article");
                    document.querySelector("#cart__items").appendChild(productArticle);
                    productArticle.className = "cart__item";


                    // Insertion de la div pour l'image
                    let productDivImg = document.createElement("div");
                    productArticle.appendChild(productDivImg);
                    productDivImg.className = "cart__item__img";

                    // Insertion de l'image
                    let productImg = document.createElement("img");
                    productDivImg.appendChild(productImg);
                    productImg.src = product.imageUrl;
                    productImg.alt = product.altTxt;

                    // Insertion de la div pour la description
                    let productItemContent = document.createElement("div");
                    productArticle.appendChild(productItemContent);
                    productItemContent.className = "cart__item__content";

                    // Insertion de l'élément div
                    let productItemContentDescription = document.createElement("div");
                    productItemContent.appendChild(productItemContentDescription);
                    productItemContentDescription.className = "cart__item__content__description";

                    // Insertion de h2
                    let productTitle = document.createElement("h2");
                    productItemContentDescription.appendChild(productTitle);
                    productTitle.innerHTML = product.name;

                    // Insertion de la couleur
                    let productColor = document.createElement("p");
                    productItemContentDescription.appendChild(productColor);
                    productColor.innerHTML = product.colors;

                    // Insertion du prix
                    let productPrice = document.createElement("p");
                    productItemContentDescription.appendChild(productPrice);
                    productPrice.innerHTML = product.price + " €";

                    // Création de price et récupération du prix
                    product.price = product.price;

                    // Insertion de la div
                    let productItemContentSettings = document.createElement("div");
                    productItemContent.appendChild(productItemContentSettings);
                    productItemContentSettings.className = "cart__item__content__settings";

                    // Insertion de la div
                    let productItemContentSettingsQuantity = document.createElement("div");
                    productItemContentSettings.appendChild(productItemContentSettingsQuantity);
                    productItemContentSettingsQuantity.className = "cart__item__content__settings__quantity";

                    // Insertion de Qté 
                    let productQty = document.createElement("p");
                    productItemContentSettingsQuantity.appendChild(productQty);
                    productQty.innerHTML = "Qté : ";

                    // Insertion de la quantité
                    let productQuantity = document.createElement("input");
                    productItemContentSettingsQuantity.appendChild(productQuantity);
                    productQuantity.value = product.quantity;
                    productQuantity.className = "itemQuantity";
                    productQuantity.setAttribute("type", "number");
                    productQuantity.setAttribute("min", "1");
                    productQuantity.setAttribute("max", "100");
                    productQuantity.setAttribute("name", "itemQuantity");

                    // Insertion de la div
                    let productItemContentSettingsDelete = document.createElement("div");
                    productItemContentSettings.appendChild(productItemContentSettingsDelete);
                    productItemContentSettingsDelete.className = "cart__item__content__settings__delete";

                    // Insertion de supprimer
                    let productDelete = document.createElement("p");
                    productItemContentSettingsDelete.appendChild(productDelete);
                    productDelete.className = "deleteItem";
                    productDelete.innerHTML = "Supprimer";
                    productDelete.addEventListener("click", (e) =>{
                        console.log(product);
                        removeFromBasket(product);
                        productArticle.remove();
                    })
                    


                // });

                changeQuantity();
                // Nombre total de produits
                getNumberProduct();
                // console.log(getNumberProduct(), getTotalPrice(basket));
                // Prix total
                getTotalPrice(basket);
        

        }
    } else {
        emptyBasket();
    }
}
displayBasket();






