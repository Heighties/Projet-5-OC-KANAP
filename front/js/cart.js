// Récupération du localstorage
let basket = JSON.parse(localStorage.getItem("basket"));
console.log(basket);


// Affichage du panier
function displayBasket() {
    if (basket) {
        // Récupération des infos manquantes via l'API
        for (let i = 0; i < basket.length; i++) {
            const product = basket[i];
          
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
            productQuantity.addEventListener("click", (e) =>{
                changeQuantity(e.target.value, i);
            })

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
                
            // Nombre total de produits
            getNumberProduct();
            // Prix total
            getTotalPrice(basket);
        }
    } else {
        emptyBasket();
    }
}
displayBasket();


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
            console.log(basket);
            // Vérification du panier 
            if (basket == null) {
                alert("Votre panier est vide")
                // console.log("Votre panier est vide");
            } else {
                // Création tableau pour ajouter tous les id du panier 
                let products = [];
                for (let i = 0; i < basket.length; i++) {
                    products.push(basket[i]._id);
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
