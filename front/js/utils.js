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
    let productModif = Object.assign({}, product, {
        colors : `${btnColor.value}`,
        quantity: `${btnQuantity.value}`
    });
    //recherche dans panier s'il y a un id = id du produit à ajouter
    let foundProduct = basket.find(p => p._id === productModif._id);
    // recherche si même produit avec même couleur
    let foundExactlySameProduct = basket.find(p => p._id === productModif._id && p.colors === productModif.colors);
    let foundSameProductColorDiff = basket.find(p => p._id === productModif._id && p.colors !== productModif.colors);
    //Pour modifier la couleur et la quantité du produit à ajouter au panier
    
    
    // Si je trouve Exactement le même produit je veux modifier sa quantité dans le LS
    if(foundExactlySameProduct !== undefined){
        // basket.push(productModif);
        localStorage.setItem("basket", JSON.stringify(basket));
      

        //si produit EXACTEMENT identique déjà dans localstorage
        
            localStorage.getItem("basket", JSON.stringify(basket));
            //quantité du produit déjà ajouté dans le panier
            let existProductQuantity = parseInt(foundExactlySameProduct.quantity);
            //quantité du produit à ajouter
            let productModifQuantity = parseInt(btnQuantity.value);
            //quantité après ajout
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

    // si je trouve produit avec même ID, mais couleur diff, ajouter nouveau produit dans LS (rangé avec produits du même type)
    else if(foundSameProductColorDiff !== undefined){
        localStorage.setItem("basket", JSON.stringify(basket));
        console.log(basket);
        
        

        //si produit identique déjà dans localstorage
            basket.push(productModif);
            //Ranger les produits par IDs
            basket.sort((a, b) => (a._id > b._id) ? 1 : -1)
            // console.log(basket.sort(product._id));
            localStorage.setItem("basket", JSON.stringify(basket));
    }
   
    // si je n'ai pas du tout le même produit, j'ajoute le produit selectionner
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

// récupérer le nombres total de produits
function getNumberProduct(){
    let quantityBasket = basket.map(x => x.quantity);
    let getNumberProduct = 0;
    for (let i = 0; i < quantityBasket.length; i++) {
        getNumberProduct += parseInt(quantityBasket[i]);
    }

    document.getElementById("totalQuantity").innerHTML = getNumberProduct;
}

//avoir le prix total du panier

function getTotalPrice(basket){
    let getTotalPrice = 0;
    for (let i = 0; i < basket.length; i++) {
        getTotalPrice += parseInt(basket[i].price) * parseInt(basket[i].quantity);
    }

    document.getElementById("totalPrice").innerHTML = getTotalPrice;
}

