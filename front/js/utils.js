//*****************************BASKET**********************************//

// PREMIERE METHODE

const btnColor = document.getElementById("colors");
const btnQuantity = document.getElementById("quantity");


//enregistrer le panier dans le local storage

function saveBasket(basket){
    //prend objet et transforme en chaine de char (serialization)
    localStorage.setItem("basket", JSON.stringify(basket));
}

//récupérer le panier

function getBasket(){
    let basket = localStorage.getItem("basket");
    //si donnée n'existe pas dans local storage => retourne null (tableau/panier vide)
    if(basket == null){
        return [];
    }else{
        // prend chaine de char et transforme en objet/tableau/donnée...
        return JSON.parse(basket);
    }
}

//changer la quantité de produit

function changeQuantity(product,quantity){
    let basket = getBasket();
    let foundProduct = basket.find(p => p._id == product._id);
    if(foundProduct != undefined){
        foundProduct.quantity += quantity;
        if(foundProduct.quantity <= 0){
            removeFromBasket(foundProduct);
        } else{
            saveBasket(basket);
        }
    }
}

//ajouter un produit au panier
function addBasket(product){
    let basket = getBasket();
    //recherche dans panier s'il y a un id = id du produit à ajouter
    let foundProduct = basket.find(p => p._id === product._id);
    console.log(basket, product);
    //Pour modifier la couleur et la quantité du produit à ajouter au panier
    let productModif = Object.assign({}, product, {
        colors : `${btnColor.value}`,
        quantity: `${btnQuantity.value}`
    });
    
    console.log(productModif);

    if(foundProduct !== undefined){
        // basket.push(productModif);
        localStorage.setItem("basket", JSON.stringify(basket));
        console.log(basket);

        //si produit identique déjà dans localstorage
        if(productModif._id === foundProduct._id && productModif.colors === foundProduct.colors){
            localStorage.getItem("basket", JSON.stringify(basket));
            let foundProduct = basket.find(p => p._id == product._id);
            //quantité du produit déjà ajouté dans le panier
            let existProductQuantity = parseInt(foundProduct.quantity);
            //quantité du produit à ajouter
            let productModifQuantity = parseInt(btnQuantity.value);
            //quantité après ajout
            let newProductQuantity = Object.assign({}, foundProduct, {
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

        else{
            basket.push(productModif);
            localStorage.setItem("basket", JSON.stringify(basket));
        }
    }
   
        else{
            basket.push(productModif);
        }
    // }
    saveBasket(basket);
}

//supprimer un produit

function removeFromBasket(product){
    let basket = getBasket();
    basket = basket.filter(p => p._id != product._id);
    saveBasket(basket);
}


//calculer la quantité de produits dans le panier 

function getNumberProduct(){
    let basket = getBasket();
    let number = 0;
    for(let product of basket){
        number += product.quantity;
    }
    return number;
}

//avoir le prix total du panier

function getTotalPrice(){
    let basket = getBasket();
    let total = 0;
    for(let product of basket){
        total += product.quantity * product.price;
    }
    return number;
}


//récupère bouton ajouter au panier
// const btnBasket = document.getElementById("addToCart");

//ecoute le btn
// btnBasket.addEventListener("click", (event)=>{
//     event.preventDefault();
//     console.log(product);
// })

//récupère les valeurs
