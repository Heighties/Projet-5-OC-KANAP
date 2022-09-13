
function fillMe() {
    const filler = [{"colors":"Green","_id":"055743915a544fde83cfdfc904935ee7","name":"Kanap Calycé","price":3199,"imageUrl":"http://localhost:3000/images/kanap03.jpeg","description":"Pellentesque fermentum arcu venenatis ex sagittis accumsan. Vivamus lacinia fermentum tortor.Mauris imperdiet tellus ante.","altTxt":"Photo d'un canapé d'angle, vert, trois places","quantity":"4"},{"colors":"Red","_id":"055743915a544fde83cfdfc904935ee7","name":"Kanap Calycé","price":3199,"imageUrl":"http://localhost:3000/images/kanap03.jpeg","description":"Pellentesque fermentum arcu venenatis ex sagittis accumsan. Vivamus lacinia fermentum tortor.Mauris imperdiet tellus ante.","altTxt":"Photo d'un canapé d'angle, vert, trois places","quantity":"3"},{"colors":"Black","_id":"107fb5b75607497b96722bda5b504926","name":"Kanap Sinopé","price":1849,"imageUrl":"http://localhost:3000/images/kanap01.jpeg","description":"Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.","altTxt":"Photo d'un canapé bleu, deux places","quantity":"2"},{"colors":"Blue","_id":"107fb5b75607497b96722bda5b504926","name":"Kanap Sinopé","price":1849,"imageUrl":"http://localhost:3000/images/kanap01.jpeg","description":"Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.","altTxt":"Photo d'un canapé bleu, deux places","quantity":"2"},{"colors":"White","_id":"107fb5b75607497b96722bda5b504926","name":"Kanap Sinopé","price":1849,"imageUrl":"http://localhost:3000/images/kanap01.jpeg","description":"Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.","altTxt":"Photo d'un canapé bleu, deux places","quantity":"5"},{"colors":"White","_id":"a557292fe5814ea2b15c6ef4bd73ed83","name":"Kanap Autonoé","price":1499,"imageUrl":"http://localhost:3000/images/kanap04.jpeg","description":"Donec mattis nisl tortor, nec blandit sapien fermentum at. Proin hendrerit efficitur fringilla. Lorem ipsum dolor sit amet.","altTxt":"Photo d'un canapé rose, une à deux place","quantity":"5"}]
    window.localStorage.setItem('basket', JSON.stringify(filler))
}
const fillerBtn = document.createElement('button')
fillerBtn.textContent = 'remplis moi ce panier'
fillerBtn.addEventListener('click', function(){fillMe()})
document.querySelector('.cart').appendChild(fillerBtn)

// Récupération du localstorage
let myBasket = JSON.parse(localStorage.getItem("basket"));
// console.log(myBasket);
// let myBasket = getBasket();

// Affichage du panier
function displayBasket() {
    if (myBasket) {
        // Récupération des infos manquantes via l'API
        for (let i = 0; i < myBasket.length; i++) {
            const product = myBasket[i];
          
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
            // productQuantity.addEventListener("click", (e) =>{
            //     changeQuantity(e.target);
            // })

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
                
            // removeProduct(); 
            modifyQuantity();
            
            saveBasket(myBasket);
        }

        // Nombre total de produits
        getNumberProduct(myBasket);
        // Prix total
        getTotalPrice(myBasket);
    } else {
        emptyBasket();
    }
}
displayBasket();

// *********************** utils.js ****************************//

// Récupérer le nombres total de produits
function getNumberProduct(){
    // console.log(basket, JSON.parse(localStorage.getItem("basket")));
    let quantityBasket = myBasket.map(x => x.quantity);
    let getNumberProduct = 0;
    for (let i = 0; i < quantityBasket.length; i++) {
        getNumberProduct += parseInt(quantityBasket[i]);
    }
    document.getElementById("totalQuantity").innerHTML = getNumberProduct;
    
}

// Avoir le prix total du panier
// function getTotalPrice(){
//     let cart = getBasket();
//     let getTotalPrice = 0;
//     for (let i = 0; i < cart.length; i++) {
//         getTotalPrice += parseInt(cart[i].price) * parseInt(cart[i].quantity);
//     }
//     document.getElementById("totalPrice").innerHTML = getTotalPrice;
// }
function getTotalPrice() {
    let getTotalPrice = 0;
    for (let i = 0; i < myBasket.length; i++) {
        getTotalPrice += parseInt(myBasket[i].price) * parseInt(myBasket[i].quantity);
    }

    document.getElementById("totalPrice").innerHTML = getTotalPrice;
}

// Modification du titre Panier si vide 
function emptyBasket(){
    const titleCart = document.querySelector("h1");

    // Change l'affichage de quantité et prix total
    titleCart.innerHTML = "Le panier est vide";
    totalQuantity.innerHTML = "0 "
    totalPrice.innerHTML = "0 "
}

