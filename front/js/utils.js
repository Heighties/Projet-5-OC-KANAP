//*****************************BASKET**********************************//

const btnColor = document.getElementById("colors");
const btnQuantity = document.getElementById("quantity");


// Enregistrer le panier dans le local storage
function saveBasket(newBasket){
    // Prendre l'objet et le transforme en chaine de char (serialization)
    localStorage.setItem("basket", JSON.stringify(newBasket));
}

// Récupérer le panier du localStorage
function getBasket(){
    // Si donnée n'existe pas dans local storage => retourne null (tableau/panier vide)
    if(localStorage.getItem("basket") == null){
        return [];
    }else{
        // Prend chaine de char et transforme en objet/tableau/donnée...
        return JSON.parse(localStorage.getItem("basket"));
    }
}

// Ajouter un produit au panier ou modifie le produit si même ID et même couleur
function addBasket(product){
    let basket = getBasket();
    let productModif = Object.assign({}, product, {
        colors : `${btnColor.value}`,
        quantity: `${btnQuantity.value}`
    });
    // Recherche dans panier s'il y a un id = id du produit à ajouter
    // Recherche si même produit avec même couleur
    let foundExactlySameProduct = basket.find(p => p._id === productModif._id && p.colors === productModif.colors);
    let foundSameProductColorDiff = basket.find(p => p._id === productModif._id && p.colors !== productModif.colors);
    
    // Si je trouve Exactement le même produit je veux modifier sa quantité dans le LS
    if(foundExactlySameProduct !== undefined){
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
    }

    // Si je trouve produit avec même ID, mais couleur diff, ajouter nouveau produit dans LS (rangé avec produits du même type)
    else if(foundSameProductColorDiff !== undefined){
        localStorage.setItem("basket", JSON.stringify(basket));


        // Si produit identique déjà dans localstorage
        basket.push(productModif);
        //Ranger les produits par IDs
        basket.sort((a, b) => (a._id > b._id) ? 1 : -1);
        localStorage.setItem("basket", JSON.stringify(basket));
    }
   
    // Si je n'ai pas du tout le même produit, j'ajoute le produit selectionner
    else{
            basket.push(productModif);
    }
    saveBasket(basket);
}



//**********************************************//

// Si ID non défini dans l'URL renvoyer vers page d'accueil 
function redirect(){
    if( id === null){
        window.location.href = "./index.html"
    }
}

