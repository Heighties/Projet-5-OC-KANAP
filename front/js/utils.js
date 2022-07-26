//*****************************BASKET**********************************//

const btnColor = document.getElementById("colors");
const btnQuantity = document.getElementById("quantity");


// Enregistrer le panier dans le local storage

function saveBasket(basket){
    // Prend objet et transforme en chaine de char (serialization)
    localStorage.setItem("basket", JSON.stringify(basket));
}

// Récupérer le panier

function getBasket(){
    let basket = localStorage.getItem("basket");
    // Si donnée n'existe pas dans local storage => retourne null (tableau/panier vide)
    if(basket == null){
        return [];
    }else{
        // Prend chaine de char et transforme en objet/tableau/donnée...
        return JSON.parse(basket);
    }
}



// Ajouter un produit au panier
function addBasket(product){
    let basket = getBasket();
    let productModif = Object.assign({}, product, {
        colors : `${btnColor.value}`,
        quantity: `${btnQuantity.value}`
    });
    // Recherche dans panier s'il y a un id = id du produit à ajouter
    let foundProduct = basket.find(p => p._id === productModif._id);
    // Recherche si même produit avec même couleur
    let foundExactlySameProduct = basket.find(p => p._id === productModif._id && p.colors === productModif.colors);
    let foundSameProductColorDiff = basket.find(p => p._id === productModif._id && p.colors !== productModif.colors);
    // Pour modifier la couleur et la quantité du produit à ajouter au panier
    
    
    // Si je trouve Exactement le même produit je veux modifier sa quantité dans le LS
    if(foundExactlySameProduct !== undefined){
        // basket.push(productModif);
        localStorage.setItem("basket", JSON.stringify(basket));
      

        // Si produit EXACTEMENT identique déjà dans localstorage
        
            localStorage.getItem("basket", JSON.stringify(basket));
            // Quantité du produit déjà ajouté dans le panier
            let existProductQuantity = parseInt(foundExactlySameProduct.quantity);
            // Quantité du produit à ajouter
            let productModifQuantity = parseInt(btnQuantity.value);
            // Quantité après ajout
            let newProductQuantity = Object.assign({}, foundExactlySameProduct, {
                quantity : `${existProductQuantity += productModifQuantity}`
            });
            
            for(let products of basket){
                if(products._id === newProductQuantity._id && products.colors === newProductQuantity.colors){
                    products.quantity = newProductQuantity.quantity;
                }
            }
            
            localStorage.setItem("basket", JSON.stringify(basket));
            console.log(newProductQuantity); 
    }

    // Si je trouve produit avec même ID, mais couleur diff, ajouter nouveau produit dans LS (rangé avec produits du même type)
    else if(foundSameProductColorDiff !== undefined){
        localStorage.setItem("basket", JSON.stringify(basket));
        console.log(basket);
        
        

        // Si produit identique déjà dans localstorage
            basket.push(productModif);
            //Ranger les produits par IDs
            basket.sort((a, b) => (a._id > b._id) ? 1 : -1);
            // console.log(basket.sort(product._id));
            localStorage.setItem("basket", JSON.stringify(basket));
    }
   
    // Si je n'ai pas du tout le même produit, j'ajoute le produit selectionner
    else{
            basket.push(productModif);
        }
    // }
    saveBasket(basket);
}



// Récupérer le nombres total de produits
function getNumberProduct(){
    let quantityBasket = basket.map(x => x.quantity);
    let getNumberProduct = 0;
    for (let i = 0; i < quantityBasket.length; i++) {
        getNumberProduct += parseInt(quantityBasket[i]);
    }

    document.getElementById("totalQuantity").innerHTML = getNumberProduct;
}

// Avoir le prix total du panier
function getTotalPrice(basket){
    let getTotalPrice = 0;
    for (let i = 0; i < basket.length; i++) {
        getTotalPrice += parseInt(basket[i].price) * parseInt(basket[i].quantity);
    }

    document.getElementById("totalPrice").innerHTML = getTotalPrice;
}

// Modification du titre Panier si vide 
function emptyBasket(){
    const titleCart = document.querySelector("h1");

    // Change l'affichage de quantité et prix total
        titleCart.innerHTML = "Le panier est vide !";
        console.log("Le panier est vide");
        totalQuantity.innerHTML = "0 "
        totalPrice.innerHTML = "0 "
}

// Changer la quantité de produit
function changeQuantity(){
    const itemToChangeQuantity = document.getElementsByClassName("cart__item");
    for (let i = 0; i < itemToChangeQuantity.length; i++) {
        let buttonChangeQuantity = itemToChangeQuantity[i].getElementsByClassName("itemQuantity");
        buttonChangeQuantity[0].addEventListener('change', function (event) {
            basket[i].quantity = parseInt(event.target.value);

            if (buttonChangeQuantity[0].value <= 100 && buttonChangeQuantity[0].value >= 1) {
                localStorage.setItem("basket", JSON.stringify(basket));
            } else {
                alert("La quantitée du produit doit être comprise entre 1 et 100.");
                buttonChangeQuantity[0].value = 1;
                basket[i].quantity = 1;
                localStorage.setItem("basket", JSON.stringify(basket));
            }
            // Change l'affichage de quantité et prix total
            getNumberProduct();
            getTotalPrice(basket);
            // window.location.reload();
        })
    }
}

// Supprimer un produit
function removeFromBasket(product){
    let basket = getBasket();
    basket = basket.filter(p => p._id != product._id);
    saveBasket(basket);

    if(basket.length === 0){
        localStorage.clear();
        window.location.reload();
    }
   
    // Change l'affichage de quantité et prix total
    getNumberProduct();
    getTotalPrice(basket);
    window.location.reload();
}