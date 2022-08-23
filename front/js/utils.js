//*****************************BASKET**********************************//

const btnColor = document.getElementById("colors");
const btnQuantity = document.getElementById("quantity");


// Enregistrer le panier dans le local storage
function saveBasket(newBasket){
    // Prend objet et transforme en chaine de char (serialization)
    localStorage.setItem("basket", JSON.stringify(newBasket));
    basket = JSON.parse(localStorage.getItem("basket"));
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
function getTotalPrice(){
    let cart = getBasket();
    let getTotalPrice = 0;
    for (let i = 0; i < cart.length; i++) {
        getTotalPrice += parseInt(cart[i].price) * parseInt(cart[i].quantity);
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

// Changer la quantité de produit
function changeQuantity(quantity, index){
    const cart = getBasket();
    // const itemToChangeQuantity = document.getElementsByClassName("cart__item");
    let total = 0;

    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
        if( i === index){
            cart[i].quantity = quantity;
        }
    }
    saveBasket(cart);
    getNumberProduct();
    getTotalPrice();
}

// Supprimer un produit
function removeFromBasket(product){
    let basket = getBasket();
    // Si même id qu'un autre produit mais une couleur !==, supprimer seulement le produit selec
    basket = basket.filter(function(p){
        if(p._id !== product._id){
            return(p);
        }
        else{
            if(p.colors !== product.colors){
                return(p);
            }
        }        
    })
    saveBasket(basket);

    if(basket.length === 0){
        localStorage.clear();
    }


    // Change l'affichage de quantité et prix total
    getNumberProduct();
    getTotalPrice(basket);
}