// Fonction pour Modifier quantité de l'article
function modifyQuantity() {
    const itemToChangeQuantity = document.getElementsByClassName("cart__item");
    for (let i = 0; i < itemToChangeQuantity.length; i++) {

        let buttonChangeQuantity = itemToChangeQuantity[i].getElementsByClassName("itemQuantity");
        buttonChangeQuantity[0].addEventListener('change', function (event) {
            myBasket[i].quantity = parseInt(event.target.value);

            if (buttonChangeQuantity[0].value <= 100 && buttonChangeQuantity[0].value >= 1) {
                localStorage.setItem("basket", JSON.stringify(myBasket));
            } else {
                alert("La quantitée du produit doit être comprise entre 1 et 100.");
                buttonChangeQuantity[0].value = 1;
                myBasket[i].quantity = 1;
                localStorage.setItem("basket", JSON.stringify(myBasket));
            }
            getNumberProduct();
            getTotalPrice();
            saveBasket(myBasket);
        })
    }
}


// Supprimer un produit
function removeFromBasket(product){
    // Si même id qu'un autre produit mais une couleur !==, supprimer seulement le produit selectionné
    myBasket = myBasket.filter(function(p){
        if(p._id !== product._id){
            return(p);
        }
        else{
            if(p.colors !== product.colors){
                return(p);
            }
        }        
    })
    saveBasket(myBasket);
    // Si le panier est vide, je le supprime du locaStorage
    if(myBasket.length === 0){
        localStorage.clear();
    }

    window.location.reload();
    // Change l'affichage de quantité et prix total
    getNumberProduct();
    getTotalPrice(myBasket);
}

// ****************** FORMULAIRE ******************//

// Validation + envoie de commande 
function checkForm(form){
    // Création Regex
    let emailRegex = new RegExp("[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+");
    let adressRegex = new RegExp("^[0-9]{1,4}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+");
    let cityRegex = new RegExp("^[a-zA-Z-Zàâäéèêëïîôöùûüç ,.'-]+$");
    let namesRegex = new RegExp("^[a-zA-Z-Zàâäéèêëïîôöùûüç ,.'-]+$");

    // Mise à zéro des messages d'erreurs 
    document.getElementById('firstNameErrorMsg').innerHTML = "";
    document.getElementById('lastNameErrorMsg').innerHTML = "";
    document.getElementById('addressErrorMsg').innerHTML = "";
    document.getElementById('cityErrorMsg').innerHTML = "";
    document.getElementById('emailErrorMsg').innerHTML = "";

    // Vérification Regex => sinon message d'erreur
    let validFirstName = form.firstName;
    if (!namesRegex.test(validFirstName)) {
        let firstNameErrorMsg = document.getElementById('firstNameErrorMsg');
        firstNameErrorMsg.innerText = "Veuillez renseigner un prénom valide";
        return false;
    }

    let validLastName = form.lastName;
    if (!namesRegex.test(validLastName)) {
        let firstNameErrorMsg = document.getElementById('lastNameErrorMsg');
        firstNameErrorMsg.innerText = "Veuillez renseigner un nom valide";
        return false;
    }
    let validAddress = form.address;
    if (!adressRegex.test(validAddress)) {
        let firstNameErrorMsg = document.getElementById('addressErrorMsg');
        firstNameErrorMsg.innerText = "Veuillez renseigner une adresse valide";
        return false;
    }

    let validCity = form.city;
    if (!cityRegex.test(validCity)) {
        let firstNameErrorMsg = document.getElementById('cityErrorMsg');
        firstNameErrorMsg.innerText = "Veuillez renseigner une ville valide";
        return false;
    }
    let validEmail = form.email;
    if (!emailRegex.test(validEmail)) {
        let firstNameErrorMsg = document.getElementById('emailErrorMsg');
        firstNameErrorMsg.innerText = "Veuillez renseigner une adresse mail valide";
        return false;
    } else {
        // Si tous les inputs sont correctement remplis la fonction retourne true
        return true;
    }
};

// Fonction pour récupérer le formulaire et rediriger vers la page contact
function postForm() {
    const order = document.getElementById("order");
    // Envoi du formulaire si bien rempli + panier rempli, sinon : message d'erreur
    order.addEventListener("click", (e) => {
        e.preventDefault();

        // Récupération des données du formulaire
        const contact = {
            firstName: document.getElementById("firstName").value,
            lastName: document.getElementById("lastName").value,
            address: document.getElementById("address").value,
            city: document.getElementById("city").value,
            email: document.getElementById("email").value
        }
        // Vérification du formulaire 
        if (checkForm(contact)) {
            console.log(myBasket);
            // Vérification du panier 
            if (myBasket == null) {
                alert("Votre panier est vide")
                // console.log("Votre panier est vide");
            } else {
                // Création tableau pour ajouter tous les id du panier 
                let products = [];
                for (let i = 0; i < myBasket.length; i++) {
                    products.push(myBasket[i]._id);
                }
                console.log(products);

                // Création objet avec les valeurs du formulaire et les produits du panier
                let sendFormData = {
                    contact,
                    products,
                };
                sendPost(sendFormData);
            };
        }
        else {
            alert("Veuillez vérifier que le formulaire soit bien rempli.")
            return null
        }
    })
}
postForm()

// Fonction qui redirige vers la page de confirmation
function sendPost(sendFormData) {
    console.log(sendFormData)
    const post = {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(sendFormData),
    };

    // Requête de l'API avec la méthode POST
    fetch("http://localhost:3000/api/products/order", post)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            localStorage.setItem("orderId", data.orderId);
            document.location.href = "confirmation.html?id=" + data.orderId;
        })
        .catch((err) => {
            alert("Oups, le serveur rencontre un problème." + err.message);
        });
}
