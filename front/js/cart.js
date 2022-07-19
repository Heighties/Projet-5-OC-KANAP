
// Récupération du localstorage
let basket = JSON.parse(localStorage.getItem("basket"));
console.log(basket);



function displayBasket() {
    if (basket) {
        // Récupération des infos manquantes via l'API
        for (let product of basket) {
            fetch(`http://localhost:3000/api/products/${product._id}`)
                .then((response) => response.json())
                .then(function (productBasket) {

                    // Création de la balise article et insertion dans la section
                    let productArticle = document.createElement("article");
                    document.querySelector("#cart__items").appendChild(productArticle);
                    productArticle.className = "cart__item";

                    // Création des dataset pour faciliter le ciblage de chaque produit dans la page panier
                    productArticle.setAttribute('data-id', product._id);
                    productArticle.setAttribute('data-colors', product.colors);

                    // Insertion de la div pour l'image
                    let productDivImg = document.createElement("div");
                    productArticle.appendChild(productDivImg);
                    productDivImg.className = "cart__item__img";

                    // Insertion de l'image
                    let productImg = document.createElement("img");
                    productDivImg.appendChild(productImg);
                    productImg.src = productBasket.imageUrl;
                    productImg.alt = productBasket.altTxt;

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
                    productTitle.innerHTML = productBasket.name;

                    // Insertion de la couleur
                    let productColor = document.createElement("p");
                    productItemContentDescription.appendChild(productColor);
                    productColor.innerHTML = product.colors;

                    // Insertion du prix
                    let productPrice = document.createElement("p");
                    productItemContentDescription.appendChild(productPrice);
                    productPrice.innerHTML = productBasket.price + " €";

                    // Création de price et récupération du prix
                    product.price = productBasket.price;

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


                });

                // Nombre total de produits
                getNumberProduct();
                // console.log(getNumberProduct(), getTotalPrice(basket));
                // Prix total
                getTotalPrice(basket);
        

        }
    } else {
        const titleCart = document.querySelector("h1");

        titleCart.innerHTML = "Le panier est vide !";
        console.log("Le panier est vide");
    }
}
displayBasket();






